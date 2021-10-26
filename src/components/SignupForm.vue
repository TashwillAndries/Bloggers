<template>
  <Navbar />
  <form @click.prevent="handleSubmit">
    <div class="input-group input-group-sm mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Display Name"
        v-model="displayName"
      />
    </div>
    <div class="input-group input-group-sm mb-3">
      <input
        type="email"
        class="form-control"
        placeholder="Email"
        v-model="email"
      />
    </div>
    <div class="input-group input-group-sm mb-3">
      <input
        type="password"
        class="form-control"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <button type="button" class="btn btn-info p-2 px-5">Signup</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import Navbar from "../components/Navbar.vue";
import useSignup from "../composable/useSignup";
export default {
  components: { Navbar },
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

<style></style>
