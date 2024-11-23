<script setup>
defineProps({
  timer: {
    type: Number,
    required: true,
  },
  INIT_TIME: Number,
});
</script>

<template>
  <div class="timer-line">
    <div class="line" :style="{ width: `${(timer / INIT_TIME) * 100}%` }"></div>
  </div>
</template>

<style scoped>
.timer-line {
  max-width: 120px;
  width: 100%;
  height: 15px;
  background-color: #ddd;
}

.line {
  height: 100%;
  background-color: green;
  transition: width 1s linear;
}
</style>
