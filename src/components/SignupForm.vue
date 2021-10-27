<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-group input-group-lg">
      <input
        type="text"
        class="form-control shadow-none"
        required
        placeholder="display name"
        v-model="displayName"
      />
    </div>
    <div class="input-group input-group-lg">
      <input
        type="email"
        class="form-control shadow-none"
        required
        placeholder="email"
        v-model="email"
      />
    </div>
    <div class="input-group input-group-lg">
      <input
        type="password"
        class="form-control shadow-none"
        required
        placeholder="password"
        v-model="password"
      />
    </div>
    <div class="error">
      {{ error }}
    </div>
    <button class="btn btn-info">Signup</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "../composable/useSignup";
export default {
  setup(props, context) {
    const { error, signup } = useSignup();
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        context.emit("signup");
      }
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>

<style scoped>
button {
  min-width: 260px;
}
</style>
