<template>
  <main class="app">
    <GreetingComponent />
    <AddTodoComponent @addTodo="addTodo" />
    <TodoListComponent :todos="todos" @removeTodo="removeTodo" />
  </main>
</template>

<script setup>
import "./main.css"
import { ref, onMounted, computed, watch } from 'vue'
import GreetingComponent from './components/GreetingComponent.vue'
import AddTodoComponent from './components/AddTodoComponent.vue'
import TodoListComponent from './components/TodoListComponent.vue'

const todos = ref([])

const todosAsc = computed(() => {
  return todos.value.sort((a, b) => a.createdAt - b.createdAt)
})

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
