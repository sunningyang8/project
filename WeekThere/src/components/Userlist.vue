<template>
  <a-layout style="padding: 0 24px 24px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>List</a-breadcrumb-item>
      <a-breadcrumb-item>App</a-breadcrumb-item>
    </a-breadcrumb>
    <div></div>
    <a-layout-content
      :style="{
        background: '#fff',
        padding: '24px',
        margin: 0,
        minHeight: '280px',
      }"
    >
      <!-- 搜索框 -->
      <a-form>
        <a-row :gutter="12">
          <a-col :span="8">
            <a-input-search placeholder="请输入内容" />
          </a-col>
          <!-- 搜索框 -->
          <!-- 添加用户 -->
          <a-col :span="4">
            <a-button type="primary" @click="showModal"> 添加用户 </a-button>
            <a-modal
              cancelText="取消"
              okText="确定"
              title="添加用户"
              v-model:visible="visible"
              :confirm-loading="confirmLoading"
            >
              <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
                <a-form-item label="姓名" name="username" required>
                  <a-input />
                </a-form-item>
                <a-form-item label="密码" name="password" required>
                  <a-input-password />
                </a-form-item>
                <a-form-item label="邮箱" name="email" required>
                  <a-input />
                </a-form-item>
              </a-form>
            </a-modal>
          </a-col>
          <!-- 添加用户 -->
        </a-row>
      </a-form>
      <!-- 表格 -->
      <a-table
        :columns="columns"
        :data-source="totaldata"
        :row-key="(record) => record.id"
        :pagination="false"
      >
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
        <!-- 状态 -->
        <template #mg_state="{ text }">
          <a-switch v-model:checked="text.mg_state" />
        </template>
        <!-- 状态 -->
        <!-- 权限 -->
        <template #op>
          <a-button><BorderOuterOutlined /></a-button>
          <a-button class="er"><LogoutOutlined /></a-button>
          <a-button class="san"><PicCenterOutlined /></a-button>
        </template>
        <!-- 权限 -->
      </a-table>
      <a-pagination
        style="margin-top: 25px"
        :total="total"
        :showTotal="(total) => `共${total}条`"
        v-model:current="current"
        :pageSizeOptions="pageSizeOptions"
        :defaultPageSize="2"
        show-size-changer
        show-quick-jumper
        @showSizeChange="handlesize"
        @change="handle"
      />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { user } from "../api/index";
import { httpGet } from "../utils/http";
import {
  BorderOuterOutlined,
  LogoutOutlined,
  PicCenterOutlined,
} from "@ant-design/icons-vue";
export default {
  data() {
    return {
      columns: [
        {
          title: "#",
          dataIndex: "index",
        },
        {
          title: "姓名",
          dataIndex: "username",
        },
        {
          title: "手机号",
          dataIndex: "mobile",
        },
        {
          title: "邮箱",
          dataIndex: "email",
        },
        {
          title: "状态",
          key: "action",
          slots: { customRender: "mg_state" },
        },
        {
          title: "权限",
          key: "action",
          slots: { customRender: "op" },
        },
      ],
      //   当前页面
      current: 1,
      //   数据总数
      total: 5,
      //   拿到user
      totaldata: [],
      //   默认分页
      pageSizeOptions: ["1", "2", "5", "6"],
      visible: false,
      confirmLoading: false,
    };
  },
  created() {
    this.gelist();
  },
  components: {
    BorderOuterOutlined,
    LogoutOutlined,
    PicCenterOutlined,
  },
  methods: {
    gelist(pagenum = 1, pagesize = 2) {
      let url = user.usershuju;
      httpGet(url, {
        pagenum: pagenum,
        pagesize: pagesize,
      })
        .then((response) => {
          console.log(response);
          let { data, meta } = response;
          if (meta.status == 200) {
            (this.current = data.pagenum),
              (this.total = data.total),
              (this.totaldata = data.users);
            this.totaldata.forEach((ele, index) => {
              ele.index = index + 1;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handlesize(current, size) {
      this.gelist(current, size);
    },
    handle(page, pageSize) {
      console.log(page, pageSize);
      this.gelist(page, pageSize);
    },
    showModal() {
      this.visible = true;
    },
  },
};
</script>

<style>
.er {
  margin-left: 15px;
}
.san {
  margin-left: 15px;
}
</style>