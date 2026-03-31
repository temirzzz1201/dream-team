import { ref, computed } from "vue";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  test: string;
  comment: string;
  level: string;
  rating: number;
  quickReplies: string[];
}

export interface FormErrors {
  name: string;
  email: string;
  phone: string;
  test: string;
  comment: string;
  level: string;
  rating: string;
  quickReplies: string;
}

export function useForm() {
  const step = ref(1);
  const error = ref(false);
  const success = ref(false);
  const submitted = ref(false);

  const form = ref<FormData>({
    name: "",
    email: "",
    phone: "",
    test: "",
    comment: "",
    level: "",
    rating: 0,
    quickReplies: [],
  });

  const getDigits = (val: string) => val.replace(/\D/g, "");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateName = (name: string) =>
    /^[A-Za-zА-Яа-яЁё\s]{3,}$/.test(name.trim());

  const validatePhone = (phone: string) => {
    const digits = getDigits(phone);
    return digits.length === 11 && digits.startsWith("7");
  };

  const errors = computed<FormErrors>(() => {
    const e: FormErrors = {
      name: "",
      email: "",
      phone: "",
      test: "",
      comment: "",
      level: "",
      rating: "",
      quickReplies: "",
    };

    e.name = !form.value.name.trim()
      ? "Введите ФИО"
      : !validateName(form.value.name)
        ? "Минимум 3 буквы, только буквы"
        : "";

    e.email = !form.value.email
      ? "Введите email"
      : !validateEmail(form.value.email)
        ? "Некорректный email"
        : "";

    e.phone = !form.value.phone
      ? "Введите телефон"
      : !validatePhone(form.value.phone)
        ? "Введите корректный номер"
        : "";

    e.test = !form.value.test ? "Выберите грейд" : "";
    e.rating = !form.value.rating ? "Поставьте оценку" : "";
    e.level = !form.value.level ? "Выберите уровень" : "";
    e.quickReplies =
      form.value.quickReplies.length === 0
        ? "Выберите хотя бы один вариант"
        : "";
    e.comment = !form.value.comment.trim()
      ? "Введите комментарий"
      : form.value.comment.trim().length < 5
        ? "Минимум 5 символов"
        : "";

    return e;
  });

  const isStepOneValid = computed(
    () =>
      !errors.value.name &&
      !errors.value.email &&
      !errors.value.phone &&
      !errors.value.test,
  );

  const isStepTwoValid = computed(
    () =>
      !errors.value.rating &&
      !errors.value.level &&
      !errors.value.quickReplies &&
      !errors.value.comment,
  );

  function nextStep() {
    submitted.value = true;
    if (!isStepOneValid.value) {
      error.value = true;
      return;
    }
    error.value = false;
    step.value = 2;
  }

  function prevStep() {
    step.value = 1;
    error.value = false;
  }

  function submit() {
    submitted.value = true;
    if (!isStepTwoValid.value) {
      error.value = true;
      return;
    }
    error.value = false;
    success.value = true;
  }

  function reset() {
    step.value = 1;
    error.value = false;
    success.value = false;
    submitted.value = false;

    form.value = {
      name: "",
      email: "",
      phone: "",
      test: "",
      comment: "",
      level: "",
      rating: 0,
      quickReplies: [],
    };
  }

  return {
    step,
    error,
    success,
    submitted,
    form,
    errors,
    nextStep,
    prevStep,
    submit,
    reset,
  };
}
