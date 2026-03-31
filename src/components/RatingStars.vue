<template>
  <div class="stars">
    <span
      v-for="n in 5"
      :key="n"
      :class="['stars__star', { star_active: n <= modelValue }]"
      @click="$emit('update:modelValue', n)"
    >
      ★
    </span>

    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  error?: string;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.stars {
  &__star {
    cursor: pointer;
    color: #ccc;
    font-size: 32px;
    margin-right: 8px;
  }

  .star_active {
    color: #ffe01a;
  }
}

.error-text {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
}
</style>
