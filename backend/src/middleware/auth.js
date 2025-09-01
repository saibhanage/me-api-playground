const auth = require('basic-auth');

const basicAuth = (req, res, next) => {
  const credentials = auth(req);
  
  if (!credentials) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Me-API Admin"');
    return res.status(401).json({ error: 'Authentication required' });
  }

  const { name, pass } = credentials;
  const expectedUsername = process.env.BASIC_AUTH_USERNAME || 'admin';
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD || 'admin123';

  if (name === expectedUsername && pass === expectedPassword) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Me-API Admin"');
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = { basicAuth };


