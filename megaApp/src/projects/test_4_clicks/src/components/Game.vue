<script setup></script>

<template>
  <div class="game-wrapper">
    <p>Начинайте кликать по области, чтобы начать.</p>
    <div class="game-area">
      <div class="clickArea" @click="handleClick"></div>
      <div class="game-info">
        <p v-if="gameStarted">
          Кликов: <strong>{{ clicks }}</strong>
        </p>
        <p v-if="gameStarted">
          Кликов в секунду: <strong>{{ cps }}</strong>
        </p>
        <p v-if="gameStarted">
          Времени осталось: <strong>{{ timeRemaining }}</strong> сек
        </p>
        <div v-if="gameOver" class="game-over">
          <p>Игра окончена! Финальный результат: {{ cps }}</p>
          <button @click="handleButtonClick">Посмотреть результаты</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      clicks: 0,
      // startTime: 0,
      gameStarted: false,
      timeRemaining: this.timeRemaining,
      cps: 0,
      gameOver: false,
    };
  },
  methods: {
    handleClick() {
      if (!this.gameStarted) {
        this.startGame();
      }
      if (!this.gameOver) {
        this.clicks += 1;
      }
    },
    handleButtonClick() {
      this.$emit("gameIsOver", this.cps);
    },
    startGame() {
      this.gameStarted = true;
      this.startTime = Date.now();
      this.timeRemaining = this.duration;

      const timer = setInterval(() => {
        const elapsedTime = (Date.now() - this.startTime) / 1000;
        this.timeRemaining = Math.max(this.duration - elapsedTime, 0).toFixed(
          2
        );

        if (elapsedTime >= this.duration) {
          clearInterval(timer);
          this.gameOver = true;
          this.cps = (this.clicks / elapsedTime).toFixed(2);
        }
      }, 100);
    },
  },
};
</script>

<style scoped>
.game-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.game-area {
  text-align: center;
  padding: 20px;
}

.clickArea {
  max-width: 800px;
  width: 80vw;
  height: 10vh;
  margin: 0 auto;
  background-color: rgb(34, 133, 34);
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.1s ease;
}

.clickArea:active {
  background-color: rgb(163, 228, 58);
}

.game-over {
  color: red;
  font-size: 20px;
  font-weight: bold;
}

.game-info {
  margin-top: 1rem;
  height: 160px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.game-info > p {
  margin: 0;
}
</style>
