import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DeleteModal from '../components/DeleteModal';

const meta: Meta<typeof DeleteModal> = {
  title: 'Components/DeleteModal',
  component: DeleteModal,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'white' },
    layout: 'fullscreen',
  },
  args: {
    onConfirm: fn(),
    onCancel: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};