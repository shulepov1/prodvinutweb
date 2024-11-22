<template>
  <main class="app">
    <div>
      <GreetingComponent />
      <AddTodoComponent @addTodo="addTodo" />
    </div>
    <div>
      <TodoListComponent :todos="todos" @removeTodo="removeTodo" />
    </div>
  </main>
</template>

<script setup>
import "./main.css"
import { ref, onMounted, watch } from 'vue'
import GreetingComponent from './components/GreetingComponent.vue'
import AddTodoComponent from './components/AddTodoComponent.vue'
import TodoListComponent from './components/TodoListComponent.vue'

const todos = ref([])

const addTodo = (todo) => {
  todos.value.push(todo)
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter(t => t !== todo)
}

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos))
}, { deep: true })

</script>
