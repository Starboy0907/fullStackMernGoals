import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'


function App() {
  //const notify = () => toast.error(" ");
  return (
      //components have to return in a div
    <>
      
      <Router>
        <div className='container'>
          <Header />
            <Routes>  
              <Route path='/' element={<Dashboard />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Register' element={<Register />} />
            </Routes>
        </div>
      </Router>
      <ToastContainer />
    
    </>
  );
}

export default App;
