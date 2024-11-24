// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import Header from './components/Header';  // Import the Header component
import About from './pages/About';
import Contact from './pages/Contact';
import VideoLinks from './components/VideoLinks';
import SongList from './components/SongList';
import BlogPage from './pages/BlogPage';
import SubscribeForm from './pages/Subscribe';
import Unsubscribe from './pages/Unsubscribe';
function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-100 min-h-screen overflow-x-hidden ">
        <Header /> {/* Include the Header component here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/websites" element={<VideoLinks />} />
          <Route path='/music' element={<SongList />} />
          <Route path='/blog' element={<BlogPage/>}/>
          <Route path='/subscribe' element={<SubscribeForm/>}/>
          <Route path='/unsubscribe' element={<Unsubscribe/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;