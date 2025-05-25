<!-- src/components/CodeHighlight.vue -->
<template>
  <div class="codehighlight" v-highlight="language">
    <pre>
      <code >{{ code }}</code>
    </pre>
  </div>
</template>

<script setup>
const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  }
});
</script>
<style lang="scss" scoped>
.codehighlight{
  background-color: #0d1117 !important; /* 深紫色背景 */
  padding: 12px 16px 16px
}
</style>