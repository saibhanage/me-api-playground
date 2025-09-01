import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { apiService } from '../services/api';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchSkills();
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [selectedSkill, pagination.page]);

  const fetchSkills = async () => {
    try {
      const response = await apiService.getSkills();
      setSkills(response.data);
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit
      };
      
      if (selectedSkill) {
        params.skill = selectedSkill;
      }
      
      const response = await apiService.getProjects(params);
      setProjects(response.data.projects);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProjects();
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.searchProjects(searchQuery, {
        page: 1,
        limit: pagination.limit
      });
      setProjects(response.data.results);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillFilter = (skill) => {
    setSelectedSkill(skill === selectedSkill ? '' : skill);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkill('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (error) {
    return (
      <div className="card">
        <div className="text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={fetchProjects}
            className="btn-secondary mt-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="card">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          
          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search projects..."
                className="input-field pl-10"
              />
            </div>
            <button
              onClick={handleSearch}
              className="btn-primary"
            >
              Search
            </button>
          </div>

          {/* Skill Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by Skills:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 10).map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => handleSkillFilter(skill.name)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedSkill === skill.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedSkill) && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedSkill && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                  Skill: {selectedSkill}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="card">
              <div className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No projects found.</p>
          <button
            onClick={clearFilters}
            className="btn-secondary mt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
              </button>
              
              <span className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.pages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectList;


