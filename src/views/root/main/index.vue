<template>
  <div class="chat-container">
    
    <div class="bg"></div>
    <div class="categories">
      <div class="once">
        <img
          src="https://cdn.converty.shop/images/f5b295f1bf48b931b4b60407bd3b28ec2fc1e3cd84d9797f025d7786ff5bff13_lg.webp"
          alt=""
        />
      </div>
      <div class="second">
        <div class="second-block">
          <div class="image" style="margin: 0 0 20px 0">
            <img
              src="https://cdn.converty.shop/images/812598e101157665656fcf75efa0e771fcd3b96fdaa4a9f0e9957cde1f5fa9d5_lg.webp"
              alt=""
            />
          </div>
          <div class="image">
            <img
              src="https://cdn.converty.shop/images/d9897fd19756d860e41484c131d575d984203f9651563ea12000e27cdec7a915_lg.webp"
              alt=""
            />
          </div>
        </div>
        <div class="third">
          <img
            src="https://cdn.converty.shop/images/2f37f6082c1531fb8bf5e6748f0f6dc92ac9394536cf602e5c72eb4e2bf75575_lg.webp"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="tendeces-title">
      <span class="line"></span>
      <span style="margin:0 32px 0">tendeces</span>
      <span class="line"></span>
    </div>
    <ul class="list">
      <li class="list-block" v-for="(item, index) in listData" :key="index">
        <div class="list-banner">
          <img :src="item.imgUrl" alt="">
          <div class="list-action" @click="goDetail(item)">
            RAPIDE
          </div>
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
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const inputText = ref("");
const listData = ref([
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },
  {
    imgUrl: 'https://cdn.converty.shop/images/80abcdf2126e444e9c7fea415c0083fca6752c9231e9f9bae6aa060027c74820_lg.webp'
  },

])


const animationFn = () => {// 视口观察器配置
  const listItems = document.querySelectorAll('.list-block');
  const observerOptions = {
    threshold: 0.1, // 元素可见10%时触发
    rootMargin: '0px 0px -10% 0px' // 提前30%视口高度触发
  };
  
  // 初始化观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log(entry)
      if (entry.isIntersecting) {
        // 元素进入视口时添加动画类
        entry.target.classList.add('list-block-visible');
        // 只触发一次，避免重复动画
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 观察所有列表项
  listItems.forEach(item => {
    observer.observe(item);
  });
}
const goDetail = (item) =>{
  router.push(
    { path: '/detail', query: { id:'123213' } }
  )
}
onMounted(() => {
  animationFn()
});
</script>

<style lang="scss" scoped>


.chat-container {
  
  
  .bg {
    width: 100%;
    height: 500px;
    aspect-ratio: 16 / 5;
    background: #000;
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
      object-fit: cover;
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
        margin: 20px 0 0 ;
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
  .tendeces-title{
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
  .list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: auto;
    
    .list-block{
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
        .list-action{
          display: inline-block;
          padding: 10px;
          width: 160px;
          background:#fff;
          position: absolute;
          color: #000;
          top: 0;
          left:0;
          right: 0;
          z-index:1;
          margin:0 auto;
          border-radius: 20px;
          transition: all 0.5s;
          opacity: 0;
          &:hover{
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
  
}
</style>