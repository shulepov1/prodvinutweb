<script setup>
const emits = defineEmits(["startGame"]);
const props = defineProps(["points"]);

const handleClick = () => {
  emits("startGame");
};
</script>

<template>
  <h2>Игра окончена!</h2>
  <p>Вы набрали {{ points }} баллов.</p>
  <button @click="handleClick">Начать сначала</button>
</template>
