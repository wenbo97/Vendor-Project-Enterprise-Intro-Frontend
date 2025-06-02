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
import { getBeverageQuery } from "@/api/business/index.js";
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

const fetchData = async () => {
  try {
    const id = route.query.id.toLowerCase()
    loading.value = true;
    listData.value = []
    const params = {
      condition: {
        // id: "683bf5ac267e5e62a273c1e8",
        // item_id: "1",
        // item_name: "Polar Mint",
        category: id,
        // item_name_fuzzy: "mint",
        // mg_weight_per_box_fuzzy: "12.8mg",
        // wet_method_fuzzy: "45",
        // inner_bag_type_fuzzy: "V-notch",
        // box_type_fuzzy: "tri-fold",
        // carton_box_fuzzy: "240X3",
        // quantity_pcs_fuzzy: "720",
        // category_fuzzy: "kil",
      },
      skip: 0,
      limit: 1000,
    };
    const res = await getBeverageQuery(params);
    listData.value = res.values
  } catch (error) {
    console.error(error)
  }
  loading.value = false;
};
const goDetail = (item) => {
  router.push({ path: "/detail", query: { id: item.id } });
};
watch(
  () => route.params,
  (newParams, oldParams) => {
    fetchData();
  },
  { deep: true }
);
onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.chat-container {
}
</style>