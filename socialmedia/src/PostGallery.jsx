// src/PostGallery.jsx
import { useEffect, useState } from 'react';

function PostGallery() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">🖼 Uploaded Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img
              src={`http://localhost:5000${post.imageUrl}`}
              alt="Post"
              className="w-full h-60 object-cover"
            />
            {post.caption && (
              <div className="p-2 text-sm text-gray-700">
                {post.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostGallery;
