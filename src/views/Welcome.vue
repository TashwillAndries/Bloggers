<template>
  <div class="welcome">
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Welcome' }"
          >Welcome</router-link
        >
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="showLogin">
              <span
                class="text-decoration-none btn btn-info"
                @click="showLogin = false"
                >Sign up</span
              >
            </li>

            <li class="nav-item" v-else>
              <span
                class="text-decoration-none btn btn-success"
                @click="showLogin = true"
                >Login</span
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="showLogin" style="margin-top: 150px;">
      <h2 class="mt-5" style="color: white;">Login</h2>
      <LoginForm @login="enterBlog" />
    </div>
    <div v-else style="margin-top: 150px;">
      <h2 class="mt-5" style="color: white;">Signup</h2>
      <SignupForm @signup="enterBlog" />
    </div>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  components: { SignupForm, LoginForm },
  setup() {
    const showLogin = ref(true);
    const router = useRouter();
    const enterBlog = () => {
      router.push({ name: "Blogs" });
    };
    return { showLogin, enterBlog };
  },
};
</script>

<style>
.welcome {
  background-image: url(../assets/back.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding: 20px 0;
  height: 100vh;
  width: 100vw;
}
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome label {
  display: block;
  margin: 20px 0 10px;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
span {
  margin-right: 15px;
  padding: 8px 20px;
  border-radius: 15px;
}
</style>
