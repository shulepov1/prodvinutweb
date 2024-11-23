<script setup>
const emits = defineEmits(["startGame"]);
const defineProps = defineProps(["INIT_TIME"]);
const handleClick = () => {
  emits("startGame");
};
</script>

<template>
  <h2>Тест: Найди уникальный цвет!</h2>
  <p>
    Ваша задача - найти клетку, которая отличается от других своим цветом и
    нажать на нее.
  </p>
  <p>У вас будет {{ INIT_TIME }} секунд.</p>
  <button @click="handleClick">Начать</button>
</template>
