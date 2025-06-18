<template>
  <div class="main">
    <div class="header">
      <div class="header-home" @click="goMain">
        <el-icon size="20px" class="img"><HomeFilled /></el-icon>
        <span>Home</span>
      </div>
      
      <el-input
        v-model="inputText"
        style="width: 30%"
        size="large"
        placeholder="Please Input"
        @keydown.enter="goList"
      >
        <template #append>
          <el-button @click="goList" :icon="Search" />
        </template>
      </el-input>
      <div class="action">
        <!-- <el-icon style="margin: 0 30px 0 0; cursor: pointer"
          ><ShoppingCart
        /></el-icon> -->
        <el-icon @click="drawer = true" style="cursor: pointer"
          ><Fold
        /></el-icon>
      </div>
      
    </div>
    <router-view />
    <div class="footer">
      <p>Contact us</p>
      <p @click="goto">whatsapp phone:+86 177 7421 8622</p>
    </div>
    <el-drawer v-model="drawer" title="Catégories">
      <ul class="categories-list">
        <li
          class="categories-list-block"
          v-for="(item, index) in categoriesListData"
          :key="index"
          @click="goCategories(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </el-drawer>
    <img @click="goto" class="whatsapp" src="@/assets/BANNER/whatsapp.webp" alt="">
  </div>
</template>

<script setup>
import { Search, ShoppingCart, Fold, HomeFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const inputText = ref("");
const drawer = ref(false);

const categoriesListData = ref([
  {
    label: "KILLA",
    value: "KILLA",
  },
  {
    label: "PABLO",
    value: "PABLO",
  },
  {
    label: "VELO EU",
    value: "VELO EU",
  },
  {
    label: "VELO EU v2",
    value: "VELO EU v2",
  },
  {
    label: "VELO US",
    value: "VELO US",
  },
  {
    label: "ZYN EU",
    value: "ZYN EU",
  },
  {
    label: "FOX",
    value: "FOX",
  },
]);
const goCategories = (item) => {
  router.push({ path: "/categories", query: { id: item.value } });
  drawer.value = false;
};
const goMain = () => {
  router.push({ path: "/" });
};
const goDetail = () => {
  router.push({
    path: "/detail",
    query: { name: decodeURIComponent(inputText.value) },
  });
  inputText.value = "";
};
const goList = () => {
  router.push({
    path: "/list",
    query: { name: decodeURIComponent(inputText.value) },
  });
  inputText.value = "";
};
const goto = () => {
  window.open("https://wa.me/8617774218622");
};
</script>

<style lang="scss" scoped>
.main {
  :deep(.el-drawer__body) {
    padding: 0;
  }
  :deep(.el-drawer__header) {
    margin: 0 0 5px 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80px;
    background: #ffc18e;
    padding: 0 20px;
    @media screen and (max-width: 768px) {
      min-height: 60px;
    }
    .img {
      cursor: pointer;
      margin: 0 10px 0 0;
    }
    .action {
      font-size: 20px;
    }
    .header-home{
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
  .categories-list {
    .categories-list-block {
      cursor: pointer;
      padding: 16px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
  .footer {
    padding: 50px;
    height: 300px;
    background: rgba(211, 211, 211, 1);
    p {
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
  .whatsapp {
    position: fixed;
    width: 56px;
    height: 56px;
    bottom: 30px;
    right: 30px;
  }
}
</style>