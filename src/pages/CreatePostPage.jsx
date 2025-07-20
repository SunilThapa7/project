import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Globe } from 'lucide-react';
import ImageUploader from '../components/social/ImageUploader';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert('Please select an image to post.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        image: selectedImage.preview,
        caption: caption,
        location: location,
        privacy: privacy
      };

      // In a real app, you would send this to your backend
      console.log('Creating post:', newPost);
      
      setIsSubmitting(false);
      navigate('/');
    }, 2000);
  };

  const handleCancel = () => {
    if (selectedImage || caption) {
      if (window.confirm('Are you sure you want to discard this post?')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={handleCancel}
            className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Post
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedImage || isSubmitting}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Share'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Photo *
          </label>
          <ImageUploader
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            onRemoveImage={handleRemoveImage}
          />
        </div>

        {/* Caption */}
        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Caption
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Share your farming story, tips, or experiences..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            rows="4"
            maxLength="2000"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Use hashtags to reach more farmers (e.g., #OrganicFarming #RiceHarvest)
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {caption.length}/2000
            </span>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Add Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Kathmandu, Nepal"
            className="input w-full"
          />
        </div>

        {/* Privacy Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Who can see this post?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="privacy"
                value="public"
                checked={privacy === 'public'}
                onChange={(e) => setPrivacy(e.target.value)}
                className="mr-3"
              />
              <Globe className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                Public - Anyone can see this post
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="privacy"
                value="followers"
                checked={privacy === 'followers'}
                onChange={(e) => setPrivacy(e.target.value)}
                className="mr-3"
              />
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                Followers only
              </span>
            </label>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-lg p-4">
          <h3 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
            Tips for a great post:
          </h3>
          <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
            <li>• Share your farming experiences and knowledge</li>
            <li>• Use relevant hashtags to reach other farmers</li>
            <li>• Add your location to connect with local farmers</li>
            <li>• Ask questions to start conversations</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;