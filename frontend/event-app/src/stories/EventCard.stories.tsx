import type { Meta, StoryObj } from '@storybook/react';
import EventCard from '../components/EventCard';
import type { Event } from '../types';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof EventCard>;

const baseEvent: Event = {
  id: '1',
  name: 'Design Sprint Workshop',
  description: 'A hands-on workshop where we tackle real product challenges using design sprint methodology.',
  dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  location: 'Warsaw, Poland',
  type: 'PUBLIC',
  userId: 'user-1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tags: [
    { id: 't1', name: 'art' },
    { id: 't2', name: 'tech' },
  ],
  _count: { participants: 8 },
};

export const Default: Story = {
  args: { event: baseEvent },
};

export const Private: Story = {
  args: {
    event: { ...baseEvent, type: 'PRIVATE', name: 'Team Retrospective' },
  },
};

export const NoTags: Story = {
  args: {
    event: { ...baseEvent, tags: [] },
  },
};

export const WithCapacity: Story = {
  args: {
    event: { ...baseEvent, capacity: 20, _count: { participants: 12 } },
  },
};

export const Full: Story = {
  args: {
    event: {
      ...baseEvent,
      name: 'Sold Out Meetup',
      capacity: 10,
      _count: { participants: 10 },
    },
  },
};

export const LongTitle: Story = {
  args: {
    event: {
      ...baseEvent,
      name: 'Annual International Frontend Development Conference and Workshop 2026',
    },
  },
};
