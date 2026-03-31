<template>
  <div class="chips">
    <button
      v-for="item in options"
      :key="item"
      :class="['chips__chip', { chip_active: modelValue.includes(item) }]"
      @click="toggle(item)"
    >
      {{ item }}
    </button>

    <div v-if="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string[];
  options: string[];
  error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

function toggle(item: string) {
  const copy = [...props.modelValue];
  const index = copy.indexOf(item);

  if (index > -1) copy.splice(index, 1);
  else copy.push(item);

  emit("update:modelValue", copy);
}
</script>

<style lang="scss" scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media screen and (max-width: 768px) {
    gap: 8px;
  }

  &__chip {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 16px;
    background: #eff0f6;
    color: #170f49;
    border: none;
    border-radius: 100px;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      padding: 8px 12px;
    }
  }

  .chip_active {
    background: #6f6c90;
    color: #ffffff;
  }
}

.error-text {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
  width: 100%;
}
</style>
