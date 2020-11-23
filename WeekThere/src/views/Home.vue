<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="home-logo">
        <router-link to="/home">
          <img src="../assets/logo.png" alt="" />
          <span>后台管理系统</span>
        </router-link>
      </div>
      <a-menu
        mode="inline"
        :openKeys="openKeys"

        @openChange="onOpenChange"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-sub-menu v-for="item in homelist" :key="item.id">
          <template #title v-if="item.path == 'users'">
            <span
              ><user-outlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'rights'">
            <span
              ><PicLeftOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'goods'">
            <span
              ><DiffOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'orders'">
            <span
              ><AlignLeftOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'reports'">
            <span
              ><RadiusSettingOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <a-menu-item v-for="item in item.children" :key="item.id">
              <router-link to="/userlist">{{
            item.authName
          }}</router-link>
          </a-menu-item>
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
        <a-button type="primary" @click="houtui" class="houtui"> 后退 </a-button>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
     <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  PicLeftOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DiffOutlined,
  AlignLeftOutlined,
  RadiusSettingOutlined,
} from "@ant-design/icons-vue";
import { right } from "../api/index";
import { httpGet } from "../utils/http";
export default {
  components: {
    UserOutlined,
    PicLeftOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DiffOutlined,
    AlignLeftOutlined,
    RadiusSettingOutlined,
  },
  data() {
    return {
      collapsed: false,
      openKeys: [],
      homelist: [],
      rootSubmenuKeys: [],
    };
  },
  created() {
    this.getlist();
  },

  methods: {
      houtui(){
window.sessionStorage.removeItem("token")
this.$router.push("/login")
      },
    getlist() {
      let url = right.userright;
      httpGet(url)
        .then((response) => {
          // console.log(response);
          // 拿到response里面的data和 meta
          let { data, meta } = response;
          // 判断登录是否正确
          if (meta.status == 200) {
            this.homelist = data;
            this.homelist.forEach((item) => {
              this.rootSubmenuKeys.push(item.id);
            });
            // console.log(this.homelist)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
};
</script>
<style>
.home-logo {
  height: 32px;
  margin: 15px;
  /* background-color: yellow; */
}
.home-logo a {
  overflow: hidden;
  display: block;
  height: 100%;
}
.home-logo img {
  height: 100%;
}
.home-logo span {
  color: #fff;
  margin-left: 5px;
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
.houtui{
    float: right;
    margin: 16px;
}
</style>