<template>
  <div class="main">
    <div class="header">
      <div class="img" @click="goMain"></div>
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
        <li class="categories-list-block" v-for="(item,index) in categoriesListData" :key="index" @click="goCategories(item)">
          {{item.label}}
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script setup>
import { Search, ShoppingCart, Fold } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const inputText = ref('')
const drawer = ref(false)
const categoriesListData = ref([
  {
    label:"KILLA",
    value:"KILLA"
  },
  {
    label:"PABLO",
    value:"PABLO"
  },
  {
    label:"VELO_EU",
    value:"VELO_EU"
  },
  {
    label:"VELO_EU_v2",
    value:"VELO_EU_v2"
  },
  {
    label:"VELO_US",
    value:"VELO_US"
  },
  {
    label:"ZYN_EU",
    value:"ZYN_EU"
  }
])
const goCategories = (item) => {
  router.push(
    { path: '/categories', query: { id: item.value } }
  )
  drawer.value = false
}
const goMain = () => {
  router.push(
    { path: '/' }
  )
}
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