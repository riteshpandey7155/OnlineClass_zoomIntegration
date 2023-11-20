import { useState } from 'react';


import logoPng from "./assests/logo.png"
import Form from './components/Form'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [formData, setFormData] = useState(null);
  
  const handleFormSubmit = (data) => {
    setFormData(data)
  }

  return (
    <div className="App items-center justify-center h-screen text-xl overflow-hidden">
        <header className="App-header text-center">
          <h1 className='text-blue-900 text-4xl font-bold mb-0'>Online Class</h1>
          <img className="w-40 h-40 mx-auto"  src={logoPng} alt="logo" />
        </header>
        
        <Form onSubmit={handleFormSubmit}></Form>
        <ToastContainer />
    </div>
  );
}

export default App;
