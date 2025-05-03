import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import NavBar from './components/NavBar';
import Dock from './components/Dock';
import Footer from './components/Footer';

import Home from './routes/Home';
import Profile from './routes/Profile';
import SearchRooms from './routes/SearchRooms';
import ViewRoom from './routes/ViewRoom';
import NotFound from './routes/NotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/search' element={<SearchRooms />} />
        <Route path='/room' element={<ViewRoom />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Dock />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
