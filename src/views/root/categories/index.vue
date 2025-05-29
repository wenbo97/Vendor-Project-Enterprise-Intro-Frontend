<template>
  <div class="chat-container">
    <commonList
      v-loading="loading"
      element-loading-svg-view-box="-10, -10, 50, 50"
      :element-loading-svg="svg"
      :listData="listData"
      @goDetail="goDetail"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import commonList from "@components/commonList/index.vue";
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;
const listData = ref([]);

const fetchData = () => {
  loading.value = true;
  listData.value = []
  setTimeout(() => {
    listData.value = [
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
      {
        imgUrl:
          "https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp",
      },
    ];
    // nextTick(() => {
    //   animationFn()
    // })
    loading.value = false;
  }, 1000);
};
const goDetail = (item) => {
  router.push({ path: "/detail", query: { id: "123213" } });
};
watch(
  () => route.params,
  (newParams, oldParams) => {
    fetchData();
  },
  { deep: true }
);
onMounted(() => {
  console.log(12313);
  fetchData();
});
</script>

<style lang="scss" scoped>
.chat-container {
}
</style>