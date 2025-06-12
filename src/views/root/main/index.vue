<template>
  <div class="chat-container">
    <div class="bg">
      <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :spaceBetween="10"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        :loop="true"
        class="mySwiper2"
      >
        <swiper-slide>
          <img :src="bannerOne" />
        </swiper-slide>
        <swiper-slide>
          <img :src="bannerTwo" />
        </swiper-slide>
        <swiper-slide>
          <img :src="bannerThree" />
        </swiper-slide>
      </swiper>
      <swiper
        @swiper="setThumbsSwiper"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :modules="modules"
        :loop="true"
        class="mySwiper"
      >
        <swiper-slide>
          <img :src="bannerOne" />
        </swiper-slide>
        <swiper-slide>
          <img :src="bannerTwo" />
        </swiper-slide>
        <swiper-slide>
          <img :src="bannerThree" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="categories">
      <div class="once" @click="geCategories('PABLO')">
        <img src="@/assets/preImg/one.webp" alt="" />
      </div>
      <div class="second">
        <div class="second-block">
          <div
            @click="geCategories('KILLA')"
            class="image"
            style="margin: 0 0 20px 0"
          >
            <img src="@/assets/preImg/two.webp" alt="" />
          </div>
          <div @click="geCategories('VELO_EU')" class="image">
            <img src="@/assets/preImg/three.webp" alt="" />
          </div>
        </div>
        <div class="third" @click="geCategories('ZYN_EU')">
          <img src="@/assets/preImg/four.webp" alt="" />
        </div>
      </div>
    </div>
    <div class="tendeces-title">
      <span class="line"></span>
      <span style="margin: 0 32px 0">Nicotine Pouches</span>
      <span class="line"></span>
    </div>

    <commonList
      v-loading="loading"
      element-loading-svg-view-box="-10, -10, 50, 50"
      :element-loading-svg="svg"
      :listData="listData"
      @goDetail="goDetail"
    />
    <div v-if="more" class="load-more-button"  @click="more = false">
      <span>More</span>
      <div class="arrow-container">
        <svg
          class="arrow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import commonList from "@components/commonList/index.vue";
