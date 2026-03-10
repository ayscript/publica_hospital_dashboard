import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import fs from 'fs';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = '123456789'; // In production, use an environment variable
const expiresIn = '1h';

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 1. Custom Login Route
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
  
  // Find user in db.json
  const user = db.users.find(u => u.email === email && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn });
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Incorrect email or password" });
  }
});

// 2. Middleware to Protect Private Routes
server.use((req, res, next) => {
  // Allow public access to login and users (for registration)
  if (req.path === '/login' || req.path === '/users') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, SECRET_KEY);
      next(); // Token is valid, proceed to the request
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "Authorization header missing" });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('Custom JWT Server running on http://localhost:3000');
});