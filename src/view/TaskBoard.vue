<script setup>
import { computed  } from 'vue';
import { useStore } from 'vuex';
import TaskItem from '../components/TaskItem.vue';

const store = useStore();

const taskToday = computed(() => store.getters.tasksToday);
const tasksTomorrow = computed(() => store.getters.tasksTomorrow);
const tasksLater = computed(() => store.getters.tasksLater);

const handleAddTasks = (type) => store.dispatch('addForTask',type);
const handleUpdateTasks = (task, field, value) => {
  const updatedTask = { ...task, [field]: value };
  store.dispatch('updateForTask', updatedTask);
}
</script>

<template>
  <div class="board">
    <div class="board_type">
      <h2>Сегодня</h2>
      <TaskItem v-for="task in taskToday" :key="task.id" :class="{ done: task.state }">
        <input 
          type="checkbox" 
          :checked="task.state" 
          @change="handleUpdateTasks(task, 'state', !task.state)" 
        />
        <div class="board_type_info">
          <input 
            type="text" 
            :value="task.title" 
            @blur="handleUpdateTasks(task, 'title', $event.target.value)" 
            placeholder="Введите заголовок"
          />
          <div class="date_time" v-show="!task.state">
            <span>
              {{ new Date(task.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </span>
            <input
              type="datetime-local" 
              :value="task.date" 
              @change="handleUpdateTasks(task, 'date', $event.target.value)" 
            />
          </div>
        </div>
      </TaskItem>
      <button class="button" @click="handleAddTasks('today')">+</button>
    </div>
    <div class="board_type type_center">
      <h2>Завтра</h2>
      <TaskItem v-for="task in tasksTomorrow" :key="task.id" :class="{ done: task.state }">
        <input 
          type="checkbox" 
          :checked="task.state" 
          @change="handleUpdateTasks(task, 'state', !task.state)" 
        />
        <div class="board_type_info">
          <input 
            type="text" 
            :value="task.title" 
            @blur="handleUpdateTasks(task, 'title', $event.target.value)" 
            placeholder="Введите заголовок"
          />
          <div class="date_time" v-if="!task.state">
            <span>
              {{ new Date(task.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </span>
            <input
              type="datetime-local" 
              :value="task.date" 
              @change="handleUpdateTasks(task, 'date', $event.target.value)" 
            />
          </div>
        </div>
      </TaskItem>
      <button class="button" @click="handleAddTasks('tomorrow')">+</button>
    </div>
    <div class="board_type">
      <h2>Позднее</h2>
      <TaskItem v-for="task in tasksLater" :key="task.id" :class="{ done: task.state }">
        <input 
          type="checkbox" 
          :checked="task.state" 
          @change="handleUpdateTasks(task, 'state', !task.state)" 
        />
        <div class="board_type_info">
          <input 
            type="text" 
            :value="task.title" 
            @blur="handleUpdateTasks(task, 'title', $event.target.value)" 
            placeholder="Введите заголовок"
          />
          <div class="date_time" v-if="!task.state">
            <span>
              {{ new Date(task.date).toLocaleDateString([], { month: '2-digit', day: '2-digit' }) }}
            </span>
            <input
              type="datetime-local" 
              :value="task.date" 
              @change="handleUpdateTasks(task, 'date', $event.target.value)" 
            />
          </div>
        </div>
      </TaskItem>
      <button class="button" @click="handleAddTasks('later')">+</button>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/taskBoard.css";
</style>