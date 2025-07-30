import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Employees from '../views/Employees.vue';
import AddOrganization from '../views/AddOrganization.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/employees', component: Employees },
  {
  path: '/addorg',
  component: AddOrganization,
}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;