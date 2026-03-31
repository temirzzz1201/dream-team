<template>
  <div class="step-two">
    <form-title
      title="Форма обратной связи"
      subtitle="Пожалуйста, оцените свой опыт прохождения тестового"
      class="step-two_form-title-indent"
    />
    <rating-stars
      v-model="form.rating!"
      :error="submitted ? errors.rating : ''"
      class="step-two__rating"
    />

    <form-select
      label="Грейд"
      v-model="form.level"
      :options="levelOptions"
      placeholder="Уровень"
      class="step-two__select"
      :error="submitted ? errors.level : ''"
    />

    <quick-replies
      v-if="form.rating"
      v-model="form.quickReplies"
      :options="quickOptions"
      :error="submitted ? errors.quickReplies : ''"
      class="step-two__quick-replies"
    />

    <ui-textarea
      v-model="form.comment"
      label="Дополнительная информация"
      placeholder="Что понравилось и не понравилось"
      :error="submitted ? errors.comment : ''"
      class="step-two__comment"
    />
    <div class="step-two_steps-indent">
      <form-steps :step="props.step" :total-steps="2" />
    </div>

    <div class="step-two__actions">
      <ui-button variant="secondary" @click="emit('prev')">Назад</ui-button>
      <ui-button @click="emit('submit')">Отправить</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from "./ui/UiButton.vue";
import FormSelect from "./FormSelect.vue";
import RatingStars from "./RatingStars.vue";
import QuickReplies from "./QuickReplies.vue";
import UiTextarea from "./ui/UiTextarea.vue";
import FormTitle from "./FormTitle.vue";
import FormSteps from "./FormSteps.vue";
import { useMainStore } from "../store/mainStore";
import { storeToRefs } from "pinia";

interface StepTwoForm {
  rating: number | null;
  level: string;
  quickReplies: string[];
  comment: string;
}

interface StepTwoErrors {
  rating?: string;
  level?: string;
  quickReplies?: string;
  comment?: string;
}

const store = useMainStore();
const { levelOptions, quickOptions } = storeToRefs(store);

const props = defineProps<{
  form: StepTwoForm;
  errors: StepTwoErrors;
  submitted: boolean;
  step: number;
}>();

const emit = defineEmits<{
  (event: "prev"): void;
  (event: "submit"): void;
}>();
</script>

<style lang="scss" scoped>
.step-two {
  text-align: center;
  &_form-title-indent {
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
      margin-bottom: 16px;
    }
  }

  &__rating {
    margin-bottom: 36px;

    @media screen and (max-width: 768px) {
      margin-bottom: 16px;
    }
  }

  &__select {
    margin-bottom: 28px;
    @media screen and (max-width: 768px) {
      margin-bottom: 16px;
    }
  }

  &__quick-replies {
    margin-bottom: 36px;
    @media screen and (max-width: 768px) {
      margin-bottom: 16px;
    }
  }

  &__actions {
    width: 100%;
    display: flex;
    margin-top: 40px;
    gap: 28px;

    @media screen and (max-width: 768px) {
      margin-top: unset;
      gap: 20px;
    }
  }

  &_steps-indent {
    @media screen and (max-width: 768px) {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
