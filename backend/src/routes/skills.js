const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /skills - Get all skills with optional category filtering
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = 'SELECT * FROM skills';
    const queryParams = [];
    
    if (category) {
      query += ' WHERE category = $1';
      queryParams.push(category);
    }
    
    query += ' ORDER BY name ASC';
    
    const result = await db.query(query, queryParams);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /skills/categories - Get all skill categories
router.get('/categories', async (req, res) => {
  try {
    const result = await db.query('SELECT DISTINCT category FROM skills WHERE category IS NOT NULL ORDER BY category');
    
    const categories = result.rows.map(row => row.category);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching skill categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


