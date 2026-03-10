const PALETTE = [
  { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: '#6366f1' },
  { bg: 'bg-purple-50', text: 'text-purple-700', dot: '#9333ea' },
  { bg: 'bg-blue-50', text: 'text-blue-700', dot: '#2563eb' },
  { bg: 'bg-pink-50', text: 'text-pink-700', dot: '#db2777' },
  { bg: 'bg-green-50', text: 'text-green-700', dot: '#16a34a' },
  { bg: 'bg-orange-50', text: 'text-orange-700', dot: '#ea580c' },
  { bg: 'bg-teal-50', text: 'text-teal-700', dot: '#0d9488' },
  { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: '#0891b2' },
  { bg: 'bg-amber-50', text: 'text-amber-700', dot: '#d97706' },
  { bg: 'bg-rose-50', text: 'text-rose-700', dot: '#e11d48' },
  { bg: 'bg-lime-50', text: 'text-lime-700', dot: '#65a30d' },
  { bg: 'bg-violet-50', text: 'text-violet-700', dot: '#7c3aed' },
  { bg: 'bg-sky-50', text: 'text-sky-700', dot: '#0284c7' },
  { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: '#059669' },
  { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', dot: '#c026d3' },
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return hash % PALETTE.length;
}

export function getTagColor(name: string) {
  return PALETTE[hashName(name.toLowerCase())];
}

export function getCalendarColor(tagName?: string): string {
  if (!tagName) return '#6366f1';
  return PALETTE[hashName(tagName.toLowerCase())].dot;
}
