import { getTagColor } from '../utils/tagsColours';
import type { Tag } from '../types';

interface TagChipProps {
  tag: Tag;
  size?: 'sm' | 'md';
}

export default function TagChip({ tag, size = 'sm' }: TagChipProps) {
  const { bg, text } = getTagColor(tag.name);
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';
  return (
    <span className={`inline-flex items-center rounded-full font-medium capitalize ${bg} ${text} ${sizeClass}`}>
      {tag.name}
    </span>
  );
}