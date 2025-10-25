import type { Meta, StoryObj } from "@storybook/react";

import { ProfileMenuUI } from "../components/ui/profile-menu";

const meta = {
  title: "Example/ProfileMenu",
  component: ProfileMenuUI,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProfileMenuUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultProfileMenu: Story = {
  args: {
    pathname: "/profile",
    handleLogout: () => {},
  },
};
