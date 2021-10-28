<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-group input-group-lg">
      <input type="email" required placeholder="email" v-model="email" class="form-control shadow-none">
    </div>
    <div class="input-group input-group-lg">
      <input type="password" required placeholder="password" v-model="password" class="form-control shadow-none">
    </div>
    <div class="error">
      {{ error }}
    </div>
    <button class="btn btn-success p-2 px-5">Login</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "../composable/useLogin";
export default {
  setup(props, context) {
    const email = ref("");
    const password = ref("");

    const { error, login } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        context.emit("login");
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style scoped>
button {
  width: 260px;
}
</style>
