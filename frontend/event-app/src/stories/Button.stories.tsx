import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'ghost', 'danger'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Save Event' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete Event' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Join' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Create Event' },
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Save Event' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Event Full' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="primary" loading>Loading</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};