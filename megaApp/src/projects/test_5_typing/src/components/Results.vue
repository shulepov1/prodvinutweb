<script setup>
const emits = defineEmits(["changeState"]);

defineProps(["wpm", "mistakenWords"]);

const handleClick = () => {
  emits("changeState", "start");
};
</script>

<template>
  <p>Ваши результаты</p>
  <p>
    Слов в минуту: <strong>{{ wpm }}</strong>
  </p>
  <p>Слова, в которых вы допустили ошибку</p>
  <div v-for="word in mistakenWords" class="wrong">
    {{ word }}
  </div>

  <button @click="handleClick">Начать заново!</button>
</template>

<style scoped>
.wrong {
  color: rgb(235, 35, 35);
}
</style>
