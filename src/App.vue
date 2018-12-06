<template>
  <router-view></router-view>
</template>

<script>
export default {
}
</script>

<style lang="scss">
/*@import '~@/style/_common.scss';*/

.el-table th{
  text-align: center!important;
}
.el-table .cell, .el-table th div{
  text-align: center!important;
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #f2f3f5;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  height: 51px;
  padding: 20px 20px 20px 40px;
  background-color: #fa4852;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.sidebar {
  width: 200px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.content {
  flex: 1;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.el-menu {
  min-height: 100%;
}

.el-select {
	width: 150px;
}
</style>
