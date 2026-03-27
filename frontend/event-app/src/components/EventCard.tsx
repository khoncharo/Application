import { Link } from 'react-router-dom';
import type { Event } from '../types';
import TagChip from './TagChip';

interface EventCardProps {
  event: Event;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function EventCard({ event }: EventCardProps) {
  const participantCount = event._count?.participants ?? 0;
  const isFull = event.capacity != null && participantCount >= event.capacity;

  return (
    <Link to={`/events/${event.id}`} className="block group">
      <div className="card hover:border-accent/50 transition-all duration-200 group-hover:bg-subtle h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-accent transition-colors line-clamp-2">
            {event.name}
          </h3>
          <span className={`shrink-0 text-xs font-medium ${event.type === 'PUBLIC' ? 'text-emerald-600' : 'text-amber-600'}`}>
            {event.type === 'PUBLIC' ? 'Public' : 'Private'}
          </span>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.map(tag => <TagChip key={tag.id} tag={tag} />)}
          </div>
        )}

        {/* Description */}
        <p className="text-slate-400 text-sm line-clamp-2 flex-1">{event.description}</p>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-xs text-muted mt-1">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.dateTime)}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={isFull ? 'text-red-400' : ''}>
              {participantCount}{event.capacity != null ? ` / ${event.capacity}` : ''} participants
              {isFull && ' · Full'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}