const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /projects - Get all projects with optional skill filtering
router.get('/', async (req, res) => {
  try {
    const { skill, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT 
        p.id,
        p.title,
        p.description,
        p.links,
        p.image_url,
        p.status,
        p.created_at,
        p.updated_at,
        ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id
    `;
    
    const queryParams = [];
    let whereClause = '';
    
    // Add skill filter if provided
    if (skill) {
      whereClause = 'WHERE s.name ILIKE $1';
      queryParams.push(`%${skill}%`);
    }
    
    query += whereClause;
    query += `
      GROUP BY p.id, p.title, p.description, p.links, p.image_url, p.status, p.created_at, p.updated_at
      ORDER BY p.created_at DESC
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
    `;
    
    queryParams.push(limit, offset);
    
    const result = await db.query(query, queryParams);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id
    `;
    
    if (skill) {
      countQuery += ' WHERE s.name ILIKE $1';
    }
    
    const countResult = await db.query(countQuery, skill ? [`%${skill}%`] : []);
    const total = parseInt(countResult.rows[0].total);
    
    res.json({
      projects: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /projects/:id - Get a specific project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await db.query(`
      SELECT 
        p.id,
        p.title,
        p.description,
        p.links,
        p.image_url,
        p.status,
        p.created_at,
        p.updated_at,
        ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id
      WHERE p.id = $1
      GROUP BY p.id, p.title, p.description, p.links, p.image_url, p.status, p.created_at, p.updated_at
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;


