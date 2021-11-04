<template>

    <nav class="navBar">
    <div class="container">
      <div class="headers">
        <router-link class="head" :to="{ name: 'Blogs' }">Welcome</router-link>
        <p class="displayName">{{ user.displayName }}</p>
      </div>
      <div class="buttons">
        <router-link :to="{name: 'Blogs'}">
        <button class="btn btn-outline-success">Home</button>
        </router-link>
        <button class="btn btn-outline-warning" @click="handleClick">
          Log out
        </button>
      </div>
    </div>
  </nav>
  <div class="SingleBlog" v-for="blog in userBlogs" :key="blog">
    <div class="card text-dark bg-light mb-2 p-1" style="width: 30rem;">
      <div class="blog-name-time">
      <h5>{{ blog.userName }}</h5>
      </div>
      <img class="card-img-top" :src="blog.coverUrl" alt="Card image cap" />
      <div class="card-body p-1">
        <h3 class="card-title">{{ blog.title }}</h3>
        <q class="card-text">{{ blog.content }}</q
        ><br/>
        <div class="tags" v-for="tag in blog.tags" :key="tag">
          <p class="tag">#{{ tag }}</p>
        </div>
      </div>
    </div>

    <div class="error">{{error}}</div>
  </div>
</template>

<script>
import getUserBlogs from '../composable/getUserBlogs'
import getUsers from "../composable/getUsers";
import LogoutUser from "../composable/LogoutUser";
import { ref } from "@vue/reactivity";
import Modal from "../components/Modal.vue";
import {watch} from "@vue/runtime-core";
import { projectFire } from "../firebase/config"
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {  Modal },
    setup() {
        const router = useRouter();
        const { logout } = LogoutUser();
        const route = useRoute();
        const { user } = getUsers();
        const modalActive = ref(false);
        const { userBlogs, error, load } = getUserBlogs();
        const toggleModal = () => {
        modalActive.value = !modalActive.value;
        };
        
        load()

        const handleDelete = async (blog) => {
          await projectFire.collection('blogs')
            .doc(blog.id)
            .delete()
        }

        watch(user, () => {
        if (!user.value) {
            router.push({ name: "Welcome" });
        }
        });

        const handleClick = async () => {
          await logout();
          if (!error.value) {
          console.log("user logged out");
          }
          router.push({name: "Welcome"})
        };

        return { userBlogs, user, error, modalActive, user, toggleModal, handleDelete, handleClick }
    }
}
</script>

<style scoped>
.head {
  color: white;
  text-decoration: none;
  font-size: 20px;
}

.full-page {
  background-image: url("https://wallpaperboat.com/wp-content/uploads/2020/06/03/42361/aesthetic-anime-01.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  min-height: 100vh;
}

.displayName {
  color: white;
  font-size: 20px;
}

.navBar {
  background: rgb(33, 37, 41);
  width: 100vw;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 6px 10px black;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
  margin-top: 1%;
}

.headers {
  display: flex;
  gap: 20px;
}

.buttons button {
  margin-left: 10px;
}

.SingleBlog {
  display: flex;
  justify-content: center;
  text-align: center;
}

.blog-cards {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 100px;
}

h5 {
  background-color: black;
  color: white;
  padding: 5px;
  width: 100%;
}

.card img {
  margin: 5px auto;
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.time {
  font-size: 10px;
  color: #555;
}

.tags {
  display: inline-block;
  margin: 5px 0px;
  font-weight: bold;
}

.tag {
  margin: 0px 5px;
}

.blog-name-time {
  display: flex;
  justify-content: space-between;
}

.like-comment {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
</style>