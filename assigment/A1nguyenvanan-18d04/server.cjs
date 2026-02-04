const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors module

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors()); // Enable CORS for all requests

// --- Custom Rewriter ---
// Maps /api/resource to the correct resource in db.json
const rewriter = jsonServer.rewriter({
  '/api/users': '/systemAccounts',
  '/api/users/:id': '/systemAccounts/:id',
  '/api/news': '/newsArticles',
  '/api/news/:id': '/newsArticles/:id',
  '/api/categories': '/categories',
  '/api/categories/:id': '/categories/:id',
});
server.use(rewriter);


// --- Custom Auth Middleware ---
// This needs to be before the json-server.router
server.use(jsonServer.bodyParser);
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
  const user = db.systemAccounts.find(
    (u) => u.accountEmail.toLowerCase() === trimmedEmail.toLowerCase() && u.accountPassword === trimmedPassword
  );

  if (user) {
    const token = `fake-token-for-user-${user.id}`;
    const { accountPassword, ...userToReturn } = user;
    res.status(200).json({ user: userToReturn, token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});


// Remove /api prefix for other requests that the rewriter doesn't handle
// This is now less critical due to the explicit rewriter, but can serve as a fallback.
server.use((req, res, next) => {
    if (req.url.startsWith('/api/')) {
      req.url = req.url.substring(4);
    }
    next();
});

server.use(middlewares);
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server with custom auth and routing is running on port 8080');
});