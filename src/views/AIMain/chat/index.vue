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
        <el-icon style="margin: 0 30px 0 0"><ShoppingCart /></el-icon>
        <el-icon><Fold /></el-icon>
      </div>
    </div>
    <div class="bg"></div>
    <div class="categories">
      <div class="once">

      </div>
      <div class="second">

      </div>
      <div class="third">

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Search, ShoppingCart, Fold } from '@element-plus/icons-vue';
const inputText = ref('');
onMounted(() => {
})

</script>

<style lang="scss" scoped>
.chat-container{
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 80px;
    background: #fff;
    padding: 0 20px;
    @media screen and (max-width: 768px) {
      min-height: 60px;
    }
    .img{
      width: 60px;
      height: 60px;
      background: #000;
    }
    .action{
      font-size: 20px;
    }
  }
  .bg {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 5;
    background: #000;
  }
  .categories{
    display: flex;
    flex-flow: wrap;
  }
}
</style>