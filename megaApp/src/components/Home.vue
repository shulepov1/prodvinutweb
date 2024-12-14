<template>
  <p><strong>Выберите тест</strong></p>
  <nav>
    <RouterLink to="/">Вернуться</RouterLink>
    <RouterLink to="/project1">Тест на запоминание чисел!</RouterLink>
    <RouterLink to="/project2">Тест: Найди уникальный цвет!</RouterLink>
    <RouterLink to="/project3">Тест: Найди Лишний предмет!</RouterLink>
    <RouterLink to="/project4">Тест На Скорость Кликов</RouterLink>
    <RouterLink to="/project5"
      >Тест ввода › Проверь сколько слов за минуту ты вводишь</RouterLink
    >
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@media (width < 800px) {
  nav {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
