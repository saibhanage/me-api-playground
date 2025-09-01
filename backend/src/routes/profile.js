const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { basicAuth } = require('../middleware/auth');
const Joi = require('joi');

// Validation schema for profile
const profileSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().max(1000).optional()
});

// GET /profile - Get profile information
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM profiles ORDER BY id LIMIT 1');
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /profile - Create new profile (protected with basic auth)
router.post('/', basicAuth, async (req, res) => {
  try {
    const { error, value } = profileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, bio } = value;
    
    // Check if profile already exists
    const existingProfile = await db.query('SELECT id FROM profiles LIMIT 1');
    if (existingProfile.rows.length > 0) {
      return res.status(409).json({ error: 'Profile already exists. Use PUT to update.' });
    }

    const result = await db.query(
      'INSERT INTO profiles (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating profile:', error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /profile - Update profile (protected with basic auth)
router.put('/', basicAuth, async (req, res) => {
  try {
    const { error, value } = profileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, bio } = value;
    
    const result = await db.query(
      'UPDATE profiles SET name = $1, email = $2, bio = $3, updated_at = CURRENT_TIMESTAMP RETURNING *',
      [name, email, bio]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


