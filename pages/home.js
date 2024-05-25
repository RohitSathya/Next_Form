import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [forms, setForms] = useState([]);
  const router = useRouter();

  useEffect(()=>{
     const ud=localStorage.getItem('userdetail')
     if(!ud||ud==''){
       router.push('/login')
     }
    
  })

  useEffect(() => {
    const savedForms = JSON.parse(localStorage.getItem('forms')) || [];
    setForms(savedForms);
  }, []);

  const addNewForm = () => {
    const newForm = { id: Date.now(), name: `Form ${forms.length + 1}`, enabled: true, responses: [] };
    const updatedForms = [...forms, newForm];
    setForms(updatedForms);
    localStorage.setItem('forms', JSON.stringify(updatedForms));
  };

  

  const viewForm = (id) => {
    router.push(`/form/${id}`);
  };

  const viewResponses = (id) => {
    router.push(`/responses/${id}`);
  };
  function logout(){
    localStorage.removeItem('userdetail')

    router.push('/login')

  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">My Forms</h1>
          <div className="mb-4 flex space-x-4">
            <button 
              onClick={addNewForm} 
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              Add New Form
            </button>
            <button 
              onClick={logout} 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
          <div className="space-y-4">
            {forms.map((form) => (
              <div key={form.id} className="p-4 border rounded-md bg-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{form.name}</h2>
                  <p className="text-gray-600">{form.enabled ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => viewForm(form.id)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    View Form
                  </button>
                  <button 
                    onClick={() => viewResponses(form.id)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    View Responses
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
