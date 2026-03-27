import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getEventDetails, joinEvent, leaveEvent, deleteEvent } from '../api/events';
import { useAuthStore } from '../store/authStore';
import DeleteModal from '../components/DeleteModal';
import TagChip from '../components/TagChip';
import type { EventDetails } from '../types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function initials(first: string, last: string) {
  return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
}

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useAuthStore();

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  const loadEvent = async () => {
    if (!id) return;
    try {
      const data = await getEventDetails(id);
      setEvent(data);
    } catch {
      setError('Event not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="animate-pulse max-w-3xl">
        <div className="h-8 bg-subtle rounded w-1/2 mb-4" />
        <div className="h-4 bg-subtle rounded w-full mb-2" />
        <div className="h-4 bg-subtle rounded w-3/4" />
      </div>
    );
  }

  if (error || !event) {
    return <div className="text-center py-20 text-red-400">{error || 'Not found'}</div>;
  }

  const isOrganizer = isAuthenticated && event.userId === userId;
  const isParticipant = isAuthenticated && event.participants.some((p) => p.id === userId);
  const isFull = event.capacity != null && event.participantCount >= event.capacity;
  const isPast = new Date(event.dateTime) < new Date();

  const handleJoin = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setActionLoading(true);
    setActionError('');
    try {
      await joinEvent(event.id);
      await loadEvent();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setActionError(msg ?? 'Failed to join event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    setActionLoading(true);
    setActionError('');
    try {
      await leaveEvent(event.id);
      await loadEvent();
    } catch {
      setActionError('Failed to leave event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await deleteEvent(event.id);
      navigate('/');
    } catch {
      setActionError('Failed to delete event');
      setShowDelete(false);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      {showDelete && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          loading={actionLoading}
        />
      )}

      {/* Back */}
      <Link to="/" className="text-sm text-muted hover:text-accent transition-colors mb-6 inline-flex items-center gap-1">
        ← Back to events
      </Link>

      {/* Header */}
      <div className="card mb-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-medium ${
                  event.type === 'PUBLIC' ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {event.type === 'PUBLIC' ? 'Public' : 'Private'}
              </span>
              {isOrganizer && (
                <span className="text-xs font-medium text-accent">
                  Organizer
                </span>
              )}
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">{event.name}</h1>
          </div>

          {/* Organizer actions */}
          {isOrganizer && (
            <div className="flex gap-2 shrink-0">
              <Link to={`/events/${event.id}/edit`} className="btn-ghost text-sm">
                Edit
              </Link>
              <button
                onClick={() => setShowDelete(true)}
                className="btn-danger text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <p className="text-slate-600 leading-relaxed mb-4">{event.description}</p>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {event.tags.map(tag => <TagChip key={tag.id} tag={tag} size="md" />)}
          </div>
        )}

        {/* Meta grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2.5 p-3 bg-subtle rounded-lg">
            <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-muted text-xs mb-0.5">Date & Time</p>
              <p className="text-slate-800 font-medium">{formatDate(event.dateTime)}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 bg-subtle rounded-lg">
            <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-muted text-xs mb-0.5">Location</p>
              <p className="text-slate-800 font-medium">{event.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 bg-subtle rounded-lg">
            <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-muted text-xs mb-0.5">Capacity</p>
              <p className={`font-medium ${isFull ? 'text-red-500' : 'text-slate-800'}`}>
                {event.participantCount}
                {event.capacity != null ? ` / ${event.capacity}` : ' participants'}
                {isFull && ' (Full)'}
              </p>
            </div>
          </div>
        </div>

        {/* Join/Leave button */}
        {!isOrganizer && (
          <div className="mt-5">
            {actionError && (
              <p className="text-red-500 text-sm mb-2">{actionError}</p>
            )}
            {!isAuthenticated ? (
              <div>
                <button
                  onClick={() => navigate('/login')}
                  disabled={isFull || isPast}
                  className="btn-primary w-full sm:w-auto"
                >
                  {isPast ? 'Event Ended' : isFull ? 'Event Full' : 'Sign in to Join'}
                </button>
                <p className="text-xs text-slate-400 mt-2">
                  Don't have an account?{' '}
                  <a href="/register" className="text-accent hover:underline">Register here</a>
                </p>
              </div>
            ) : isParticipant ? (
              <button
                onClick={handleLeave}
                disabled={actionLoading}
                className="btn-ghost w-full sm:w-auto"
              >
                {actionLoading ? 'Leaving…' : 'Leave Event'}
              </button>
            ) : (
              <button
                onClick={handleJoin}
                disabled={actionLoading || isFull || isPast}
                className="btn-primary w-full sm:w-auto"
              >
                {actionLoading ? 'Joining…' : isPast ? 'Event Ended' : isFull ? 'Event Full' : 'Join Event'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Participants */}
      <div className="card">
        <h2 className="font-semibold text-slate-900 mb-4">
          Participants
          <span className="text-muted font-normal text-sm ml-2">({event.participantCount})</span>
        </h2>

        {event.participants.length === 0 ? (
          <p className="text-muted text-sm">No participants yet. Be the first to join!</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {event.participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2.5 bg-subtle rounded-lg px-3 py-2"
                title={`${p.firstName} ${p.lastName}`}
              >
                <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-semibold text-accent">
                  {initials(p.firstName, p.lastName)}
                </div>
                <span className="text-sm text-slate-700">
                  {p.firstName} {p.lastName}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}