import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { CreateEventDto, Tag } from '../types';
import { getTags, createTag } from '../api/tags';
import { getTagColor } from '../utils/tagsColours';

interface EventFormProps {
  initialValues?: Partial<CreateEventDto> & { tags?: Tag[] };
  onSubmit: (data: CreateEventDto) => Promise<void>;
  submitLabel: string;
  participantCount?: number;
}

interface FormState {
  name: string;
  description: string;
  dateTime: Date | null;
  location: string;
  capacity: string;
  type: 'PUBLIC' | 'PRIVATE';
  tagIds: string[];
}

interface FormErrors {
  name?: string;
  description?: string;
  dateTime?: string;
  location?: string;
  capacity?: string;
  tagIds?: string;
}

export default function EventForm({ initialValues, onSubmit, submitLabel, participantCount }: EventFormProps) {
  const [form, setForm] = useState<FormState>({
    name: initialValues?.name ?? '',
    description: initialValues?.description ?? '',
    dateTime: initialValues?.dateTime ? new Date(initialValues.dateTime) : null,
    location: initialValues?.location ?? '',
    capacity: initialValues?.capacity != null ? String(initialValues.capacity) : '',
    type: initialValues?.type ?? 'PUBLIC',
    tagIds: initialValues?.tags?.map(t => t.id) ?? initialValues?.tagIds ?? [],
  });

  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [tagSearch, setTagSearch] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [newTagError, setNewTagError] = useState('');
  const [newTagLoading, setNewTagLoading] = useState(false);

  useEffect(() => {
    getTags().then(setAvailableTags).catch(console.error);
  }, []);

  const toggleTag = (id: string) => {
    setForm(f => {
      if (f.tagIds.includes(id)) return { ...f, tagIds: f.tagIds.filter(t => t !== id) };
      if (f.tagIds.length >= 5) return f;
      return { ...f, tagIds: [...f.tagIds, id] };
    });
  };

  const handleCreateTag = async () => {
    const name = tagSearch.trim().toLowerCase();
    if (!name) return;
    if (name.length < 2 || name.length > 30) {
      setNewTagError('Tag name must be 2–30 characters');
      return;
    }
    if (!/^[a-z0-9 _-]+$/.test(name)) {
      setNewTagError('Only letters, numbers, spaces, hyphens, underscores');
      return;
    }
    // If tag already exists in the list, just select it
    const existing = availableTags.find(t => t.name === name);
    if (existing) {
      if (!form.tagIds.includes(existing.id) && form.tagIds.length < 5) {
        setForm(f => ({ ...f, tagIds: [...f.tagIds, existing.id] }));
      }
      setTagSearch('');
      setNewTagError('');
      return;
    }
    if (form.tagIds.length >= 5) {
      setNewTagError('Maximum 5 tags reached');
      return;
    }
    setNewTagLoading(true);
    try {
      const tag = await createTag(name);
      setAvailableTags(prev => [...prev, tag]);
      setForm(f => ({ ...f, tagIds: [...f.tagIds, tag.id] }));
      setTagSearch('');
      setNewTagError('');
    } catch {
      setNewTagError('Failed to create tag');
    } finally {
      setNewTagLoading(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Title is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.dateTime) {
      newErrors.dateTime = 'Date and time are required';
    } else if (form.dateTime <= new Date()) {
      newErrors.dateTime = 'Event cannot be in the past';
    }
    if (form.capacity && isNaN(Number(form.capacity))) {
      newErrors.capacity = 'Capacity must be a number';
    } else if (form.capacity && participantCount !== undefined && Number(form.capacity) < participantCount) {
      newErrors.capacity = `Capacity cannot be less than the number of joined participants (${participantCount})`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError('');
    try {
      await onSubmit({
        name: form.name.trim(),
        description: form.description.trim(),
        dateTime: form.dateTime!.toISOString(),
        location: form.location.trim(),
        capacity: form.capacity ? Number(form.capacity) : null,
        type: form.type,
        tagIds: form.tagIds,
      });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
      setServerError(Array.isArray(msg) ? msg.join(', ') : msg ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Title */}
      <div>
        <label className="label">Event Title *</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input-field"
          placeholder="Give your event a name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="input-field resize-none"
          rows={3}
          placeholder="What's this event about?"
        />
      </div>

      {/* Date/Time */}
      <div>
        <label className="label">Date & Time *</label>
        <DatePicker
          selected={form.dateTime}
          onChange={(date) => setForm((f) => ({ ...f, dateTime: date }))}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy HH:mm"
          placeholderText="Pick a date and time"
          className="input-field w-full"
          minDate={new Date()}
        />
        {errors.dateTime && <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="label">Location *</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          className="input-field"
          placeholder="Where is it happening?"
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>

      {/* Capacity */}
      <div>
        <label className="label">Capacity <span className="text-muted font-normal">(optional)</span></label>
        <input
          type="number"
          value={form.capacity}
          onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
          className="input-field"
          placeholder="Leave empty for unlimited"
          min={1}
        />
        {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
      </div>

      {/* Tags */}
      <div>
        <label className="label">
          Tags <span className="text-muted font-normal">(optional · max 5)</span>
        </label>

        {/* Selected tag chips */}
        {form.tagIds.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2 mt-1">
            {form.tagIds.map(id => {
              const tag = availableTags.find(t => t.id === id);
              if (!tag) return null;
              const { bg, text } = getTagColor(tag.name);
              return (
                <span key={id} className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${bg} ${text}`}>
                  {tag.name}
                  <button type="button" onClick={() => toggleTag(id)} className="hover:opacity-70 ml-0.5">×</button>
                </span>
              );
            })}
          </div>
        )}

        {/* Combobox */}
        {form.tagIds.length < 5 && (
          <div className="relative">
            <input
              type="text"
              value={tagSearch}
              onChange={e => { setTagSearch(e.target.value); setNewTagError(''); }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // If exact match in filtered list — select it
                  const exact = availableTags.find(t => t.name === tagSearch.toLowerCase().trim());
                  if (exact) { toggleTag(exact.id); setTagSearch(''); }
                  else handleCreateTag();
                }
                if (e.key === 'Escape') setTagSearch('');
              }}
              placeholder="Search or create a tag…"
              className="input-field text-sm"
              maxLength={30}
            />
            {/* Dropdown */}
            {tagSearch.trim().length > 0 && (
              <div className="absolute z-20 mt-1 w-full bg-white border border-border rounded-lg shadow-lg overflow-hidden">
                {availableTags
                  .filter(t => t.name.includes(tagSearch.toLowerCase().trim()) && !form.tagIds.includes(t.id))
                  .slice(0, 8)
                  .map(tag => {
                    const { bg, text } = getTagColor(tag.name);
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => { toggleTag(tag.id); setTagSearch(''); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-subtle transition-colors text-left"
                      >
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${bg} ${text}`}>{tag.name}</span>
                      </button>
                    );
                  })}
                {/* Create option — shown when no exact match */}
                {!availableTags.find(t => t.name === tagSearch.toLowerCase().trim()) && (
                  <button
                    type="button"
                    onClick={handleCreateTag}
                    disabled={newTagLoading}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-accent hover:bg-subtle transition-colors text-left border-t border-border"
                  >
                    {newTagLoading ? '…' : <>+ Create <span className="font-medium">"{tagSearch.trim()}"</span></>}
                  </button>
                )}
                {/* No results and already exists */}
                {availableTags.filter(t => t.name.includes(tagSearch.toLowerCase().trim()) && !form.tagIds.includes(t.id)).length === 0
                  && availableTags.find(t => t.name === tagSearch.toLowerCase().trim()) && (
                  <p className="px-3 py-2 text-xs text-slate-400">Already selected</p>
                )}
              </div>
            )}
          </div>
        )}
        {form.tagIds.length >= 5 && (
          <p className="text-amber-600 text-xs mt-1">Maximum 5 tags reached</p>
        )}
        {newTagError && <p className="text-red-500 text-xs mt-1">{newTagError}</p>}
        {errors.tagIds && <p className="text-red-500 text-sm mt-1">{errors.tagIds}</p>}
      </div>

      {/* Visibility */}
      <div>
        <label className="label">Visibility</label>
        <div className="flex gap-3">
          {(['PUBLIC', 'PRIVATE'] as const).map((t) => (
            <label
              key={t}
              className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border transition-colors ${
                form.type === t
                  ? 'border-accent bg-subtle text-accent'
                  : 'border-border text-slate-500 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name="type"
                value={t}
                checked={form.type === t}
                onChange={() => setForm((f) => ({ ...f, type: t }))}
                className="sr-only"
              />
              <span className="text-sm font-medium capitalize">{t.toLowerCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}