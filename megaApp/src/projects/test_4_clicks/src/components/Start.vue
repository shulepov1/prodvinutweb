<script setup>
import { ref } from "vue";

const emits = defineEmits(["startGame", "setDuration"]);

const selectedDuration = ref(1);

const handleClick = () => {
  emits("startGame");
};

const handleButton = (e, val) => {
  selectedDuration.value = val;
  emits("setDuration", val);
};
</script>

<template>
  <div class="col">
    <h2>Тест На Скорость Кликов</h2>
    <div>
      <button
        :class="{ active: selectedDuration === 1 }"
        @click="(e) => handleButton(e, 1)"
      >
        1сек
      </button>
      <button
        :class="{ active: selectedDuration === 3 }"
        @click="(e) => handleButton(e, 3)"
      >
        3сек
      </button>
      <button
        :class="{ active: selectedDuration === 5 }"
        @click="(e) => handleButton(e, 5)"
      >
        5сек
      </button>
    </div>
    <p>
      Это {{ selectedDuration }}-секундный простой тест. Нужно кликать по кнопке
      как можно быстрее. Проходите тест снова и снова. Постарайтесь получить
      лучший результат (CPS - Клик в секунду). Согласно нашим данным, средняя
      величина CPS составляет 6.25, и мировой рекорд 14.1 по данным Гугл. Люди
      могут получить немного больше баллов на телефоне/планше нежели на
      компьютере. Сможете ли вы поставить новый рекорд? Пожалуйста, не
      стесняйтесь поделиться этим тестом со своими друзьями и бросить им вызов!
    </p>
    <button @click="handleClick">Начать!</button>
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
