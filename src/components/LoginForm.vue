<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-group input-group-sm mb-3">
    <input class="form-control" type="email" placeholder="Enter email" required v-model="email">
    </div>
    <div class="input-group input-group-sm mb-3">
    <input class="form-control" type="password" placeholder="Enter password" required v-model="password">
    </div>
    <div>{{error}}</div>
    <button type="button" class="btn btn-info p-2 px-5">Login</button>
  </form>
</template>

<script>
import {ref} from '@vue/reactivity'
import loginUser from '../composable/loginUser'
export default {
  setup(props, context) {
    const email = ref('')
    const password = ref('')

    const { error, login} = loginUser()

    const handleSubmit = async () => {
      await login(email.value, password.value)
      if (!error.value){
        context.emit('Login')
      }
    }

    return {email, password, handleSubmit, error}
  }
};
</script>
<style></style>
