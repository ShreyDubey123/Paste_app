import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Redux/pasteSlice';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);  // To manage the modal visibility
  const [selectedPaste, setSelectedPaste] = useState(null);      // To store the selected paste for sharing

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // Share functionality
  function handleShare(paste) {
    setSelectedPaste(paste);  // Set the paste to be shared
    setShowShareModal(true);   // Show the modal with sharing options
  }

  // Redirect to social media sharing links
  function handleRedirectToShare(platform) {
    if (!selectedPaste) return;
  
    const title = encodeURIComponent(selectedPaste.title);
    const content = encodeURIComponent(selectedPaste.content);
  
    let url = '';
  
    switch (platform) {
      case 'whatsapp':
        // Share directly to WhatsApp (this works on mobile and desktop WhatsApp Web)
        url = `https://wa.me/?text=Title:%20${title}%0AContent:%20${content}`;
        break;
      case 'facebook':
        // Share link to Facebook (sharing the page)
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        break;
      case 'gmail':
        // Use mailto link to open Gmail or default email client.
        const mailtoBody = `Subject=${title}&Body=${content}`;
        url = `mailto:?${mailtoBody}`;
        break;
      default:
        break;
    }
  
    // Open the respective social media link in a new tab.
    window.open(url, '_blank', 'noopener noreferrer');
    setShowShareModal(false); // Close the modal after redirection
  }
    

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg max-w-3xl">
        <input
          className="w-full p-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Search your paste"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-col gap-6">
          {filterData.length > 0 ? (
            filterData.map((paste) => (
              <div
                key={paste._id}
                className="border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">{paste.title}</h1>

                <div className="mt-4 flex gap-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all ease-in-out duration-200">
                    <a href={`/?pasteId=${paste._id}`}>Edit</a>
                  </button>

                  <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all ease-in-out duration-200">
                    <a href={`/pastes/${paste._id}`}>View</a>
                  </button>

                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all ease-in-out duration-200"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content).then(() => {
                        alert('Copied to clipboard');
                      });
                    }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition-all ease-in-out duration-200"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => handleShare(paste)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition-all ease-in-out duration-200"
                  >
                    Share
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-500">{paste.createdAt}</p>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-600">No pastes found</p>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && selectedPaste && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center mb-4">Choose a platform to share:</h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleRedirectToShare('whatsapp')}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all ease-in-out duration-200"
              >
                Share on WhatsApp
              </button>
              <button
                onClick={() => handleRedirectToShare('facebook')}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all ease-in-out duration-200"
              >
                Share on Facebook
              </button>
              <button
                onClick={() => handleRedirectToShare('gmail')}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-all ease-in-out duration-200"
              >
                Share via Gmail
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all ease-in-out duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paste;
