import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Hero from './component/Hero/Hero.jsx';
import About from './component/About/About.jsx';

import Services from './component/Services/Services.jsx';
import Contact from './component/Contact/Contact.jsx';
import Work from './component/Work/Work.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero/>,
  },
  {
    path: "/About",
    element: <About/>,
  },
  {
    path: "/work",
    element: <Work/>,
  },
  {
    path: "/Services",
    element: <Services/>,
  },
  {
    path: "/Contact",
    element: <Contact/>
  },
  
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
       {/* ✅ Wrap RouterProvider */}
        <RouterProvider router={router} />
      
    </StrictMode>,


)
