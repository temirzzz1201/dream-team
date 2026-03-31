<template>
  <div class="error">
    <form-title
      title="Что-то пошло не так"
      subtitle="Попробуйте заполнить форму позже"
      class="error_form-title-indent"
    />
    <img class="error__img" :src="errorEmg" alt="error" />
    <div class="error__actions">
      <ui-button variant="secondary" @click="props.onReset">Закрыть</ui-button>
      <ui-button @click="emit('back')">Попробовать снова</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from "./ui/UiButton.vue";
import FormTitle from "./FormTitle.vue";
import errorEmg from "../assets/images/error.png";

const props = defineProps<{
  onReset: () => void;
}>();

const emit = defineEmits<{
  (event: "back"): void;
}>();
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__img {
    width: 157px;
    height: 143px;

    @media screen and (max-width: 768px) {
      width: 100px;
      height: 91px;
    }
  }

  &__actions {
    display: flex;
    width: 100%;
    margin-top: 95px;
    gap: 28px;

    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
      margin-top: 44px;
      gap: 20px;
    }
  }

  &_form-title-indent {
    margin-bottom: 96px;

    @media screen and (max-width: 768px) {
      margin-bottom: 44px;
    }
  }
}
</style>
