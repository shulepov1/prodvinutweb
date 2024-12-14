import { createRouter, createWebHistory } from 'vue-router';

const App = () => import('../App.vue');
const Project1 = () => import('../projects/test_1_numbers/src/App.vue');
const Project2 = () => import('../projects/test_2_unique_color/src/App.vue');
const Project3 = () => import('../projects/test_3_extra_item/src/App.vue');
const Project4 = () => import('../projects/test_4_clicks/src/App.vue');
const Project5 = () => import('../projects/test_5_typing/src/App.vue');

const routes = [
  {
    path: '/project1',
    name: 'project1',
    component: Project1,
  },
  {
    path: '/project2',
    name: 'project2',
    component: Project2,
  },
  {
    path: '/project3',
    name: 'project3',
    component: Project3,
  },
  {
    path: '/project4',
    name: 'project4',
    component: Project4,
  },
  {
    path: '/project5',
    name: 'project5',
    component: Project5,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
