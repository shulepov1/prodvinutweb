<script setup>
import { ref } from "vue";

const emits = defineEmits(["changeState", "changeGameDuration"]);

const props = defineProps({
  duration: Number,
});

const selectedDuration = ref(props.duration);

const handleClick = () => {
  emits("changeState", "game");
};

const handleButtonClick = (val) => {
  selectedDuration.value = val;
  emits("changeGameDuration", val);
};
</script>

<template>
  <h2>Тест ввода › Проверь сколько слов за минуту ты вводишь.</h2>

  <div>
    <button
      :class="{ active: selectedDuration === 15 }"
      @click="handleButtonClick(15)"
    >
      15сек
    </button>
    <button
      :class="{ active: selectedDuration === 30 }"
      @click="handleButtonClick(30)"
    >
      30сек
    </button>
    <button
      :class="{ active: selectedDuration === 60 }"
      @click="handleButtonClick(60)"
    >
      60сек
    </button>
  </div>

  <p>
    Тест Ввода – это простой, {{ selectedDuration }} секундный тест для проверки
    скорости ввода. Наша команда совместно с экспертами тщательно подобрала 10
    отрывков из литературы и более 1000 слов для этого теста. Текущий мировой
    рекорд 225 слов в минуту. Не стесняйся бросить вызов друзьям или загружай
    ролик на YouTube.
  </p>

  <button @click="handleClick">Начать!</button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

button.active,
button.active:hover {
  background-color: rgb(97, 97, 211);
  color: white;
}

button:hover {
  background-color: lightblue;
}
</style>
