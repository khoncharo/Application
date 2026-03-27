import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EventForm from '../components/EventForm';

const mockTags = [
  { id: '1', name: 'tech' },
  { id: '2', name: 'art' },
  { id: '3', name: 'music' },
  { id: '4', name: 'business' },
  { id: '5', name: 'sports' },
];

const withMockedTags = (Story: React.ComponentType) => {
  const originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : (input as Request).url;
    if (url.includes('/tags')) {
      return new Response(JSON.stringify(mockTags), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return originalFetch(input, init);
  };
  return <Story />;
};

const meta: Meta<typeof EventForm> = {
  title: 'Components/EventForm',
  component: EventForm,
  tags: ['autodocs'],
  decorators: [
    withMockedTags,
    (Story) => (
      <div className="max-w-xl bg-white p-6 rounded-xl border border-border">
        <Story />
      </div>
    ),
  ],
  args: {
    onSubmit: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof EventForm>;

export const CreateMode: Story = {
  args: {
    submitLabel: 'Create Event',
  },
};

export const EditMode: Story = {
  args: {
    submitLabel: 'Save Changes',
    initialValues: {
      name: 'Design Sprint Workshop',
      description: 'A hands-on workshop using design sprint methodology.',
      dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Warsaw, Poland',
      type: 'PUBLIC',
      capacity: 20,
      tags: [
        { id: '1', name: 'tech' },
        { id: '2', name: 'art' },
      ],
    },
    participantCount: 8,
  },
};

export const EditWithFullCapacity: Story = {
  args: {
    submitLabel: 'Save Changes',
    initialValues: {
      name: 'Sold Out Event',
      description: 'This event is at full capacity.',
      dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      location: 'Kraków, Poland',
      type: 'PUBLIC',
      capacity: 10,
    },
    participantCount: 10,
  },
};

export const PrivateEvent: Story = {
  args: {
    submitLabel: 'Create Event',
    initialValues: {
      type: 'PRIVATE',
    },
  },
};