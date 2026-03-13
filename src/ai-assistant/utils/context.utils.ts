import {
  fetchAllEvents,
  fetchAttendingEvents,
} from '../repositories/ai-assistant.repository';

type EventWithRelations = Awaited<ReturnType<typeof fetchAllEvents>>[number];
type AttendingWithRelations = Awaited<
  ReturnType<typeof fetchAttendingEvents>
>[number];

export function fmt(d: Date): string {
  return d.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function buildEventLine(
  name: string,
  dateTime: Date,
  location: string,
  tags: string[],
  extra?: string,
): string {
  const base = `  - "${name}" | ${fmt(dateTime)} | ${location} | tags: [${tags.join(', ') || 'none'}]`;
  return extra ? `${base} | ${extra}` : base;
}

function formatEvent(e: EventWithRelations): string {
  const capacity = e.capacity ? `/${e.capacity}` : '';
  const people =
    e.participants
      .map((p) => `${p.user.firstName} ${p.user.lastName}`)
      .join(', ') || 'none';
  return (
    buildEventLine(
      e.name,
      e.dateTime,
      e.location,
      e.tags.map((et) => et.tag.name),
    ) + `\n    Attendees (${e._count.participants}${capacity}): ${people}`
  );
}

export function buildEventSection(
  label: string,
  events: EventWithRelations[],
): string {
  return (
    `## ${label} (${events.length})\n` +
    (events.length ? events.map(formatEvent).join('\n') : '  (none)')
  );
}

export function buildAttendingSection(
  attending: AttendingWithRelations[],
): string {
  return (
    `## Events I am attending — upcoming (${attending.length})\n` +
    (attending.length
      ? attending.map((p) => formatEvent(p.event)).join('\n')
      : '  (none)')
  );
}
