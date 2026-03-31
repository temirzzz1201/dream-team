<template>
  <div class="form-title">
    <h2 class="form-title__title">{{ props.title }}</h2>
    <p class="form-title__subtitle">{{ props.subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.form-title {
  text-align: center;

  &__title {
    font-size: 34px;
    line-height: 46px;
    color: #1f2937;
    margin-bottom: 8px;
    font-weight: 600;

    @media screen and (max-width: 768px) {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 4px;
    }
  }

  &__subtitle {
    font-size: 14px;
    line-height: 20px;
    color: #4b5563;

    @media screen and (max-width: 768px) {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
