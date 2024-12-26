import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  
  // Find the paste by ID
  const paste = allPastes.filter((paste) => paste._id === id)[0];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg max-w-3xl">
        {/* Title Section */}
        <div className="flex flex-col gap-6">
          <input
            className="w-full p-4 rounded-xl border border-gray-300 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter your title here"
            value={paste.title}
            disabled
          />
        </div>

        {/* Content Section */}
        <div className="mt-8">
          <textarea
            className="w-full rounded-xl p-4 border border-gray-300 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your text here"
            value={paste.content}
            disabled
            rows={10}
          />
        </div>

        {/* Created Date Section */}
        <div className="mt-4 text-gray-600 text-sm text-right">
          <p>{paste.createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
