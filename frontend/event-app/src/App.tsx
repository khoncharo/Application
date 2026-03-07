import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsListPage from './pages/EventsListPage';
import EventDetailsPage from './pages/EventDetailsPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import MyEventsPage from './pages/MyEventsPage';

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Public + authenticated pages share the Layout */}
        <Route element={<Layout />}>
          {/* Accessible by everyone */}
          <Route path="/" element={<EventsListPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />

          {/* Authenticated only */}
          <Route element={<ProtectedRoute />}>
            <Route path="/events/:id/edit" element={<EditEventPage />} />
            <Route path="/create" element={<CreateEventPage />} />
            <Route path="/my-events" element={<MyEventsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}