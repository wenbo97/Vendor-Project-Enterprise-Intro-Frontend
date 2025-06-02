<template>
  <div class="detail">
    <div v-if="!loading && detailInfo?.id">
      <swiper
        v-if="!loading"
        :effect="'flip'"
        :grabCursor="true"
        :navigation="true"
        :loop="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide>
          <img :src="getImageUrl(detailInfo)" />
        </swiper-slide>
        <swiper-slide>
          <img :src="getImageUrl(detailInfo)" />
        </swiper-slide>
      </swiper>
      <div class="description">
        <el-collapse
          @change="handleChange"
          :expand-icon-position="position"
          v-if="!loading"
        >
          <el-collapse-item
            v-for="(item, index) in collapseSets"
            :key="index"
            :title="item"
            :name="item"
          >
            <div>
              {{ detailInfo[item] }}
            </div>
          </el-collapse-item>
        </el-collapse>
        
      </div>
    </div>
    <el-skeleton v-if="loading" :rows="7" animated />
    <el-empty v-if="!loading && !detailInfo?.id" :image-size="200" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getBeverageQuery } from "@/api/business/index.js";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
const modules = [EffectFlip, Pagination, Navigation];
const position = ref("left");
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const detailInfo = ref({});
const collapseSets = ref([]);
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
const fetchData = async () => {
  try {
    const id = route.query.id;
    const itemName = route.query.name;
    loading.value = true;
    detailInfo.value = {};
    collapseSets.value = [];
    const params = {
      condition: {
        id: id,
        // item_id: id,
        item_name: itemName,
        // category: id,
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
    const info = res.values[0]
    detailInfo.value = info;
    collapseSets.value = Object.keys(info || {}) ;
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
};
const getImageUrl = (item) => {
  try {
    if (!item.category) {
      return item.imageId;
    }
    const realCategory = item.category.toUpperCase();
    const imageModules = import.meta.glob(
      `/src/assets//**/*.{png,jpg,jpeg,gif}`,
      { eager: true }
    );
    const imageMap = {};
    Object.entries(imageModules).forEach(([path, module]) => {
      const relativePath = path.replace("/src/assets/", "");
      imageMap[relativePath] = module.default;
    });
    return imageMap[`${realCategory}/${item.imageId}`];
  } catch (error) {
    console.error("图片加载失败:", error);
  }
};
// 深度监听对象prop
watch(
  () => route,
  () => {
    fetchData();
  },
  { deep: true, immediate: true }
);
onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.swiper {
  width: 400px;
  height: 400px;
  transform-style: preserve-3d;
  margin: auto;
  border-radius: 50%;
  @include respond-to("sm") {
    width: 300px;
    height: 300px;
  }
  @include respond-to("msm") {
    width: 200px;
    height: 200px;
  }
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  @include respond-to("sm") {
    width: 300px;
    height: 300px;
  }
  @include respond-to("msm") {
    width: 200px;
    height: 200px;
  }
}
:deep(.swiper-button-prev:after),
:deep(.swiper-button-next:after) {
  font-size: 30px;
  color: #000;
}
.swiper-slide img {
  display: block;
  width: 100%;
  border-radius: 50%;
}
.detail {
  .description {
    padding: 30px 24px 30px 24px;
  }
}
:deep(.el-collapse-item__header) {
  padding: 0 20px;
}
:deep(.el-collapse-item__content) {
  padding: 25px;
}
</style>