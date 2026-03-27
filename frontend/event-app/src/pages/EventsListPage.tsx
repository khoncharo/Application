import { useEffect, useState } from 'react';
import { getEvents } from '../api/events';
import { getTags } from '../api/tags';
import { useAuthStore } from '../store/authStore';
import type { Event, Tag } from '../types';
import EventCard from '../components/EventCard';
import { getTagColor } from '../utils/tagsColours';

export default function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    Promise.all([getEvents(), getTags()])
      .then(([evts, tgs]) => { setEvents(evts); setTags(tgs); })
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  const toggleTag = (id: string) => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const now = new Date();
  const visible = (isAuthenticated ? events : events.filter(e => e.type === 'PUBLIC'))
    .filter(e => new Date(e.dateTime) > now);

  const filtered = visible.filter(e => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tid => e.tags?.some(t => t.id === tid));
    return matchesSearch && matchesTags;
  });

  const noTagResults =
    visible.some(e =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
    ) && filtered.length === 0 && selectedTags.length > 0;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">Upcoming Events</h1>
          <p className="text-slate-400 text-sm mt-0.5">{visible.length} events available</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location…"
            className="input-field sm:w-64"
          />
          {/* Filter button */}
          <button
            onClick={() => setFilterOpen(true)}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              selectedTags.length > 0
                ? 'border-accent bg-subtle text-accent'
                : 'border-border text-slate-500 hover:border-accent hover:text-accent'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
            {selectedTags.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-white text-xs flex items-center justify-center leading-none">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <span className="text-xs text-slate-400">Filtered by:</span>
          {selectedTags.map(id => {
            const tag = tags.find(t => t.id === id);
            if (!tag) return null;
            const { bg, text } = getTagColor(tag.name);
            return (
              <span key={id} className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${bg} ${text}`}>
                {tag.name}
                <button onClick={() => toggleTag(id)} className="hover:opacity-70 ml-0.5">×</button>
              </span>
            );
          })}
          <button onClick={() => setSelectedTags([])} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
            Clear all
          </button>
        </div>
      )}

      {/* Loading skeleton */}
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

      {!loading && !error && noTagResults && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No events match the selected tags</p>
          <button onClick={() => setSelectedTags([])} className="text-accent text-sm hover:underline mt-2">
            Clear tag filters
          </button>
        </div>
      )}

      {!loading && !error && !noTagResults && filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No events found</p>
          <p className="text-muted text-sm mt-1">Try adjusting your search</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Filter drawer overlay */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={() => setFilterOpen(false)}
          />
          {/* Drawer */}
          <div className="w-72 bg-white h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-slate-900">Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-col gap-1">
                {tags.map(tag => {
                  const selected = selectedTags.includes(tag.id);
                  const { bg, text } = getTagColor(tag.name);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                        selected ? `${bg} ${text} font-medium` : 'text-slate-600 hover:bg-subtle'
                      }`}
                    >
                      {tag.name}
                      {selected && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-border flex gap-2">
              <button
                onClick={() => setSelectedTags([])}
                disabled={selectedTags.length === 0}
                className="flex-1 py-2 rounded-lg border border-border text-sm text-slate-500 hover:border-slate-400 disabled:opacity-40 transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-1 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}