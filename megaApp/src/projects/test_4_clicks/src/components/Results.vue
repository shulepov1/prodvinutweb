<script setup>
import Lenivec from "./svg/Lenivec.vue";
import Turtle from "./svg/Turtle.vue";
import Horse from "./svg/Horse.vue";
import Cheetah from "./svg/Cheetah.vue";

const props = defineProps({
  results: Array,
});

const { results } = props;

const emits = defineEmits(["startGame"]);

const handleClick = () => {
  emits("startGame");
};

const latestResult = results[results.length - 1];
</script>

<template>
  <div class="grid">
    <div>
      <p>У вас кликов в секунду:</p>
      <h2>
        {{ latestResult }}
      </h2>
      <div class="animal">
        <div v-if="latestResult < 3">
          <Lenivec></Lenivec>
        </div>
        <div v-if="latestResult >= 3 && latestResult < 7">
          <Turtle></Turtle>
        </div>
        <div v-if="latestResult == 7">
          <Horse></Horse>
        </div>
        <div v-if="latestResult > 7">
          <Cheetah></Cheetah>
        </div>
      </div>
    </div>
    <div>
      <h3>Результаты прошедших игр:</h3>
      <ul>
        <li v-for="(result, index) in results" :key="index">
          Игра {{ index + 1 }} - {{ result }}
        </li>
      </ul>
      <button @click="handleClick">Попробовать еще раз</button>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 5rem;
}

@media (width < 700px) {
  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;
  }
}

.animal {
  animation-name: animal;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes animal {
  0% {
    transform: translateY(6px);
  }

  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(6px);
  }
}
</style>
