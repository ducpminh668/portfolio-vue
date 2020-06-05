<template>
  <div id="app">

    <transition name="fade" mode="in-out">
      <LoadingSpinner v-if="isLoading" />
    </transition>

    <transition name="slow-fade" mode="out-in">
      <router-view />
    </transition>

  </div>
</template>

<script>
import LoadingSpinner from '@/components/loading-spinner.vue';
import store from './store';

export default {
  name: 'App',
  components: {
    LoadingSpinner,
  },
  computed: {
    isLoading() {
      return store.state.isLoading;
    },
    isMobile() {
      return store.state.isMobile;
    },
  },
  methods: {
    checkScreen() {
      if (window.innerWidth < 420) {
        store.commit('isMobile', true);
      } else {
        store.commit('isMobile', false);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.checkScreen);
    });
  },
  created() {
    this.checkScreen();
  },
};

</script>
