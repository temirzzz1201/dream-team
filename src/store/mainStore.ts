import { defineStore } from "pinia";
import { ref } from "vue";

interface SelectOption {
  label: string;
  value: string;
}

export const useMainStore = defineStore("main", () => {
  const levelOptions = ref<SelectOption[]>([
    { label: "Junior", value: "Junior" },
    { label: "Middle", value: "Middle" },
    { label: "Senior", value: "Senior" },
    { label: "Team Lead", value: "Team Lead" },
  ]);

  const testsOptions = ref<SelectOption[]>([
    { label: "Test 1", value: "Test 1" },
    { label: "Test 2", value: "Test 2" },
    { label: "Test 3", value: "Test 3" },
    { label: "Test 4", value: "Test 4" },
  ]);

  const quickOptions = ref<string[]>([
    "Не понятно",
    "Скучно",
    "Сложно",
    "Интересно",
  ]);

  return {
    levelOptions,
    quickOptions,
    testsOptions,
  };
});
