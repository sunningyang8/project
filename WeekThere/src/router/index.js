import { createRouter, createWebHashHistory } from "vue-router";

// 导入登录页面组件
import Login from "@/views/Login";

// 声明路由规则
const routes = [
  // 如果地址为根路径，直接跳转到登录页面
  { path: "/", redirect: "/login" },
  // 登录页面
  { name: "Login", path: "/login", component: Login },
  // 首页
  {
    name: "Home",
    path: "/home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/home", redirect: "/word"
      },
      {
        path: "/word",
        component: () => import("../components/Word"),
      },
      {
        path: "/userlist",
        component: () => import("../components/Userlist"),
      },
    ]
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  let isAuthenticated = window.sessionStorage.getItem("token")
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})




export default router;
