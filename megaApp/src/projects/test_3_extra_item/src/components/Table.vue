<script setup>
import { ref } from "vue";
import pairs from "../pairs.js";
const props = defineProps(["points"]);
const emits = defineEmits(["guessCorrect"]);

let randomCellIndex = Math.floor(Math.random() * 100);
const pingingCellIndex = ref(null);

const randomIndex = Math.floor(Math.random() * pairs.length);

const cellValues = Array.from({ length: 100 }, (_, index) => {
  return index === randomCellIndex
    ? pairs[randomIndex][0]
    : pairs[randomIndex][1];
});

const handleClick = (e, index) => {
  if (index === randomCellIndex) {
    emits("guessCorrect");
  }
};

setTimeout(() => {
  pingingCellIndex.value = randomCellIndex;
}, 3000);
</script>

<template>
  <div class="grid">
    <div
      v-for="(value, index) in cellValues"
      class="cell"
      :class="{ pinging: index === pingingCellIndex }"
      @click="
        (e) => {
          handleClick(e, index);
        }
      "
    >
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;

  border: 4px solid rgb(190, 149, 33);
  border-radius: 10px;
  padding: 0.5rem;
}
.cell {
  width: 50px;
  height: 50px;

  color: green;
  background-color: yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}

.cell:hover {
  cursor: pointer;
}

.pinging {
  animation: ping 1s infinite;
  background-color: rgb(117, 115, 115);
  color: gold;
}

@keyframes ping {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (width < 800px) {
  .grid {
    column-gap: 0.1rem;
    row-gap: 0.1rem;
  }
  .cell {
    font-size: min(3rem, 3vw);
    width: min(50px, 7vw);
    height: min(50px, 7vw);
  }
}
</style>
