<template>
  <div
  class="horizontal-navbar navbar"
  v-bind:class="{'scroll-navbar': isScroll}">
    <a class="vertical-align" href="javascript:void(0)">
      <img
        class="logo hover-invert"
        src="../../assets/images/logo.png"
        height="60"
        width="110"
        alt
        @click="scrollTop"
      />
    </a>
    <button
    type="button"
    @click="toggleMenu"
    class="toggle-btn">
      <span
      :class="{'toggled': isToggle}"
      class="material-icons">
        keyboard_arrow_down
      </span>
    </button>
  </div>
</template>
<script>
import store from '@/store';
import constant from '@/constant';

export default {
  name: 'HorizontalNavbar',
  data() {
    return {
      isScroll: false,
    };
  },
  computed: {
    navList() {
      return constant.navListArray;
    },
    isToggle() {
      return store.state.isToggle;
    },
  },
  methods: {
    scrollTop() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        this.$scrollTo('#app', 400);
      }
    },
    toggleMenu() {
      store.commit('isToggle');
    },
  },
  created() {
    window.addEventListener('scroll', () => {
      const offsetTop = window.pageYOffset;
      if (offsetTop > 0) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    });
  },
};
</script>
