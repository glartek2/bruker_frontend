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
import Login from './routes/Login.tsx';
import GuestOnlyRoute from './components/GuestOnlyRoute.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import Register from './routes/Register.tsx';
import MoveReservation from './routes/MoveReservation.tsx';
import Activate from './routes/Activate.tsx';
import ReservationConfirmation from './routes/ReservationConfirmation.tsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AnimatePresence>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/login'
            element={
              <GuestOnlyRoute>
                <Login />
              </GuestOnlyRoute>
            }
          />
          <Route
            path='/register'
            element={
              <GuestOnlyRoute>
                <Register />
              </GuestOnlyRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path='/search' element={<SearchRooms />} />
          <Route path='/room'>
            <Route path=':roomId' element={<ViewRoom />} />
            <Route path=':roomId/:weekId' element={<ViewRoom />} />
          </Route>
          <Route path='/reservation'>
            <Route
              path=':action/:reservationId'
              element={
                <PrivateRoute>
                  <MoveReservation />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path='/activate/:uidb64/:token' element={<Activate />} />
          <Route
            path='/reservation_update_confirmation/:uidb64/:token/:reservationId'
            element={<ReservationConfirmation />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Dock />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
