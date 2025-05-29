<template>
  <div class="list-container">
    <ul class="list">
      <li class="list-block" v-for="(item, index) in listData" :key="index">
        <div class="list-banner">
          <img :src="item.imgUrl" alt="" />
          <div class="list-action" @click="goDetail(item)">RAPIDE</div>
        </div>
        <div class="list-nection">
          <p>garant extreme</p>
          <p>50.00 DT</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { watch, toRefs, nextTick } from "vue";
const emit = defineEmits(["goDetail"]);
const props = defineProps({
  listData: {
    // 对象形式声明
    type: Array,
    default: [],
  },
});
const { listData } = toRefs(props);
const goDetail = (item) => {
  emit("goDetail", item);
};
const animationFn = () => {
  // 视口观察器配置
  const listItems = document.querySelectorAll(".list-block");
  const observerOptions = {
    threshold: 0.1, // 元素可见10%时触发
    rootMargin: "0px 0px -10% 0px", // 提前30%视口高度触发
  };

  // 初始化观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 元素进入视口时添加动画类
        entry.target.classList.add("list-block-visible");
        // 只触发一次，避免重复动画
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 观察所有列表项
  listItems.forEach((item) => {
    observer.observe(item);
  });
};
// 深度监听对象prop
watch(
  () => listData.value,
  (newVal) => {
    if (newVal.length > 0) {
      nextTick(() => {
        animationFn();
      });
    }
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.list-container {
  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    min-height: 500px;
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
              top: calc(50% - 10px);
              opacity: 1;
            }
          }
        }
        .list-action {
          display: inline-block;
          padding: 10px;
          width: 60%;
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
            top: calc(50% - 10px);
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
}
</style>