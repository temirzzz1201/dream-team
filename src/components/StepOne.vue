<template>
  <div class="step-one">
    <form-title
      title="Форма обратной связи"
      subtitle="Пожалуйста, оцените свой опыт прохождения тестового"
      class="step-one_form-title-indent"
    />
    <div class="step-one__input-wrapper">
      <ui-input
        v-model="form.name"
        label="ФИО"
        placeholder="Иван Иванов"
        :error="submitted || form.name ? errors.name : ''"
      />

      <ui-input
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Email"
        :error="submitted || form.email ? errors.email : ''"
      />

      <ui-input
        v-model="form.phone"
        label="Телефон"
        placeholder="+7 (000) 000 00 00"
        :error="submitted || form.phone ? errors.phone : ''"
        phone
      />

      <form-select
        v-model="form.test"
        :options="testsOptions"
        placeholder="Выберите"
        label="Грейд"
        :error="submitted || form.test ? errors.test : ''"
      />
    </div>

    <div class="step-one_steps-indent">
      <form-steps :step="props.step" :total-steps="2" />
    </div>

    <div class="step-one__actions">
      <ui-button variant="secondary" @click="props.onReset">Отменить</ui-button>
      <ui-button @click="emit('next')">Далее</ui-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiInput from "./ui/UiInput.vue";
import UiButton from "./ui/UiButton.vue";
import FormSelect from "./FormSelect.vue";
import FormTitle from "./FormTitle.vue";
import FormSteps from "./FormSteps.vue";
import { useMainStore } from "../store/mainStore";
import { storeToRefs } from "pinia";

interface Form {
  name: string;
  email: string;
  phone: string;
  test: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  test?: string;
}

const store = useMainStore();
const { testsOptions } = storeToRefs(store);

const props = withDefaults(
  defineProps<{
    form: Form;
    errors: Errors;
    submitted: boolean;
    step?: number;
    onReset: () => void;
  }>(),
  {
    step: 1,
  },
);

const emit = defineEmits<{
  (event: "next"): void;
  (event: "cancel"): void;
}>();
</script>

<style lang="scss" scoped>
.step-one {
  &__input-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 16px;
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

  &_form-title-indent {
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      margin-bottom: 16px;
    }
  }

  &_steps-indent {
    @media screen and (max-width: 768px) {
      margin-top: 104px;
      margin-bottom: 20px;
    }
  }
}
</style>
