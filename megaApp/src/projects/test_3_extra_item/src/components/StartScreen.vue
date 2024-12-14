<script setup>
const emits = defineEmits(["startGame"]);
const defineProps = defineProps(["INIT_TIME"]);
const handleClick = () => {
  emits("startGame");
};
</script>

<template>
  <h2>Тест: Найди Лишний предмет!</h2>
  <p>
    Добро пожаловать в Лишний предмет, игру, разработанную под руководством
    профессиональных тренеров по киберспорту, чтобы тщательно проверить ваше
    внимание к деталям в увлекательной форме! Ваша миссия проста: найти
    единственный предмет в сетке, который отличается от остальных.
  </p>
  <p>У вас будет {{ INIT_TIME }} секунд.</p>
  <button @click="handleClick">Начать</button>
</template>
