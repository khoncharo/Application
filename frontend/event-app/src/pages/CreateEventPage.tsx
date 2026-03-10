import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/events';
import EventForm from '../components/EventForm';
import type { CreateEventDto } from '../types';

export default function CreateEventPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateEventDto) => {
    const event = await createEvent(data);
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="animate-fade-in max-w-xl">
      <div className="mb-6">
        <h1 className="page-title">Create Event</h1>
        <p className="text-slate-400 text-sm mt-0.5">Fill in the details below to create a new event</p>
      </div>
      <div className="card">
        <EventForm onSubmit={handleSubmit} submitLabel="Create Event" />
      </div>
    </div>
  );
}
