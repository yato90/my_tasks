<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TaskItem from '../components/TaskItem.vue';

const store = useStore();

const tasks = computed(() =>store.state.tasks);

const handleAddTasks = (type) => store.dispatch('addForTask', type);
const handleUpdateTasks = (task, field, value) => {
  const updatedTask = { ...task, [field]: value };
  store.dispatch('updateForTask', updatedTask);
}
</script>

<template>
  <div class="list">
    <TaskItem v-for="task in tasks" :key="task.id" :class="{done: task.state}">
      <input 
        type="checkbox" 
        :checked="task.state" 
        @change="handleUpdateTasks(task, 'state', !task.state)" 
      />
      <input 
        type="text" 
        :value="task.title" 
        @blur="handleUpdateTasks(task, 'title', $event.target.value)" 
        placeholder="Введите заголовок"
      />
      <div class="date_time" v-show="!task.state">
        <span>
          {{ new Date(task.date).toLocaleString().slice(0, 17) }}
        </span>
        <input
          type="datetime-local" 
          :value="task.date" 
          @change="handleUpdateTasks(task, 'date', $event.target.value)" 
        />
      </div>
    </TaskItem>
    <button class="button" @click="handleAddTasks('random')">+</button>
  </div>
</template>

<style scoped>
@import "../assets/taskList.css";
</style>