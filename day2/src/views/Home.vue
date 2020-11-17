<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="home-logo">
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="" /><span>后台管理系统</span>
        </router-link>
      </div>
      <a-menu
        mode="inline"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-sub-menu key="sub1">
          <template #title>
            <div>
              <user-outlined />
              <span :style="{ hh: collapsed == true }">subnav</span>
            </div>
          </template>
          <a-menu-item key="1">
            <span
              ><router-link to="/userlist">用户列表</router-link>
            </span></a-menu-item
          >
          <a-menu-item key="2">
            <span
              ><router-link to="/user">用表</router-link>
            </span></a-menu-item
          >
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <div>
              <laptop-outlined />
              <span :style="{ hh: collapsed == true }">subnav2</span>
            </div>
          </template>
          <a-menu-item key="5">option5</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
            <div>
              <notification-outlined />
              <span :style="{ hh: collapsed == true }">subnav3</span>
            </div>
          </template>
          <a-menu-item key="9">option9</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button @click="handleLogOut" style="float: right; margin: 16px 24px"
          >退出</a-button
        >
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
       <a-layout-footer :style="{ textAlign: 'center' }">
    Ant Design ©2020 Created by Ant UED
  </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  data() {
    return {
      selectedKeys: ["1"],
      collapsed: false,
      openKeys: ["sub1"],
    };
  },
  methods: {
    // 退出
    handleLogOut() {
      // 删除token
      window.sessionStorage.removeItem("token");
      // 跳转页面到Login
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.home {
  height: 100%;
}

.home-logo {
  height: 32px;
  margin: 16px;
  overflow: hidden;
}

.home-logo a {
  display: block;
  width: 100%;
  height: 100%;
}

.home-logo img {
  height: 100%;
}

.home-logo span {
  color: #fff;
  margin-left: 15px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.hh {
  display: none;
}
.ant-layout {
  height: 100%;
}
</style>