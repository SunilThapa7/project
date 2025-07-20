import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ onImageSelect, selectedImage, onRemoveImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect({
          file: file,
          preview: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (selectedImage) {
    return (
      <div className="relative">
        <img
          src={selectedImage.preview}
          alt="Selected"
          className="w-full h-96 object-cover rounded-lg"
        />
        <button
          onClick={onRemoveImage}
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {selectedImage.name}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          isDragging 
            ? 'bg-primary-100 dark:bg-primary-900/30' 
            : 'bg-gray-100 dark:bg-gray-700'
        }`}>
          {isDragging ? (
            <Upload className="w-8 h-8 text-primary-600" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-400" />
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {isDragging ? 'Drop your image here' : 'Upload a photo'}
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Drag and drop or click to select an image from your device
        </p>
        
        <div className="flex items-center space-x-2 text-sm text-gray-400 dark:text-gray-500">
          <span>Supports: JPG, PNG, GIF</span>
          <span>•</span>
          <span>Max size: 10MB</span>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;