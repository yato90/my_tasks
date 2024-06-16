<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const taskToday = computed(() => store.getters.tasksToday);
const tasksTomorrow = computed(() => store.getters.tasksTomorrow);

const currentDate = new Date();
const formattedDateTime = computed(() => {
  const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const optionsTime = {
    hour: 'numeric',
    minute: 'numeric'
  };
  const formattedDate = currentDate.toLocaleDateString('ru-RU', optionsDate);
  const formattedTime = currentDate.toLocaleTimeString('ru-RU', optionsTime);

  return `${formattedDate}<br>${formattedTime}`;
});
</script>

<template>
  <nav class="nav">
    Мои задачи
    <router-link to="/">Список задач</router-link>
    <router-link to="/board">Канбан-доска</router-link>
  </nav>
  <div class="nav_text">
    <p>На сегодня: <span class="today">{{ taskToday.length }}</span></p>
    <p>На завтра: <span class="tomorow">{{ tasksTomorrow.length }}</span></p>
  </div>
  <div class="nav_date"><span v-html="formattedDateTime"></span></div>
</template>

<style scoped>
@import "../assets/navbar.css";
</style>


