import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('codux_token'));
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  const apiClient = axios.create({ baseURL: 'https://coduxdotfun-server.onrender.com/api' });

  apiClient.interceptors.request.use(config => {
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  });

  useEffect(() => { if (token) fetchInquiries(); }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const response = await apiClient.post('/public/authenticate', loginForm);
      const newToken = response.data.token;
      localStorage.setItem('codux_token', newToken);
      setToken(newToken);
    } catch (err) {
      setError('Authentication failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { localStorage.removeItem('codux_token'); setToken(null); };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/admin/inquiries');
      setInquiries(response.data);
    } catch (err) {
      if (err.response?.status === 403) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Permanently delete this record?')) return;
    try {
      await apiClient.delete(`/admin/inquiries/${id}`);
      setInquiries(inquiries.filter(inq => inq.id !== id));
    } catch (err) {
      alert('Deletion failed.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative bg-background">
        <button onClick={() => navigate('/')} className="absolute top-8 left-8 text-mutedForeground flex items-center gap-2 hover:text-white transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Return to Public Site
        </button>
        <div className="premium-card w-full max-w-md p-10">
          <div className="flex justify-center mb-8">
            <div className="bg-white text-black p-3 rounded-2xl"><ShieldCheck size={32} /></div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 tracking-tight">Admin Authentication</h2>
          <p className="text-mutedForeground text-sm text-center mb-8">Secure access for authorized personnel only.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input type="email" placeholder="Administrator Email" className="input-field" required value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} />
            </div>
            <div>
              <input type="password" placeholder="Password" className="input-field" required value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} />
            </div>
            {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-4">
              {loading ? 'Verifying...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Command Console</h2>
          <p className="text-mutedForeground text-sm">Manage global incoming project inquiries.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="btn-secondary text-sm px-6 py-2">View Live Site</button>
          <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-2 text-sm font-medium bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors">
            <LogOut size={16} /> Terminate Session
          </button>
        </div>
      </div>

      <div className="premium-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium text-mutedForeground">Received</th>
                <th className="px-6 py-4 font-medium text-mutedForeground">Client Identity</th>
                <th className="px-6 py-4 font-medium text-mutedForeground">Project Scope</th>
                <th className="px-6 py-4 font-medium text-mutedForeground">Budget</th>
                <th className="px-6 py-4 font-medium text-mutedForeground">Brief</th>
                <th className="px-6 py-4 font-medium text-mutedForeground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inquiries.length === 0 ? (
                <tr><td colSpan="6" className="p-12 text-center text-mutedForeground">No active inquiries in the database.</td></tr>
              ) : inquiries.map(inq => (
                <tr key={inq.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-mutedForeground">{new Date(inq.created_at).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{inq.full_name}</div>
                    <div className="text-mutedForeground">{inq.email}</div>
                    <div className="text-xs text-mutedForeground mt-1">{inq.phone_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white">
                      {inq.service_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{inq.budget_range}</td>
                  <td className="px-6 py-4">
                    <p className="max-w-[250px] truncate text-mutedForeground" title={inq.project_description}>{inq.project_description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => deleteInquiry(inq.id)} className="text-mutedForeground hover:text-red-400 p-2 rounded-md hover:bg-red-500/10 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}