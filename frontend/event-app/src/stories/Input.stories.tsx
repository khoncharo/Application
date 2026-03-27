import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Event Title', placeholder: 'Give your event a name' },
};

export const WithValue: Story = {
  args: { label: 'Location', value: 'Warsaw, Poland', readOnly: true },
};

export const WithError: Story = {
  args: {
    label: 'Event Title',
    placeholder: 'Give your event a name',
    error: 'Title is required',
  },
};

export const WithoutLabel: Story = {
  args: { placeholder: 'Search by name or location…' },
};

export const Password: Story = {
  args: { label: 'Password', type: 'password', placeholder: '••••••••' },
};

export const Disabled: Story = {
  args: { label: 'Email', value: 'john@example.com', disabled: true },
};