<template>
  <nav class="navBar">
    <div class="container">
      <div class="headers">
        <router-link class="head" :to="{ name: 'Blogs' }">Welcome</router-link>
        <p class="displayName">{{ user.displayName }}</p>
      </div>
      <div class="buttons">
        <button class="btn btn-outline-success" @click="toggleModal">+</button>
        <button class="btn btn-outline-warning">Log out</button>
      </div>
    </div>
  </nav>
  <div>
    <Modal @close="toggleModal" :modalActive="modalActive" class="modal-style">
      <div class="modal-stuff"></div>
    </Modal>
  </div>
</template>

<script>
import getUsers from "../composable/getUsers";
import { ref } from "@vue/reactivity";
import Modal from "../components/Modal.vue";
import LogoutUsers from "../composable/LogoutUser";
export default {
  components: { Modal },
  setup() {
    const { logout, error } = LogoutUser();
    const { user } = getUsers();
    const modalActive = ref(false);
    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };
    return { modalActive, user, toggleModal };
  },
};
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
.modal-style {
  margin-bottom: 25px;
}
</style>
