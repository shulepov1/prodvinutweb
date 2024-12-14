<script setup>
import { ref } from "vue";
const props = defineProps(["points"]);
const emits = defineEmits(["guessCorrect"]);

let color1 = "rgb(0,0,0)";
let color2 = "rgb(255,255,255)";

let randomCellIndex = 0;
const pingingCellIndex = ref(null);

const chooseRandomColor = () => {
  const arr = [];

  for (let i = 0; i < 3; i += 1) {
    const randomValue = Math.floor(Math.random() * 256);
    arr.push(randomValue);
  }

  const randomIndex = Math.floor(Math.random() * 3);
  color1 = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

  if (arr[randomIndex] + 30 > 255) {
    arr[randomIndex] -= 30;
  } else {
    arr[randomIndex] += 30;
  }
  color2 = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

  randomCellIndex = Math.floor(Math.random() * 25);

  console.log(color1, color2, randomCellIndex);
};

const handleClick = (e, index) => {
  if (index === randomCellIndex) {
    emits("guessCorrect");
  }
};

setTimeout(() => {
  pingingCellIndex.value = randomCellIndex;
}, 3000);

chooseRandomColor();
</script>

<template>
  <div class="grid">
    <div
      v-for="(i, index) in Array(25)"
      class="cell"
      :style="
        index === randomCellIndex
          ? { backgroundColor: color2 }
          : { backgroundColor: color1 }
      "
      :class="{ pinging: index === pingingCellIndex }"
      @click="
        (e) => {
          handleClick(e, index);
        }
      "
    ></div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;

  border: 4px solid rgb(190, 149, 33);
  border-radius: 10px;
  padding: 0.5rem;

  width: 100%;
}
.cell {
  width: 100px;
  height: 100px;
}

.cell:hover {
  cursor: pointer;
}

.pinging {
  animation: ping 1s infinite;
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
  .cell {
    width: 50px;
    height: 50px;
  }
}
</style>
