<template>
  <nav class="navbar navbar-expand-lg py-3 fixed-top">
    <div class="container">
      <a href="#" class="navbar-brand text-dark">Bloggers</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Login' }"
              class="nav-link login-link text-dark"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Signup' }"
              class="nav-link signup-link text-dark"
              >Signup</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-link.login-link {
  padding: 5px 10px;
  background: green;
  margin-right: 25px;
}

.nav-link.signup-link {
  padding: 5px 10px;
  background: blue;
}
</style>
