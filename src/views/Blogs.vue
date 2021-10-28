<template>
  <nav class="navBar">
    <div class="container">
      <div class="headers">
        <router-link class="head" :to="{ name: 'Blogs' }">Welcome</router-link>
        <p class="displayName">{{ user.displayName }}</p>
      </div>
      <div class="buttons">
        <button class="btn btn-outline-success">+</button>
        <button class="btn btn-outline-warning" @click="handleClick">Log out</button>
      </div>
    </div>
  </nav>
</template>

<script>
import getUsers from "../composable/getUsers";
import LogoutUser from "../composable/LogoutUser"
import { useRouter } from 'vue-router'
import { watch } from '@vue/runtime-core'
export default {
  setup() {
    const {logout, error} = LogoutUser()
    const { user } = getUsers();
    const router = useRouter()

    watch(user, () => {
      if (!user.value) {
        router.push({ name: 'Welcome' })
      }
    })

    const handleClick  = async () => {
      await logout()
      if (!error.value) {
        console.log('user logged out');
      }
    }

    return { user, handleClick };
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
</style>
