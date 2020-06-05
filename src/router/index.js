import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import NotFound from '@/views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => new Promise((resolve) => setTimeout(() => resolve(Home), 1000)),

  },
  {
    path: '*',
    name: '404',
    component: () => new Promise((resolve) => setTimeout(() => resolve(NotFound), 1000)),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
