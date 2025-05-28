<template>
  <div class="main">
    <div class="header">
      <div class="img"></div>
      <el-input
        v-model="inputText"
        style="width: 30%"
        size="large"
        placeholder="Please Input"
        :suffix-icon="Search"
      />
      <div class="action">
        <el-icon style="margin: 0 30px 0 0; cursor: pointer"
          ><ShoppingCart
        /></el-icon>
        <el-icon @click="drawer = true" style="cursor: pointer"><Fold /></el-icon>
      </div>
    </div>
   <router-view />
   <div class="footer">

    </div>
   <el-drawer v-model="drawer" title="Catégories">
      <ul class="categories-list">
        <li class="categories-list-block" v-for="(item,index) in categoriesListData" :key="index">
          {{item.label}}
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script setup>
import { Search, ShoppingCart, Fold } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
const drawer = ref(false)
const categoriesListData = ref([
  {
    label:"第一分类",
    value:"one"
  },
  {
    label:"第二分类",
    value:"two"
  },
  {
    label:"第三分类",
    value:"three"
  },
  {
    label:"第四分类",
    value:"four"
  },
  {
    label:"第五分类",
    value:"five"
  }
])
</script>

<style lang="scss" scoped>
.main{
  :deep(.el-drawer__body) {
    padding: 0
  }
  :deep(.el-drawer__header) {
    margin: 0 0 10px 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80px;
    background: #fff;
    padding: 0 20px;
    @media screen and (max-width: 768px) {
      min-height: 60px;
    }
    .img {
      width: 60px;
      height: 60px;
      background: #000;
    }
    .action {
      font-size: 20px;
    }
  }
  .categories-list{
    .categories-list-block {
      cursor: pointer;
      padding: 16px;
      &:hover{
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
  .footer{
    height: 300px;
    background: #777777;
  }
}
</style>