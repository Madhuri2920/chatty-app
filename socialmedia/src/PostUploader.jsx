
import React, { useState } from 'react';

function PostUploader() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('❌ Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      const res = await fetch('http://localhost:5000/api/posts/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Post uploaded!');
        setPreview(data.post.imageUrl); // Set image preview
      } else {
        setMessage('❌ Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err); // ✅ Using 'err' to avoid ESLint warning
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        📤 Upload a Post
      </h2>

      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border rounded p-2 w-full sm:w-auto"
        />

        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border rounded p-2 w-full sm:w-1/2"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Upload
        </button>
      </form>

      {message && (
        <div className="mt-4 text-sm text-gray-700">{message}</div>
      )}

      {preview && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">📸 Preview</h3>
          <img
            src={`http://localhost:5000${preview}`}
            alt="Preview"
            className="w-full max-w-sm rounded border"
          />
        </div>
      )}
    </div>
  );
}

export default PostUploader;
