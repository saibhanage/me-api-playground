const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /search - Search projects by query string
router.get('/', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const offset = (page - 1) * limit;
    const searchTerm = `%${q.trim()}%`;
    
    const query = `
      SELECT 
        p.id,
        p.title,
        p.description,
        p.links,
        p.image_url,
        p.status,
        p.created_at,
        p.updated_at,
        ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills,
        ts_rank(to_tsvector('english', p.title || ' ' || p.description), plainto_tsquery('english', $1)) as rank
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id
      WHERE 
        p.title ILIKE $2 OR 
        p.description ILIKE $2 OR
        s.name ILIKE $2
      GROUP BY p.id, p.title, p.description, p.links, p.image_url, p.status, p.created_at, p.updated_at
      ORDER BY rank DESC, p.created_at DESC
      LIMIT $3 OFFSET $4
    `;
    
    const result = await db.query(query, [q.trim(), searchTerm, limit, offset]);
    
    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id
      WHERE 
        p.title ILIKE $1 OR 
        p.description ILIKE $1 OR
        s.name ILIKE $1
    `;
    
    const countResult = await db.query(countQuery, [searchTerm]);
    const total = parseInt(countResult.rows[0].total);
    
    res.json({
      query: q.trim(),
      results: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error searching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


