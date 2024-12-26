import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');

  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((paste) => paste._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature)',
      }}
    >
      <div className="container mx-auto flex flex-col justify-center items-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <input
            className="border border-gray-800 p-3 rounded-xl w-full px-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border border-gray-800 p-4 rounded-xl w-full min-h-[150px] text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your text here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={6}
          />

          <button
            onClick={createPaste}
            className="bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition-all ease-in-out duration-200"
          >
            {pasteId ? 'Update my paste' : 'Create my paste'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
