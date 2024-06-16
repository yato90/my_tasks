import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../view/TaskList.vue';
import TaskBoard from '../view/TaskBoard.vue';

const routes = [
    {
        path: '/',
        name:'TaskList',
        component: TaskList,
    },
    {
        path: '/board',
        name:'TaskBoard',
        component: TaskBoard,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;