<script setup>
import { ref, onMounted } from "vue";
const props = defineProps(["currentState"]);
const emit = defineEmits(["updateCurrentState"]);

const endCountdown = () => {
  emit("updateCurrentState", "remembering");
};

const countdownValue = ref(3);

onMounted(() => {
  const interval = setInterval(() => {
    if (countdownValue.value > 1) {
      countdownValue.value -= 1;
    } else {
      clearInterval(interval);
      endCountdown();
    }
  }, 1000);
});
</script>

<template>
  <h2>Пожалуйста, подождите...</h2>
  <h1>{{ countdownValue }}</h1>
</template>

<script></script>
