import { createApp } from "vue";
import N8nChat, { type Props } from "./components/N8nChat.vue";
import "./assets/css/tailwind.css";

export { N8nChat };

export function createChat(props: Props) {
  createApp(N8nChat, { ...props }).mount(props?.target || "#n8n-chat");
}
