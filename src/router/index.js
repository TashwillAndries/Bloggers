import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Blogs from "../views/Blogs.vue";
import Userblogs from "../views/UserBlogs.vue";
import { projectAuth } from "../firebase/config";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: "Blogs" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    beforeEnter: requireAuth,
  },
  {
    path: "/user-blogs",
    name: "Userblogs",
    component: Userblogs
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
