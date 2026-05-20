export interface SidebarMenuItem {
  label: string;
  slug: string;
  pattern?: string;
}

export interface SidebarMenuGroup {
  label: string;
  items: SidebarMenuItem[];
}
