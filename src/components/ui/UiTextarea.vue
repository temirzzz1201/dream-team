<template>
  <div class="input-wrapper">
    <label v-if="label" class="input__label">{{ label }}</label>
    <div class="input__container" :class="{ 'is-error': error }">
      <textarea
        class="textarea"
        :value="modelValue"
        :placeholder="placeholder"
        @input="onInput"
        v-bind="$attrs"
      />
    </div>
    <div v-if="error || hint" class="input__hint">
      <span v-if="error" class="input__error">{{ error }}</span>
      <span v-else>{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string, event: Event): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
  emit("change", target.value, event);
}
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  text-align: start;
}

.input__label {
  font-size: 14px;
  line-height: 20px;
  color: #6f6c90;
  margin-bottom: 4px;
}

.input__container {
  position: relative;
}

.textarea {
  width: 100%;
  min-height: 120px;
  border-radius: 8px;
  border: none;
  background: #f7f7fb;
  padding: 14px 16px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }

  &::placeholder {
    font-size: 16px;
    line-height: 26px;
    color: #a0a3bd;
  }
}

.input__hint {
  font-size: 12px;
}

.input__error {
  display: inline-block;
  margin-top: 4px;
  color: #dc2626;
  font-size: 12px;
}

.is-error .textarea {
  border: 1px solid #dc2626;
}
</style>
