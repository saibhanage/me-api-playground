import React, { useState, useEffect } from 'react';
import { User, Mail, Edit3, Save, X } from 'lucide-react';
import { apiService } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    bio: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProfile();
      setProfile(response.data);
      setEditForm({
        name: response.data.name,
        email: response.data.email,
        bio: response.data.bio || ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: profile.name,
      email: profile.email,
      bio: profile.bio || ''
    });
  };

  const handleSave = async () => {
    try {
      const response = await apiService.updateProfile(editForm);
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={fetchProfile}
            className="btn-secondary mt-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="btn-secondary flex items-center gap-2"
          >
            <Edit3 size={16} />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={editForm.bio}
              onChange={handleInputChange}
              className="input-field"
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="btn-primary flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{profile.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="text-gray-400" size={20} />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
          </div>
          
          {profile.bio && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Bio</p>
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;


