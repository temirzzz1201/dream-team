<template>
  <div class="form">
    <transition name="fade" mode="out-in">
      <template v-if="error">
        <error-screen :on-reset="reset" @back="error = false" />
      </template>
      <template v-else-if="success">
        <SuccessScreen @back="reset" />
      </template>
      <template v-else>
        <step-one
          v-if="step === 1"
          :form="form"
          :errors="errors"
          :submitted="submitted"
          :step="step"
          :on-reset="reset"
          @next="nextStep"
        />
        <step-two
          v-else
          :form="form"
          :errors="errors"
          :submitted="submitted"
          :step="step"
          @prev="prevStep"
          @submit="submit"
        />
      </template>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "../composables/useForm";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import ErrorScreen from "./ErrorScreen.vue";
import SuccessScreen from "./SuccessScreen.vue";

const {
  step,
  error,
  success,
  form,
  errors,
  submitted,
  nextStep,
  prevStep,
  submit,
  reset,
} = useForm();
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  max-width: 637px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 44px;
  border-radius: 32px;

  @media screen and (max-width: 768px) {
    padding: 20px 16px;
    border-radius: 16px;
  }

  &__step {
    display: flex;
    flex-direction: column;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
