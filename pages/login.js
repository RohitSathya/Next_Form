import { useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(username==''||password==''||username==' '||password==' '){
      toast.warn('All fields must be filled')
    }
    else{
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data=await res.json()
        const i1=data.dat1
        const i2=data.dat2
        const all={
          username:i1,password:i2
        }
        localStorage.setItem('userdetail',JSON.stringify(all))
       
        router.push('/home');
      } else {
        toast.error('Wrong Credentials')
  
      }

    }
   
  };

  return (
    <>
    <ToastContainer />
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/signup')} 
            className="w-full px-4 py-2 mt-2 text-blue-700 hover:text-blue-800 transition duration-300"
          >
            New User? Register Here
          </button>
        </form>
      </div>
    </div>
    </>
    
  );
}
