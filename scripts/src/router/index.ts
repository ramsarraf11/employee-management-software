import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import AddOrganization from '../views/AddOrganization.vue';
import HumanResource from '../views/HumanResource.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  {
  path: '/addorg',
  component: AddOrganization,
  },
  {
    path: '/humanresource',
    component: HumanResource,
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;