import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Sidebar from "./components/sidebar";
import Loading from "./components/loading";

// pages
import Index from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Chat from "./pages/chat";
import CreateChat from "./pages/createChat";
import Profile from "./pages/profile/profile";
import ChatSettings from "./pages/chat-settings/chatSettings";
import Search from "./pages/search";

// hook
import ProtectedRoute from './hook/protectedRoute'

export default function App() {

  useEffect(() => {
    const sendOfflineNotification = () => {
      toast.error("Sei offline");
    }
    window.addEventListener('offline', sendOfflineNotification)
    return () => removeEventListener('offline', sendOfflineNotification);
  }, []);

  return (
    <>
      <div className="grid grid-cols-[auto_1fr]">
        <div>
           <Sidebar />
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path="/create-chat" element={<ProtectedRoute><CreateChat /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/chat-settings" element={<ProtectedRoute><ChatSettings /></ProtectedRoute>} />
          </Routes>
        </main>

        <Loading />

        <ToastContainer 
          position="top-right"    
          autoClose={2000}         
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"       
        />
      </div>

      <footer>

      </footer>
    </>
  )
}