
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Added Link

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Login successful!');
        // localStorage.setItem('token', data.token); // optional

        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Server error');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[350px] text-center space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Welcome back to Chatty 👋</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Log In
        </button>

        {message && <div className="text-sm text-gray-700 mt-2">{message}</div>}

        {/* ✅ Sign up link added */}
        <div className="text-sm mt-4 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 underline hover:text-blue-700">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
