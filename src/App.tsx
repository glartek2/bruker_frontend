import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import NavBar from './components/Navbar';
import Dock from './components/Dock';
import Footer from './components/Footer';

import Home from './routes/Home';
import Profile from './routes/Profile';
import SearchRooms from './routes/SearchRooms';
import ViewRoom from './routes/ViewRoom';
import NotFound from './routes/NotFound';

import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AnimatePresence>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/search' element={<SearchRooms />} />
            <Route path='/room' element={<ViewRoom />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Dock />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