import { getBeverageQuery } from "@/api/business/index.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import bannerOne from "@/assets/BANNER/background_pablo.png";
import bannerTwo from "@/assets/BANNER/background_pablo.png";
import bannerThree from "@/assets/BANNER/background_pablo.png";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
const router = useRouter();
const loading = ref(false);
const more = ref(true)
const thumbsSwiper = ref(null);
const modules = [FreeMode, Navigation, Thumbs];
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
const listData = ref([
  {
    documentUrl: "KILLA",
    imgUrl: "killa_item1",
  },
  {
    documentUrl: "KILLA",
    imgUrl: "killa_item2",
  },
  {
    documentUrl: "KILLA",
    imgUrl: "killa_item3",
  },
  {
    documentUrl: "KILLA",
    imgUrl: "killa_item4",
  },
  {
    documentUrl: "PABLO",
    imgUrl: "pablo_item1",
  },
  {
    documentUrl: "PABLO",
    imgUrl: "pablo_item2",
  },
  {
    documentUrl: "PABLO",
    imgUrl: "pablo_item3",
  },
  {
    documentUrl: "PABLO",
    imgUrl: "pablo_item4",
  },
  {
    documentUrl: "VELO_EU",
    imgUrl: "velo_eu_item1",
  },
  {
    documentUrl: "VELO_EU",
    imgUrl: "velo_eu_item2",
  },
  {
    documentUrl: "VELO_EU",
    imgUrl: "velo_eu_item3",
  },
  {
    documentUrl: "VELO_EU",
    imgUrl: "velo_eu_item4",
  },
]);
const bannerList = ref([
  {
    imgUrl: "background_pablo",
  },
  {
    imgUrl: "background_velo_eu",
  },
  {
    imgUrl: "background_zyn",
  },
]);
const goDetail = (item) => {
  router.push({ path: "/detail", query: { id: item.id } });
};
const geCategories = (item) => {
  router.push({ path: "/categories", query: { id: item } });
};
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
const getImageUrl = (name, type = "banner") => {
  try {
    const imageModules = import.meta.glob(
      `/src/assets//**/*.{png,jpg,jpeg,gif}`,
      { eager: true }
    );
    const imageMap = {};
    Object.entries(imageModules).forEach(([path, module]) => {
      const relativePath = path.replace("/src/assets/", "");
      imageMap[relativePath] = module.default;
    });
    return imageMap[`${type.toUpperCase()}/${name}.png`];
  } catch (error) {
    console.error("图片加载失败:", error);
  }
};
const fetchData = async () => {
  const params = {
    condition: {
      // id: "683bf5ac267e5e62a273c1e8",
      // item_id: "1",
      // item_name: "Polar Mint",
      // category: "killa",
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
    limit: 12,
  };
  const res = await getBeverageQuery(params);
  listData.value = res.values;
};
onMounted(() => {
  fetchData();
});
</script>

<style lang="scss" scoped>
.chat-container {
  .bg {
    width: 100%;
    height: 600px;
    aspect-ratio: 16 / 5;
    background: #000;
    .swiper {
      width: 100%;
      height: 300px;
      margin-left: auto;
      margin-right: auto;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #444;

      /* Center slide text vertically */
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
      }
    }
    .mySwiper2 {
      height: 80%;
      width: 100%;
    }

    .mySwiper {
      height: 20%;
      box-sizing: border-box;
      padding: 10px 0;
    }

    .mySwiper .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }

    .mySwiper .swiper-slide-thumb-active {
      opacity: 1;
    }
  }
  .categories {
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap;
    max-width: 1480px;
    -webkit-box-pack: center;
    justify-content: center;
    margin: 1.25rem auto;
    img {
      display: block;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      height: 100%;
      transition: transform 1s;
      transform: scale(1);
      &:hover {
        transform: scale(1.1);
      }
    }
    .once {
      background-color: rgb(255, 255, 255);
      color: rgba(0, 0, 0, 0.87);
      box-shadow: none;
      width: 45%;
      height: 630px;
      position: relative;
      cursor: pointer;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      border-radius: 0px;

      @include respond-to("sm") {
        flex: 0 0 90%;
        max-width: 90%;
      }
      @include respond-to("md") {
        flex: 0 0 45%;
        max-width: 45%;
      }
    }
    .second {
      box-sizing: border-box;
      display: flex;
      width: 45%;
      margin: 0;
      overflow: hidden;
      @include respond-to("sm") {
        flex: 0 0 90%;
        max-width: 90%;
        margin: 20px 0 0;
      }
      @include respond-to("md") {
        flex: 0 0 45%;
        max-width: 45%;
      }
      .image {
        background-color: rgb(255, 255, 255);
        color: rgba(0, 0, 0, 0.87);
        box-shadow: none;
        width: 100%;
        height: 305px;
        position: relative;
        cursor: pointer;
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        border-radius: 0px;
      }
      .second-block {
        box-sizing: border-box;
        margin: 0 20px 0 20px;
        overflow: hidden;
        @include respond-to("sm") {
          margin: 0 20px 0 0;
        }
      }
      .third {
        height: 630px;
        overflow: hidden;
      }
    }
  }
  .action {
  }
  .tendeces-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Cairo, Roboto, sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.334;
    color: rgba(0, 0, 0, 0.87);
    .line {
      display: inline-block;
      width: 5rem;
      height: 1px;
      background-color: rgb(156 163 175);
    }
  }
  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;

    .list-block {
      position: relative;
      transition: all 2s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(50px);
      opacity: 0;
      visibility: hidden;
      min-height: 270px;
      width: 25%;

      @include respond-to("sm") {
        width: 33.333%;
      }
      @include respond-to("msm") {
        width: 50%;
      }
      .list-banner {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        img {
          display: block;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          width: 100%;
          object-fit: cover;
          transition: transform 2s;
          transform: scale(1);
          cursor: pointer;
          max-width: 100%;
          height: auto;
          &:hover {
            transform: scale(1.05);
            + .list-action {
              top: 115px;
              opacity: 1;
            }
          }
        }
        .list-action {
          display: inline-block;
          padding: 10px;
          width: 160px;
          background: #fff;
          position: absolute;
          color: #000;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          margin: 0 auto;
          border-radius: 20px;
          transition: all 0.5s;
          opacity: 0;
          &:hover {
            top: 115px;
            opacity: 1;
          }
        }
      }
    }
    .list-block-visible {
      /* 激活状态：恢复原位并显示 */
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
  .load-more-button {
    background: none;
    border: none;
    color: #3b82f6;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    padding: 10px;
    transition: color 0.3s ease;
    margin: 16px auto;
    position: relative;
  }

  .load-more-button:hover:not(:disabled) {
    color: #2563eb;
  }

  .load-more-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .arrow-container {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .load-more-button:hover:not(:disabled) .arrow-container {
    animation: bounce 1s infinite;
  }

  .load-more-button:disabled .arrow-container {
    animation: spin 1.5s linear infinite;
  }

  .arrow {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(5px);
    }
    60% {
      transform: translateY(3px);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>