<template>
  <div class="welcome container">
    <div class="form" v-if="showLogin">
      <Navbar />
      <h2 class="mt-5">Blogger</h2>
      <LoginForm @login="enterBlog" />
      <p>
        No Account yet? <span @click="showLogin = false">Signup</span> instead
      </p>
    </div>
    <div class="form" v-else>
      <h2 class="mt-5">Blogger</h2>
      <SignupForm @signup="enterBlog" />
      <p>
        Already registered?
        <span @click="showLogin = true">Login</span> instead
      </p>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  components: { SignupForm, LoginForm, Navbar },
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
  text-align: center;
  padding: 20px 0;
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
.welcome button {
  margin: 20px auto;
}
.form {
  margin-top: 100px;
}
</style>
