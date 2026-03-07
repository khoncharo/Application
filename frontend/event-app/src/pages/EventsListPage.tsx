import { useEffect, useState } from 'react';
import { getEvents } from '../api/events';
import { useAuthStore } from '../store/authStore';
import type { Event } from '../types';
import EventCard from '../components/EventCard';

export default function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  // Unauthenticated: public only. Authenticated: all events
  const visible = isAuthenticated
    ? events
    : events.filter((e) => e.type === 'PUBLIC');

  const filtered = visible.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">Upcoming Events</h1>
          <p className="text-slate-400 text-sm mt-0.5">{visible.length} events available</p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or location…"
          className="input-field sm:w-64"
        />
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse h-48">
              <div className="h-4 bg-subtle rounded w-3/4 mb-3" />
              <div className="h-3 bg-subtle rounded w-full mb-2" />
              <div className="h-3 bg-subtle rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {error && <div className="text-center py-16 text-red-500">{error}</div>}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No events found</p>
          <p className="text-muted text-sm mt-1">Try adjusting your search</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}