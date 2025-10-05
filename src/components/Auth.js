import React, { useState } from 'react';
import { setToken } from '../utils/auth';

export default function Auth({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handle = async () => {
    const url = isRegister ? '/api/auth/register' : '/api/auth/login';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      setToken(data.token);
      setUser({ token: data.token });
      setEmail(''); setPassword('');
    } catch(err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="button" onClick={handle}>{isRegister ? 'Register' : 'Login'}</button>
      <div style={{ fontSize:'0.8em', cursor:'pointer', color:'blue' }}
           onClick={()=>setIsRegister(!isRegister)}>
        {isRegister ? 'Already have an account? Login' : 'No account? Register'}
      </div>
    </div>
  );
}
