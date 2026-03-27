import type { Meta, StoryObj } from '@storybook/react';
import TagChip from '../components/TagChip';

const meta: Meta<typeof TagChip> = {
  title: 'UI/TagChip',
  component: TagChip,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof TagChip>;

export const Tech: Story = {
  args: { tag: { id: '1', name: 'tech' }, size: 'sm' },
};

export const Medium: Story = {
  args: { tag: { id: '1', name: 'music' }, size: 'md' },
};

export const CustomTag: Story = {
  args: { tag: { id: '1', name: 'my-custom-tag' }, size: 'sm' },
};

export const AllTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['tech', 'art', 'business', 'music', 'sports', 'food', 'health', 'education', 'travel', 'social', 'custom-tag', 'workshop'].map(name => (
        <TagChip key={name} tag={{ id: name, name }} size="sm" />
      ))}
    </div>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <TagChip tag={{ id: '1', name: 'tech' }} size="sm" />
      <TagChip tag={{ id: '2', name: 'tech' }} size="md" />
    </div>
  ),
};