import type { Meta, StoryObj } from '@storybook/react';

import { OrderStatusUI } from '../components/ui/order-status';

const meta = {
  title: 'Example/OrderStatus',
  component: OrderStatusUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'fit-content', margin: 20 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OrderStatusUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultOrderStatus: Story = {
  args: {
    textStyle: '#E52B1A',
    text: 'Готовится'
  }
};
