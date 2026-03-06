import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { CreateEventDto } from '../types';

interface EventFormProps {
  initialValues?: Partial<CreateEventDto>;
  onSubmit: (data: CreateEventDto) => Promise<void>;
  submitLabel: string;
}

interface FormState {
  name: string;
  description: string;
  dateTime: Date | null;
  location: string;
  capacity: string;
  type: 'PUBLIC' | 'PRIVATE';
}

interface FormErrors {
  name?: string;
  description?: string;
  dateTime?: string;
  location?: string;
  capacity?: string;
}

export default function EventForm({ initialValues, onSubmit, submitLabel }: EventFormProps) {
  const [form, setForm] = useState<FormState>({
    name: initialValues?.name ?? '',
    description: initialValues?.description ?? '',
    dateTime: initialValues?.dateTime ? new Date(initialValues.dateTime) : null,
    location: initialValues?.location ?? '',
    capacity: initialValues?.capacity != null ? String(initialValues.capacity) : '',
    type: initialValues?.type ?? 'PUBLIC',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

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
        capacity: form.capacity ? Number(form.capacity) : undefined,
        type: form.type,
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
          placeholder="e.g. React Warsaw Meetup"
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="input-field resize-none"
          rows={4}
          placeholder="Tell people what this event is about…"
        />
      </div>

      {/* Date & Time */}
      <div>
        <label className="label">Date & Time *</label>
        <DatePicker
          selected={form.dateTime}
          onChange={(date) => setForm((f) => ({ ...f, dateTime: date }))}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy HH:mm"
          minDate={new Date()}
          placeholderText="Pick a date and time"
          className="input-field w-full"
          wrapperClassName="w-full"
        />
        {errors.dateTime && <p className="error-text">{errors.dateTime}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="label">Location *</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          className="input-field"
          placeholder="e.g. Warsaw, ul. Złota 59"
        />
        {errors.location && <p className="error-text">{errors.location}</p>}
      </div>

      {/* Capacity */}
      <div>
        <label className="label">Capacity (optional — leave blank for unlimited)</label>
        <input
          type="number"
          value={form.capacity}
          onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
          className="input-field"
          placeholder="e.g. 50"
          min={1}
        />
        {errors.capacity && <p className="error-text">{errors.capacity}</p>}
      </div>

      {/* Visibility */}
      <div>
        <label className="label">Visibility</label>
        <div className="flex gap-4">
          {(['PUBLIC', 'PRIVATE'] as const).map((t) => (
            <label
              key={t}
              className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg border transition-colors ${
                form.type === t
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-slate-600 hover:border-accent/50'
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
              <span className="text-sm font-medium">{t === 'PUBLIC' ? '🌐 Public' : '🔒 Private'}</span>
            </label>
          ))}
        </div>
      </div>

      {serverError && (
        <div className="text-red-500 text-sm">
          {serverError}
        </div>
      )}

      <button type="submit" className="btn-primary py-3 mt-2" disabled={loading}>
        {loading ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}