<template>
  <a-layout>
    <a-layout-header></a-layout-header>
    <a-layout-content>
      <!-- 登录框start -->
      <a-row>
        <a-col :span="6" :offset="9">
          <!-- 表单logo -->
          <a-form :rules="rules" :model="form" ref="loginForm">
            <a-row class="login-title">
              <a-col :span="24">
                <!-- 登录标题 start -->
                <h2><img src="../assets/logo.png" alt="" /> Manage System</h2>
                <span>Ant Design 是西湖区最具影响力的 Web 设计规范</span>
              </a-col>
            </a-row>

            <a-row class="login-form">
              <a-col :span="24">
                <a-tabs :tabBarStyle="{ textAlign: 'center' }">
                  <a-tab-pane key="1" tab="账号密码登录">
                    <a-form-item :wrapperCol="{ span: 24 }" name="username">
                      <a-input
                        size="large"
                        placeholder="请输入账号"
                        v-model:value="form.username"
                      >
                        <template #prefix
                          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>

                    <a-form-item :wrapperCol="{ span: 24 }" name="password">
                      <a-input-password
                        size="large"
                        placeholder="请输入密码"
                        v-model:value="form.password"
                      >
                        <template #prefix
                          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input-password>
                    </a-form-item>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="手机号登陆" force-render>
                    <a-form-item :wrapperCol="{ span: 24 }">
                      <a-input size="large" placeholder="请输入手机号">
                        <template #prefix
                          ><TabletOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                    <a-row :gutter="16">
                      <a-col :span="16" class="gutter-row">
                        <a-form-item :wrapperCol="{ span: 24 }">
                          <a-input size="large" placeholder="请输入验证码">
                            <template #prefix
                              ><FundOutlined style="color: rgba(0, 0, 0, 0.25)"
                            /></template>
                          </a-input>
                        </a-form-item>
                      </a-col>
                      <a-col :span="8" class="gutter-row">
                        <a-button type="primary"> 获取验证码 </a-button>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                </a-tabs>
              </a-col>
            </a-row>

            <!-- 忘记密码 -->
            <a-row class="login-forget">
              <a-col :span="24">
                <a-checkbox> 自动登陆 </a-checkbox>
                <router-link to="#" style="float: right">忘记密码</router-link>
              </a-col>
            </a-row>
            <a-row class="login-forget queding">
              <a-col :span="24">
                <a-button
                  block
                  size="lagrge"
                  type="primary"
                  @click="handleSubmit"
                  >确定</a-button
                >
              </a-col>
            </a-row>

            <a-row class="login-forget">
              <a-col :span="24">
                <span>其他登录方式 </span>
                <WechatOutlined
                  style="color: rgba(0, 0, 0, 0.25) margin-left= '10px'"
                  class="item-icon"
                />
                <WeiboCircleOutlined
                  style="color: rgba(0, 0, 0, 0.25) margin-left= '10px'"
                  class="item-icon"
                />
                <QqOutlined
                  style="color: rgba(0, 0, 0, 0.25) margin-left= '10px'"
                  class="item-icon"
                />
                <router-link to="#" style="float: right">注册账户</router-link>
              </a-col>
            </a-row>
          </a-form>
          <!-- 表单logo -->
        </a-col>
      </a-row>
      <!-- 登录框end -->
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script>
import {
  UserOutlined,
  LockOutlined,
  TabletOutlined,
  FundOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
  QqOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
      rules: {
        // 给那个字段添加什么规则
        username: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4-16个字符之间", trigger: "blur" },
        ],
        password: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6-16个字符之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          let params = {
            username: this.form.username,
            password: this.form.password,
          };
          this.$axios
            .post("/login", params)
            .then(response => {
             let { data, meta } = response.data;
              if (meta.status == 400) {
                return message.error(meta.msg);
              }
              if (meta.status == 200) {
                message.success(meta.msg);
                window.sessionStorage.setItem("token", data.token);
                //  路由跳转到首页
                this.$router.push("/home");
              }
            //  console.log(response);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  }, 
  components: {
    UserOutlined,
    LockOutlined,
    TabletOutlined,
    FundOutlined,
    WechatOutlined,
    WeiboCircleOutlined,
    QqOutlined,
  },
};
</script>

<style scoped>
.ant-layout {
  height: 100%;
  background-image: url(../assets/image/bg.svg);
}
.ant-layout-header {
  background-color: transparent;
}
.ant-form {
  width: 365px;
  margin: 0 auto;
}

.login-title {
  text-align: center;
}

.login-title h2 {
  position: relative;
  top: 2px;
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
}

.login-title img {
  height: 44px;
}

.login-title span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
}
.queding {
  margin: 20px 0;
}
.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  position: relative;
  top: 4px;
  margin: 0 5px;
}

.item-icon:hover {
  color: #1890ff;
}
</style>
