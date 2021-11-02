<template>
    <nav class="navBar">
    <div class="container">
      <div class="headers">
        <router-link class="head" :to="{ name: 'Blogs' }">Welcome</router-link>
        <p class="displayName">{{ user.displayName }}</p>
      </div>
      <div class="buttons">
        <button class="btn btn-outline-success" @click="toggleModal">+</button>
        <button class="btn btn-outline-warning" @click="handleClick">
          Log out
        </button>
      </div>
    </div>
  </nav>

  <div>
    <Modal @close="toggleModal" :modalActive="modalActive">
      <div class="modal-stuff"></div>
    </Modal>
  </div>

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
  </div>

  <div class="error">{{error}}</div>
</template>

<script>
import getUserBlogs from '../composable/getUserBlogs'
import getUsers from "../composable/getUsers";
import { ref } from "@vue/reactivity";
import Modal from "../components/Modal.vue";
import {watch} from "@vue/runtime-core"

export default {
    components: {  Modal },
    setup() {
        const { user } = getUsers();
        const modalActive = ref(false);
        const { userBlogs, error, load } = getUserBlogs();
        const toggleModal = () => {
        modalActive.value = !modalActive.value;
        };
        
        load()
        console.log("Ko", userBlogs);

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
        };

        return { userBlogs, user, error, modalActive, user, toggleModal, handleClick }
    }
}
</script>

<style scoped>
.head {
  color: white;
  text-decoration: none;
  font-size: 20px;
}
.displayName {
  color: white;
  font-size: 20px;
}
.navBar {
  background: rgb(33, 37, 41);
  width: 100vw;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
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
  margin-top: 5%;
  margin-left: 10%;
}
.time {
  font-size: 10px;
  color: #555;
}
.tags {
  display: inline-block;
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