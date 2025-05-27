<template>
  <div class="chat-container">
    <div class="header">
      <div class="img"></div>
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
        <el-icon style="cursor: pointer"><Fold /></el-icon>
      </div>
    </div>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Search, ShoppingCart, Fold } from "@element-plus/icons-vue";
const inputText = ref("");
onMounted(() => {});
</script>

<style lang="scss" scoped>
// 定义断点变量
$sm: 600px;
$md: 900px;

// 定义媒体查询混合器
@mixin respond-to($breakpoint) {
  @if $breakpoint == "sm" {
    @media (max-width: $sm) {
      @content;
    }
  } @else if $breakpoint == "md" {
    @media (min-width: $md) {
      @content;
    }
  }
}

.chat-container {
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
}
</style>