import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Blogs from "../views/Blogs.vue";
import Create from "../views/CreatePost.vue"

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
