-- Me-API Playground Seed Data
-- Insert sample data for development

-- Insert profile data
INSERT INTO profiles (name, email, bio) VALUES 
('John Developer', 'john.developer@email.com', 'Full-stack developer passionate about building scalable web applications and learning new technologies. I specialize in JavaScript, Python, and cloud technologies.');

-- Insert skills data
INSERT INTO skills (name, category, proficiency_level) VALUES 
-- Frontend
('JavaScript', 'frontend', 5),
('React', 'frontend', 4),
('TypeScript', 'frontend', 4),
('HTML5', 'frontend', 5),
('CSS3', 'frontend', 4),
('Tailwind CSS', 'frontend', 4),
('Vue.js', 'frontend', 3),
('Next.js', 'frontend', 4), -- ADDED
('React Native', 'frontend', 4), -- ADDED

-- Backend
('Node.js', 'backend', 5),
('Express.js', 'backend', 5),
('Python', 'backend', 4),
('Django', 'backend', 3),
('FastAPI', 'backend', 4),
('Java', 'backend', 3),
('Spring Boot', 'backend', 3),
('Socket.io', 'backend', 4), -- ADDED

-- Database
('PostgreSQL', 'database', 4),
('MongoDB', 'database', 3),
('Redis', 'database', 3),
('SQL', 'database', 4),

-- DevOps & Tools
('Docker', 'devops', 4),
('Git', 'devops', 5),
('AWS', 'devops', 3),
('CI/CD', 'devops', 3),
('Linux', 'devops', 4),

-- Other
('REST APIs', 'other', 5),
('GraphQL', 'other', 3),
('Microservices', 'other', 3),
('Agile', 'other', 4);

-- Insert projects data
INSERT INTO projects (title, description, links, image_url, status) VALUES 
('E-Commerce Platform', 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.', 
'[{"name": "GitHub", "url": "https://github.com/johndeveloper/ecommerce-platform"}, {"name": "Live Demo", "url": "https://ecommerce-demo.vercel.app"}]',
'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=E-Commerce+Platform',
'completed'),

('Task Management API', 'A RESTful API for task management with user authentication, CRUD operations, and real-time notifications using WebSockets.', 
'[{"name": "GitHub", "url": "https://github.com/johndeveloper/task-api"}, {"name": "API Docs", "url": "https://task-api-docs.herokuapp.com"}]',
'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Task+Management+API',
'completed'),

('Weather Dashboard', 'A React-based weather dashboard that displays current weather and forecasts using OpenWeatherMap API. Features include location search and weather alerts.', 
'[{"name": "GitHub", "url": "https://github.com/johndeveloper/weather-dashboard"}, {"name": "Live Demo", "url": "https://weather-dashboard.netlify.app"}]',
'https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Weather+Dashboard',
'completed'),

('Machine Learning Portfolio', 'A collection of ML projects including sentiment analysis, image classification, and recommendation systems built with Python, TensorFlow, and scikit-learn.', 
'[{"name": "GitHub", "url": "https://github.com/johndeveloper/ml-portfolio"}, {"name": "Jupyter Notebooks", "url": "https://colab.research.google.com/drive/..."}]',
'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=ML+Portfolio',
'completed'),

('Real-time Chat Application', 'A real-time chat application built with React, Node.js, and Socket.io. Features include private messaging, group chats, and file sharing.', 
'[{"name": "GitHub", "url": "https://github.com/johndeveloper/chat-app"}, {"name": "Live Demo", "url": "https://chat-app-demo.herokuapp.com"}]',
'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Chat+App',
'completed'),

('Blog Platform', 'A modern blog platform with markdown support, SEO optimization, and admin dashboard. Built with Next.js, TypeScript, and PostgreSQL.', 
'[{"name": "GitHub", "url": "https://github.com/johndeveloper/blog-platform"}, {"name": "Live Demo", "url": "https://blog-platform.vercel.app"}]',
'https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Blog+Platform',
'in-progress'),

('Mobile Fitness App', 'A React Native fitness tracking app with workout plans, progress tracking, and social features. Currently in development.', 
'[{"name": "GitHub", "url": "https://github.com/johndeveloper/fitness-app"}]',
'https://via.placeholder.com/400x300/84CC16/FFFFFF?text=Fitness+App',
'in-progress');

-- Link projects to skills
INSERT INTO project_skills (project_id, skill_id) VALUES 
-- E-Commerce Platform
(1, (SELECT id FROM skills WHERE name = 'React')),
(1, (SELECT id FROM skills WHERE name = 'Node.js')),
(1, (SELECT id FROM skills WHERE name = 'Express.js')),
(1, (SELECT id FROM skills WHERE name = 'PostgreSQL')),
(1, (SELECT id FROM skills WHERE name = 'JavaScript')),
(1, (SELECT id FROM skills WHERE name = 'REST APIs')),

-- Task Management API
(2, (SELECT id FROM skills WHERE name = 'Node.js')),
(2, (SELECT id FROM skills WHERE name = 'Express.js')),
(2, (SELECT id FROM skills WHERE name = 'PostgreSQL')),
(2, (SELECT id FROM skills WHERE name = 'JavaScript')),
(2, (SELECT id FROM skills WHERE name = 'REST APIs')),

-- Weather Dashboard
(3, (SELECT id FROM skills WHERE name = 'React')),
(3, (SELECT id FROM skills WHERE name = 'JavaScript')),
(3, (SELECT id FROM skills WHERE name = 'HTML5')),
(3, (SELECT id FROM skills WHERE name = 'CSS3')),
(3, (SELECT id FROM skills WHERE name = 'REST APIs')),

-- Machine Learning Portfolio
(4, (SELECT id FROM skills WHERE name = 'Python')),
(4, (SELECT id FROM skills WHERE name = 'SQL')),

-- Real-time Chat Application
(5, (SELECT id FROM skills WHERE name = 'React')),
(5, (SELECT id FROM skills WHERE name = 'Node.js')),
(5, (SELECT id FROM skills WHERE name = 'Express.js')),
(5, (SELECT id FROM skills WHERE name = 'JavaScript')),
(5, (SELECT id FROM skills WHERE name = 'Socket.io')),

-- Blog Platform
(6, (SELECT id FROM skills WHERE name = 'React')),
(6, (SELECT id FROM skills WHERE name = 'TypeScript')),
(6, (SELECT id FROM skills WHERE name = 'Node.js')),
(6, (SELECT id FROM skills WHERE name = 'PostgreSQL')),
(6, (SELECT id FROM skills WHERE name = 'Next.js')),

-- Mobile Fitness App
(7, (SELECT id FROM skills WHERE name = 'React Native')),
(7, (SELECT id FROM skills WHERE name = 'JavaScript')),
(7, (SELECT id FROM skills WHERE name = 'Node.js')),
(7, (SELECT id FROM skills WHERE name = 'PostgreSQL'));