<template>
  <div class="page-404 vertical-align">
    <h1>Oops!</h1>
    <h2>Are you lost ?!!</h2>
    <h2>It's dangerous out here!</h2>
    <h2>
      Go back to
      <router-link :to="{ name: 'home'}">Home page</router-link>
      now!
    </h2>
    <img class="img-fluid" src="@/assets/images/astronaut.png" height="300" width="300" alt />
  </div>
</template>

<script >
import store from '../store';

export default {
  mounted() {
    this.$nextTick(() => store.commit('checkLoading', false));
  },
  destroyed() {
    store.commit('checkLoading', true);
  },
};
</script>
