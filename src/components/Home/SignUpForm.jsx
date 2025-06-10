import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async () => {
    setError(null)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })
    if (signUpError) return setError(signUpError.message)
    const user_id = data.user.id
    const { error: profileError } = await supabase.from('profiles').insert([
      { user_id, username },
    ])
    if (profileError) return setError(profileError.message)
    alert('Account created! Check your email for confirmation.')
  }

    return (
    <div>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}