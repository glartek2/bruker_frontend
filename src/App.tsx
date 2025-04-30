import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './routes/Home';
import SearchRooms from './routes/SearchRooms';
import ViewRoom from './routes/ViewRoom';
import NotFound from './routes/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SearchRooms />} />
        <Route path='/room' element={<ViewRoom />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
