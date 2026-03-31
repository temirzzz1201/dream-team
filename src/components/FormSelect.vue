<template>
  <div class="select" ref="root">
    <label v-if="label" class="select__label">{{ label }}</label>
    <div
      class="select__control"
      :class="[{ select__control_bordered: open }, { 'is-error': error }]"
      @click="toggle"
    >
      <span :class="{ 'is-placeholder': !selectedLabel }">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="select__arrow" :class="{ select__arrow_open: open }">></span>
    </div>

    <div v-if="open" class="select__dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        class="select__option"
        :class="{ active: option.value === modelValue }"
        @click="select(option)"
      >
        {{ option.label }}
      </div>
    </div>

    <span v-if="error" class="select__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

interface Option {
  label: string;
  value: string;
}

interface Props {
  modelValue: string;
  options: Option[];
  placeholder?: string;
  label?: string;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "Выберите",
  error: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  return (
    props.options.find((option) => option.value === props.modelValue)?.label ??
    ""
  );
});

function toggle(): void {
  open.value = !open.value;
}

function select(option: Option): void {
  emit("update:modelValue", option.value);
  open.value = false;
}

function handleClickOutside(event: MouseEvent): void {
  if (!root.value) return;
  if (!root.value.contains(event.target as Node)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
.select {
  text-align: start;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    max-width: unset;
  }

  &__label {
    font-size: 14px;
    line-height: 20px;
    color: #6f6c90;
    margin-bottom: 4px;
  }

  &__control {
    height: 56px;
    background: #f7f7fb;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-radius: 8px;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      height: 40px;
      max-width: unset;
      padding: 10px 16px;
    }

    &_bordered {
      border: 1px solid #4a3aff;
    }
  }

  &__arrow {
    font-size: 16px;
    line-height: 28px;
    color: #a0a3bd;
    transform: rotate(90deg);
    transition: transform 0.2s ease;

    &_open {
      transform: rotate(270deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    color: #170f49;
    border-radius: 8px;
    margin-top: 4px;
    z-index: 10;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  &__option {
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: #f3f4f6;
    }

    &.active {
      background: #e0e7ff;
    }
  }

  &__error {
    font-size: 12px;
    display: inline-block;
    color: #dc2626;
    margin-top: 4px;
  }
}

.is-placeholder {
  font-size: 16px;
  line-height: 26px;
  color: #a0a3bd;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
}

.select__control.is-error {
  border: 1px solid #dc2626;
}
</style>
