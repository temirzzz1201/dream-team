<template>
  <div class="succsess">
    <form-title
      title="Спасибо, ваш ответ отправлен"
      subtitle="Свяжемся с вами в ближайшее время"
      class="succsess_form-title-indent"
    />

    <img class="succsess__img" :src="successImg" alt="succsess" />
    <div class="succsess__actions">
      <ui-button @click="emit('back')">На главную</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from "./ui/UiButton.vue";
import FormTitle from "./FormTitle.vue";
import successImg from "../assets/images/succsess.png";

const emit = defineEmits<{
  (event: "back"): void;
}>();
</script>

<style lang="scss" scoped>
.succsess {
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
