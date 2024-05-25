import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Response = () => {
  const router = useRouter();
  const { id } = router.query;
  const [responses, setResponses] = useState([]);
 
  useEffect(()=>{
    const ud=localStorage.getItem('userdetail')
    if(!ud||ud==''){
      router.push('/login')
    }
    
 })

  useEffect(() => {
    if (id) {
      const storedResponses = JSON.parse(localStorage.getItem(`responses`)) || {};
      if (storedResponses[id]) {
        setResponses(storedResponses[id]);
      } else {
        toast.error('No responses found for this form.');
      }
    }
  }, [id]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Form Responses</h1>
          {responses.length === 0 ? (
            <p className="text-gray-600">No responses yet.</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  {Object.keys(responses[0]).map((key) => (
                    <th key={key} className="py-2 px-4 border-b">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={index}>
                    {Object.entries(response).map(([key, value], idx) => (
                      <td key={idx} className="py-2 px-4 border-b">
                        {Array.isArray(value)
                          ? value.map((item, subIdx) => (
                              <div key={subIdx}>{item.label || item}</div>
                            ))
                          : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button 
            onClick={() => router.push('/home')} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Response;
