<template>
  <div class="form-steps">
    <template v-for="n in totalSteps" :key="n">
      <div class="form-steps__circle" :class="{ active: n <= step }">
        {{ n }}
      </div>

      <div
        v-if="n < totalSteps"
        class="form-steps__line"
        :class="{ filled: step > n }"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    step?: number;
    totalSteps: number;
  }>(),
  {
    step: 1,
  },
);

const { step, totalSteps } = props;
</script>

<style scoped lang="scss">
.form-steps {
  display: none;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    display: flex;
  }
}

.form-steps__circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
  background: #eff0f6;
  color: #6f6c90;
  transition:
    background 0.3s,
    color 0.3s,
    border-color 0.3s;

  &.active {
    background: #4a3aff;
    color: #fff;
  }
}

.form-steps__line {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  margin: 0 4px;
  background: #e0e0ef;
  transition: background 0.4s;

  &.filled {
    background: #4a3aff;
  }
}
</style>
