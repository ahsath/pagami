export interface SidebarMenuItem {
  label: string;
  slug: string;
}

export interface SidebarMenuGroup {
  label: string;
  items: SidebarMenuItem[];
}
