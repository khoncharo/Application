import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer, type View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getCalendarColor, getTagColor } from '../utils/tagsColours';
import type { Tag } from '../types';
import { getMyEvents } from '../api/events';
import type { UserEvent } from '../types';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { 'en-US': enUS },
});

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resource?: UserEvent;
  color?: string;
  tags?: Tag[];
}

type AppView = 'month' | 'week' | 'agenda';

export default function MyEventsPage() {
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<AppView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    getMyEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const calEvents: CalendarEvent[] = events.map((e) => {
    const start = new Date(e.dateTime);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const color = e.tags && e.tags.length > 0 ? getCalendarColor(e.tags[0].name) : undefined;
    return { title: e.name, start, end, resource: e, color, tags: e.tags ?? [] };
  });

  const handleSelectEvent = (calEvent: CalendarEvent) => {
    if (calEvent.resource) {
      const anyResource = calEvent.resource as UserEvent & { id?: string };
      if (anyResource.id) navigate(`/events/${anyResource.id}`);
    }
  };

  const agendaEvents = calEvents.filter(
    e => e.start >= startOfMonth(currentDate) && e.start <= endOfMonth(currentDate)
  );
  const agendaMonthLabel = format(currentDate, 'MMMM yyyy');
  const prevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-subtle rounded w-1/4 mb-6" />
        <div className="h-96 bg-subtle rounded-xl" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="page-title">My Events</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          {events.length === 0
            ? 'No events yet'
            : `${events.length} event${events.length > 1 ? 's' : ''} you're part of`}
        </p>
      </div>

      {events.length === 0 ? (
        <div className="card text-center py-16">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-slate-800 font-medium mb-1">You are not part of any events yet</p>
          <p className="text-muted text-sm">
            Explore public events and join.{' '}
            <button onClick={() => navigate('/')} className="text-accent hover:underline">
              Browse events →
            </button>
          </p>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">

          {/* Agenda view — custom with its own nav + view switcher */}
          {view === 'agenda' ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-5">
                {/* Month navigation */}
                <div className="flex items-center gap-2">
                  <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-subtle text-slate-500 hover:text-accent transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-semibold text-slate-800 min-w-[130px] text-center">{agendaMonthLabel}</span>
                  <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-subtle text-slate-500 hover:text-accent transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                {/* Switch back to month/week */}
                <div className="flex gap-1">
                  {(['month', 'week', 'agenda'] as AppView[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                        view === v ? 'bg-accent text-white' : 'text-slate-500 hover:text-accent hover:bg-subtle'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {agendaEvents.length === 0 ? (
                <p className="text-center text-slate-400 py-10 text-sm">No events in {agendaMonthLabel}</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {agendaEvents
                    .sort((a, b) => a.start.getTime() - b.start.getTime())
                    .map((e, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectEvent(e)}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-subtle transition-colors text-left w-full group"
                      >
                        {/* Color dot */}
                        <div className="shrink-0 flex flex-col items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded-full mt-1" style={{ backgroundColor: e.color ?? '#6366f1' }} />
                        </div>
                        <div className="shrink-0 w-12 text-center">
                          <div className="text-xs text-slate-400 uppercase">{format(e.start, 'EEE')}</div>
                          <div className="text-xl font-semibold text-slate-800 leading-none">{format(e.start, 'd')}</div>
                        </div>
                        <div className="w-px h-10 bg-border shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 group-hover:text-accent transition-colors truncate">{e.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {format(e.start, 'HH:mm')} – {format(e.end, 'HH:mm')}
                          </p>
                          {e.tags && e.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {e.tags.map((tag: Tag) => {
                                const { bg, text } = getTagColor(tag.name);
                                return (
                                  <span key={tag.id} className={`px-1.5 py-0.5 rounded-full text-xs font-medium capitalize ${bg} ${text}`}>
                                    {tag.name}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>
          ) : (
            /* Month / Week — use the calendar's own built-in toolbar */
            <div className="p-4" style={{ height: 650 }}>
              <Calendar
                localizer={localizer}
                events={calEvents}
                view={view as View}
                onView={(v) => setView(v as AppView)}
                views={['month', 'week', 'agenda']}
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
                onSelectEvent={handleSelectEvent}
                toolbar={true}
                popup
                style={{ height: '100%' }}
                eventPropGetter={(e: CalendarEvent) => ({ style: { cursor: 'pointer', backgroundColor: e.color ?? '#6366f1', borderColor: e.color ?? '#6366f1' } })}
                tooltipAccessor={(e) => `${e.title} — ${format(e.start, 'HH:mm')}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}