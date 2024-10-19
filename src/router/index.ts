import { createRouter, createWebHistory } from 'vue-router';

import Article from '../pages/article/index.vue';
import Category from '../pages/category/index.vue';
import Login from '../pages/login/index.vue';
// import { getCookie } from '~/utils';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: Login },
    { path: '/article', name: 'article', component: Article },
    { path: '/category', name: 'category', component: Category },
];

const router = createRouter({
    history: createWebHistory('admin'),
    routes,
});

// 设置了httpOnly，使用document.cookie就不能获取到了
// router.beforeEach((to, from, next) => {
//     const token = getCookie('token');
//     if (to.name !== 'login' && !token) {
//         next({ name: 'login' });
//     }
//     else {
//         next();
//     }
// });

export default router;
