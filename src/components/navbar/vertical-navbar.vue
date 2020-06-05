<template>
  <div
  v-bind:class="{ 'active': isActive, 'show': (isToggle && isMobile)}"
  class="vertical-navbar">
    <img
      class="logo hover-invert"
      @click="activeNavbar"
      src="../../assets/images/logo.png"
      height="60"
      width="110"
      alt
    />
    <ul class="nav-menu">
      <li
        class="vertical-align"
        v-for="(item, index) in navList"
        :key="index"
        v-bind:class="{ 'pos-current': currentPos === index}"
        @click="goIntoView(item.part)"
      >
        <span class="material-icons">{{item.icon}}</span>
        <span class="item-name">{{item.name}}</span>
        <span class="tooltiptext">{{item.name}}</span>
      </li>
      <li
      class="vertical-align"
      v-bind:class="{ 'pos-current': currentPos === 5}"
      @click="openFollow">
        <span class="material-icons">favorite</span>
        <span class="item-name">Follow</span>
        <span class="tooltiptext">Follow Me</span>
      </li>
    </ul>
  </div>
</template>
<script>
import store from '@/store';
import constant from '@/constant';

export default {
  name: 'VerticalNavbar',
  props: {
    showFollow: Boolean,
  },
  data() {
    return {
      current: 0,
    };
  },
  computed: {
    navList() {
      return constant.navListArray;
    },
    isActive() {
      return store.state.isActive;
    },
    isToggle() {
      return store.state.isToggle;
    },
    isMobile() {
      return store.state.isMobile;
    },
    showDetail() {
      return store.state.showDetail;
    },
    isShowFollow() {
      return this.showFollow;
    },
    currentPos() {
      return this.current;
    },
  },
  methods: {
    goIntoView(item) {
      if (this.showDetail) store.commit('showDetail');
      this.$scrollTo(`#${item}`, 400);
      this.$emit('goIntoView');
      store.commit('isToggle');
    },
    activeNavbar() {
      store.commit('checkActive');
    },
    toggleMenu() {
      store.commit('isToggle');
    },
    openFollow() {
      this.$emit('showFollow');
      store.commit('isToggle');
    },
    detectBlock() {
      const offset = (this.isMobile ? (window.pageYOffset + 130) : (window.pageYOffset + 70));
      const about = document.getElementById('about').offsetTop;
      const portfolio = document.getElementById('portfolio').offsetTop;
      const contact = document.getElementById('contact').offsetTop;

      if (offset < about) this.current = 0;
      if (offset >= about) this.current = 1;
      if (offset >= portfolio) this.current = 2;
      if (offset >= contact) this.current = 3;
    },
    setToggle() {
      if (this.isMobile) {
        store.commit('setToggle', false);
      }
    },
  },

  mounted() {
    window.addEventListener('scroll', () => {
      this.detectBlock();
    });
  },
  watch: {
    isShowFollow() {
      !this.isShowFollow ? this.detectBlock() : this.current = 5;
    },
  },
};
</script>
