const atob = require('atob');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const pause = require('connect-pause');
const db = router.db;

function generateToken(n) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

server.use(pause(2000));

server.post('/login', (req, res) => {
  const auth = req.headers.authorization || '';
  const [id, password] = atob(auth.replace('Basic ', '')).split(':');
  const user = db
    .get('users')
    .find({ id, password })
    .value();
  if (!user) {
    res.status(401).jsonp({ message: 'Login failed. Please check your username or password.' });
  } else {
    const accessToken = generateToken(32);
    db.get('sessions')
      .remove({ userid: id })
      .write();
    db.get('sessions')
      .push({ userid: id, accessToken })
      .write();
    res.status(201).jsonp({ accessToken });
  }
});

server.use((req, res, next) => {
  if (req.url != '/') {
    const accessToken = req.headers['x-access-token'];
    const session = db
      .get('sessions')
      .find({ accessToken })
      .value();
    if (!accessToken || !session) {
      res.status(403).jsonp();
      return;
    }
  }
  next();
});

server.use(jsonServer.defaults());
server.use(router);
server.listen(3000);
