import React from 'react';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {project.image_url && (
        <div className="mb-4">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {project.title}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-gray-600 line-clamp-3">
          {project.description}
        </p>
        
        {project.skills && project.skills.length > 0 && (
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {project.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                  +{project.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={14} />
          <span>Created {formatDate(project.created_at)}</span>
        </div>
        
        {project.links && project.links.length > 0 && (
          <div className="flex gap-2 pt-2 border-t border-gray-200">
            {project.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
              >
                {link.name.toLowerCase().includes('github') ? (
                  <Github size={14} />
                ) : (
                  <ExternalLink size={14} />
                )}
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;


