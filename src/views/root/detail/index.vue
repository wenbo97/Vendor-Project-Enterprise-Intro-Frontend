<template>
  <div class="detail">
    <swiper
      :effect="'flip'"
      :grabCursor="true"
      :navigation="true"
      :loop="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
      ><swiper-slide
        ><img src="https://swiperjs.com/demos/images/nature-6.jpg"
      /></swiper-slide>
    </swiper>
    <div class="description">
      <el-collapse 
        v-model="collapse" 
        @change="handleChange"
        :expand-icon-position="position"
    >
        <el-collapse-item title="force" name="1">
          <div>
            Consistent with real life: in line with the process and logic of
            real life, and comply with languages and habits that the users are
            used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such
            as: design style, icons and texts, position of elements, etc.
          </div>
        </el-collapse-item>
        <el-collapse-item title="saveur" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            elements of the page.
          </div>
        </el-collapse-item>
        <el-collapse-item title="nicotine(mg/sachet)" name="3">
          <div>
            Simplify the process: keep operating process simple and intuitive;
          </div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the
            users can quickly understand and make decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which
            helps the users to identify and frees them from memorizing and
            recalling.
          </div>
        </el-collapse-item>
        <el-collapse-item title="format" name="4">
          <div>
            Decision making: giving advices about operations is acceptable, but
            do not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
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
const position = ref('left')
const collapse = ref('')
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 500px;
  height: 500px;
  padding: 50px;
  transform-style: preserve-3d;
  margin: auto;
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
  width: 500px;
  height: 500px;
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
}
.detail {
    .description {
        padding: 30px 24px 30px 24px;
    }
}
</style>