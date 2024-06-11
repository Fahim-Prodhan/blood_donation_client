/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const ContactUs = () => {
    return (
        <div className="mt-[100px] min-h-screen bg-[#A0153E] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full md:p-8 rounded-lg  grid lg:grid-cols-2 gap-10">
        <div className="flex justify-between items-center mb-8 order-last">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-2">Contact Us</h2>
            <p className="text-white">Not sure what you need? The team will be happy to listen to you and suggest event ideas you hadn't considered</p>
            <div className="mt-4 text-white">
              <p>Email: info@bloodbridge.com</p>
              <p>Support: (+880) 123 456 586</p>
            </div>
          </div>
        </div>

        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">We'd love to hear from you! Let's get in touch</h2>
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    BD
                  </span>
                  <input
                    type="text"
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="+880 1111 000-0000"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                placeholder="Type your message here"
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#FF204E] text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default ContactUs;