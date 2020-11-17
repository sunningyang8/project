import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    name: "Home",
    path: "/home",
    component: ()=>import("../views/Home.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});



router.beforeEach((to, from, next) => {
  // 获取token
  const isAuthenticated = window.sessionStorage.getItem("token");
  // 如果将要去的地方 不是Login 且没有授权 要强制跳转到Login页面
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next(); // 否则放行
});





export default router;
