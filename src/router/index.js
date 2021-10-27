import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Create from "../views/CreatePost.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/create-post",
    name: "Create",
    component: Create 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
