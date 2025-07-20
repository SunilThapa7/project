import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Phone className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">Phone</h2>
          </div>
          <p className="text-gray-600">+1 (555) 123-4567</p>
          <p className="text-gray-600">Monday - Friday: 9AM - 5PM</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">Email</h2>
          </div>
          <p className="text-gray-600">support@farmassist.com</p>
          <p className="text-gray-600">info@farmassist.com</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">Address</h2>
          </div>
          <p className="text-gray-600">123 Farm Street</p>
          <p className="text-gray-600">Agricultural District</p>
          <p className="text-gray-600">Rural County, ST 12345</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;