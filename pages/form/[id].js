import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

const FormPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(()=>{
    const ud=localStorage.getItem('userdetail')
    if(!ud||ud==''){
      router.push('/login')
    }
   
 })
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    color: '',
    terms: false,
    rating: 5,
    languages: []
  });

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
    // Add more languages as needed
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLanguageChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: selectedOptions || []
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responses = JSON.parse(localStorage.getItem('responses')) || {};
    if (!responses[id]) {
      responses[id] = [];
    }
    responses[id].push(formData);
    localStorage.setItem(`responses`, JSON.stringify(responses));
    toast.success('Form submitted successfully');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Form {id}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Favorite Color</label>
            <select 
              name="color" 
              value={formData.color} 
              onChange={handleChange} 
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
              required
            >
              <option value="" disabled>Select a color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
            </select>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="terms" 
              checked={formData.terms} 
              onChange={handleChange} 
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded" 
              required
            />
            <label className="ml-2 block text-sm text-gray-900">Accept Terms</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input 
              type="range" 
              name="rating" 
              min="1" 
              max="10" 
              value={formData.rating} 
              onChange={handleChange} 
              className="mt-1 w-full" 
            />
            <div className="text-center mt-2 text-gray-700">{formData.rating}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Languages You Speak</label>
            <Select 
              isMulti 
              name="languages" 
              options={languageOptions} 
              value={formData.languages} 
              onChange={handleLanguageChange} 
              className="mt-1"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
