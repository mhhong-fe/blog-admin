import { createRouter, createWebHistory } from 'vue-router';

import Article from '../pages/article/index.vue';
import Category from '../pages/category/index.vue';
import Login from '../pages/login/index.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: Login },
    { path: '/article', name: 'article', component: Article },
    { path: '/category', name: 'category', component: Category },
];

const router = createRouter({
    history: createWebHistory('blogAdmin'),
    routes,
});

export default router;
