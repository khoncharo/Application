import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getEvent, updateEvent } from '../api/events';
import { useAuthStore } from '../store/authStore';
import EventForm from '../components/EventForm';
import type { CreateEventDto, Event } from '../types';

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userId } = useAuthStore();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getEvent(id)
      .then((data) => {
        if (data.userId !== userId) {
          navigate(`/events/${id}`);
        }
        setEvent(data);
      })
      .catch(() => setError('Event not found'))
      .finally(() => setLoading(false));
  }, [id, userId, navigate]);

  const handleSubmit = async (data: CreateEventDto) => {
    if (!id) return;
    await updateEvent(id, data);
    navigate(`/events/${id}`);
  };

  if (loading) {
    return (
      <div className="animate-pulse max-w-xl">
        <div className="h-8 bg-subtle rounded w-1/3 mb-6" />
        <div className="card h-64" />
      </div>
    );
  }

  if (error || !event) {
    return <div className="text-center py-20 text-red-400">{error || 'Not found'}</div>;
  }

  return (
    <div className="animate-fade-in max-w-xl">
      <div className="mb-6">
        <Link to={`/events/${id}`} className="text-sm text-muted hover:text-accent transition-colors mb-3 inline-flex items-center gap-1">
          ← Back to event
        </Link>
        <h1 className="page-title">Edit Event</h1>
      </div>
      <div className="card">
        <EventForm
          initialValues={{
          ...event,
          capacity: event.capacity ?? undefined,
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
