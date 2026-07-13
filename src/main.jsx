import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Hero from './component/Hero/Hero.jsx';
import About from './component/About/About.jsx';
import Services from './component/Services/Services.jsx';
import Contact from './component/Contact/Contact.jsx';
import Work from './component/Work/Work.jsx';
import Resume from './component/Resume/Resume.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // ⚡ Ab App main root element ban gaya hai jisme WhatsApp icon laga hai
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/work",
        element: <Work />,
      },
      {
        path: "/Services",
        element: <Services />,
      },
      {
        path: "/Contact",
        element: <Contact />
      },
      {
        path: "/resume",
        element: <Resume />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)