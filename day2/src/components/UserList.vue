<template>
  <a-layout-content :style="{ padding: '0 50px' }">
    <a-breadcrumb :style="{ margin: '16px 0' }">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>List</a-breadcrumb-item>
      <a-breadcrumb-item>App</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-input-search placeholder="请输入内容" enter-button />
        </a-col>
        <a-col :span="4">
          <a-button type="primary"> 确定 </a-button>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
 
</template>

<script>
export default {};
</script>

<style>
</style>