require('dotenv').config();
console.log("DATABASE USER FROM ENV:", process.env.DB_USER);
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const healthRoutes = require('./routes/health');
const profileRoutes = require('./routes/profile');
const projectsRoutes = require('./routes/projects');
const searchRoutes = require('./routes/search');
const skillsRoutes = require('./routes/skills');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/health', healthRoutes);
app.use('/profile', profileRoutes);
app.use('/projects', projectsRoutes);
app.use('/search', searchRoutes);
app.use('/skills', skillsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Me-API Playground',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      profile: '/profile',
      projects: '/projects',
      search: '/search',
      skills: '/skills'
    },
    documentation: 'Check the README.md for API documentation'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /profile',
      'POST /profile',
      'PUT /profile',
      'GET /projects',
      'GET /projects/:id',
      'GET /search?q=query',
      'GET /skills',
      'GET /skills/categories'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Me-API Playground server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;


