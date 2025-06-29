import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { useAuthStore } from './stores/authStore';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import SeatSelection from './pages/SeatSelection';
import BookingForm from './pages/BookingForm';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

function App() {
  const { isLoggedIn } = useAuthStore();

  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search-results' element={<SearchResults />} />
            <Route
              path='/seat-selection/:trainId/:date'
              element={
                isLoggedIn ? <SeatSelection /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/booking/:trainId/:date/:seats'
              element={isLoggedIn ? <BookingForm /> : <Navigate to='/login' />}
            />
            <Route
              path='/my-bookings'
              element={isLoggedIn ? <MyBookings /> : <Navigate to='/login' />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
