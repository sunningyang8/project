import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 使用Ant-Design-Vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

let app = createApp(App);

app
  .use(router)
  .use(Antd)
  .mount("#app");
