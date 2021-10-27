import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
<<<<<<< HEAD
import Create from "../views/CreatePost.vue";
=======
import Blogs from "../views/Blogs.vue";
>>>>>>> fc7bbbf814fa8ad8e51cadf74e30faf495d458ab

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
<<<<<<< HEAD
    path: "/create-post",
    name: "Create",
    component: Create 
  }
=======
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
  },
>>>>>>> fc7bbbf814fa8ad8e51cadf74e30faf495d458ab
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
