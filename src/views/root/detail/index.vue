<template>
  <div class="detail">
    <div class="detail-box" v-if="!loading && detailInfo?.id">
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
        <p>{{ detailInfo.description }}</p>
        <ul>
          <li>
            <span>mg_weight_per_box</span>
            <span>{{ detailInfo.mgWeightPerBox }}</span>
          </li>
          <li>
            <span>inner_bag_type</span>
            <span>{{ detailInfo.innerBagType }}</span>
          </li>
        </ul>
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
    const info = res.values[0];
    detailInfo.value = info;
    console.log(detailInfo.value, "detailInfo.value");
    collapseSets.value = Object.keys(info || {});
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
// onMounted(() => {
//   fetchData();
// });
</script>

<style lang="scss" scoped>
.detail {
  .detail-box {
    display: flex;
    justify-content: space-between;
    padding: 60px;
    @include respond-to("sm") {
      display: block;
    }
    @include respond-to("msm") {
      display: block;
    }
  }
}
.swiper {
  width: 600px;
  height: 600px;
  transform-style: preserve-3d;
  border-radius: 50%;
  @include respond-to("sm") {
    width: 300px;
    height: 300px;
    margin: auto;
  }
  @include respond-to("msm") {
    width: 200px;
    height: 200px;
    margin: auto;
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
    width: 60%;
    @include respond-to("sm") {
      width: 100%;
      padding: 0;
    }
    @include respond-to("msm") {
      width: 100%;
      padding: 0;
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #333;
        padding: 15px 0;
        border-bottom: 1px solid rgba(51, 51, 51, 0.25);
        @include respond-to("sm") {
          display: block;
        }
        @include respond-to("msm") {
          display: block;
        }
        span {
          @include respond-to("sm") {
            display: block;
          }
          @include respond-to("msm") {
            display: block;
          }
        }
      }
    }
  }
}
:deep(.el-collapse-item__header) {
  padding: 0 20px;
}
:deep(.el-collapse-item__content) {
  padding: 25px;
}
</style>