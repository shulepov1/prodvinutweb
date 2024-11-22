<template>
  <section class="todo-list">
    <h3>Список дел</h3>
    <div class="list">
      <div v-if="todos.length <= 0">
        <p>Добавьте новое задание!</p>
      </div>
      <div v-if="todos.length > 0">
        <TodoItemComponent v-for="todo in todos" :key="todo.createdAt" :todo="todo" @deleteTodo="removeTodo" />
      </div>
    </div>
  </section>
</template>

<script setup>
import TodoItemComponent from './TodoItemComponent.vue'

const props = defineProps({
  todos: Array
})

const emit = defineEmits()

const removeTodo = (todo) => {
  emit('removeTodo', todo)
}
</script>