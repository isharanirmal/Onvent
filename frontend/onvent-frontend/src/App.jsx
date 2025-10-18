import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import UserList from './components/UserList';
import EventCreation from './components/EventCreation';
import EventList from './components/EventList';
import TicketBooking from './components/TicketBooking';
import TicketView from './components/TicketView';
import UserDashboard from './components/UserDashboard';
import ApiTest from './components/ApiTest';
import FullCRUDTest from './components/FullCRUDTest';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users" element={<UserList />} />
          <Route path="register" element={<UserRegistration />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="events/create" element={<EventCreation />} />
          <Route path="events" element={<EventList />} />
          <Route path="tickets/book" element={<TicketBooking />} />
          <Route path="tickets" element={<TicketView />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="test" element={<ApiTest />} />
          <Route path="crud-test" element={<FullCRUDTest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;