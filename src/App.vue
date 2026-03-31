<template>
  <div class="app">
    <feedback-form />
  </div>
</template>

<script setup lang="ts">
import FeedbackForm from "./components/FeedbackForm.vue";
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #d9dbe9;

  @media screen and (max-width: 768px) {
    padding: 20px 12px;
  }
}
</style>
