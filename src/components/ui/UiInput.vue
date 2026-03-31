<template>
  <div class="input-wrapper">
    <label v-if="label" class="input__label">{{ label }}</label>

    <div class="input__container" :class="{ 'is-error': error }">
      <input
        class="input"
        :type="type"
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
  type?: string;
  error?: string;
  hint?: string;
  phone?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  phone: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string, event: Event): void;
}>();

function getDigits(val: string) {
  return val.replace(/\D/g, "");
}

function formatPhone(digits: string) {
  if (!digits.length) return "";

  let result = "+7";

  if (digits.length > 1) result += ` (${digits.slice(1, 4)})`;
  if (digits.length >= 4) result += ` ${digits.slice(4, 7)}`;
  if (digits.length >= 7) result += `-${digits.slice(7, 9)}`;
  if (digits.length >= 9) result += `-${digits.slice(9, 11)}`;

  return result;
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  if (props.phone) {
    let digits = getDigits(value);

    digits = digits.slice(0, 11);

    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    if (!digits.startsWith("7")) digits = "7" + digits;

    value = formatPhone(digits);

    target.value = value;
  }

  emit("update:modelValue", value);
  emit("change", value, event);
}
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
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

.input {
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border: none;
  background: #f7f7fb;
  padding: 14px 16px;

  @media screen and (max-width: 768px) {
    height: 40px;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }

  &::placeholder {
    font-size: 16px;
    line-height: 26px;
    color: #a0a3bd;

    @media screen and (max-width: 768px) {
      font-size: 14px;
      line-height: 20px;
    }
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

.is-error .input {
  border-color: #dc2626;
}
</style>
