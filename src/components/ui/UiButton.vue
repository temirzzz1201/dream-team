<template>
  <button :class="['btn', `btn_${variant}`]" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});
</script>

<style scoped lang="scss">
.btn {
  width: 100%;
  min-width: 260px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    height: 44px;
    min-width: unset;
    font-size: 14px;
    line-height: 20px;
  }

  &_primary {
    background: #4a3aff;
    color: white;

    &:hover {
      background: #4338ca;
    }
  }

  &_secondary {
    background: #ffffff;
    color: #4a3aff;
    border: 1px solid #4a3aff;
  }
}
</style>
