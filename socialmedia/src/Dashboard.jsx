
// src/Dashboard.jsx
import PostUploader from './PostUploader';
import PostGallery from './PostGallery';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🎉 Welcome to Your Dashboard</h1>

      {/* Upload Post */}
      <div className="bg-white p-6 rounded-xl shadow-md text-black mb-8">
        <PostUploader />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-700 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">👥 Users</h2>
          <p>Manage or view user data.</p>
        </div>

        <div className="bg-purple-700 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">📝 Posts</h2>
          <p>Create and view your posts.</p>
        </div>

        <div className="bg-purple-700 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">⚙️ Settings</h2>
          <p>Update your profile and preferences.</p>
        </div>
      </div>

      {/* Post Gallery */}
      <PostGallery />
    </div>
  );
}

export default Dashboard;
