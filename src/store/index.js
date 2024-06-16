import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  strict: true,
  state: {
    tasks: [],
  },
  getters: {
    allTasks: state =>{
      return state.tasks.toISOString().split('T')[0];
    },
    tasksToday: state => {
      const today = new Date().toISOString().split('T')[0];
      return state.tasks.filter(task => task.date && task.date.startsWith(today));
    },
    tasksTomorrow: state => {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      return state.tasks.filter(task => task.date && task.date.startsWith(tomorrow));
    },
    tasksLater: state => {
      const tomorrow = new Date(Date.now() + 36 * 60 * 60 * 1000);
      return state.tasks.filter(task => {
        const taskDate = new Date(task.date);
        return task.date && taskDate > tomorrow;
      });
    },
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        Object.assign(state.tasks[index], updatedTask);
      }
    },
  },
  actions: {
    async setForTasks({ commit }) {
      const response = await axios.get('http://localhost:3000/tasks');
      const sortedTasks = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      commit('setTasks', sortedTasks);
    },
    async addForTask({ commit }, type) {
      const newTask = generateRandomTask(type);
      const response = await axios.post('http://localhost:3000/tasks', newTask);
      commit('addTask', response.data);
    },
    async updateForTask({ commit }, updatedFields) {
      try{
        const response = await axios.put(`http://localhost:3000/tasks/${updatedFields.id}`, updatedFields);
        commit('updateTask', response.data);
      } catch (error) {
        console.error('Error updating task:', error);
        throw error; 
      }
    },
  },
});

function generateRandomTask(type) {
  const id = Math.floor(Math.random() * 1000).toString();
  const title = `Задача ${id}`;
  const state = 0;

  let date;
  const today = new Date();

  if (type === 'today') {
    date = today.toISOString().slice(0, 16);
  } else if (type === 'tomorrow') {
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    date = tomorrow.toISOString().slice(0, 16);
  } else if (type === 'later') {
    const threeDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    date = threeDaysLater.toISOString().slice(0, 16);
  } else if (type === 'random') {
    const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    date = sevenDaysLater.toISOString().slice(0, 16);
  }

  return { id, state, title, date };
}

export default store;
