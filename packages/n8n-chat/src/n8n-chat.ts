import { createApp } from "vue";
import App, { type Props } from "./App.vue";
import "./assets/css/index.css";
import "@pagami/vuei/styles/vuei.base.css";

export function createChat(props: Props) {
  createApp(App, { ...props }).mount(props?.target || "#n8n-chat");
}
