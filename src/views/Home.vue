<template>
  <div v-hammer:swipe.horizontal="setToggle">

    <VerticalNavbar
      v-bind:class="{ 'active mobile-view hide': isMobile, '': !isMobile}"
      :showFollow="showFollow"
      @goIntoView="showFollow = false"
      @showFollow="openFollow"/>

    <HorizontalNavbar
      v-if="isMobile"/>

    <div
      id="content-container"
      v-bind:class="{ 'navbar-active': (isNavbarActive && !isMobile), 'mobile-view': isMobile}">

      <HomeBlock @expand="goDown"/>

      <About />

      <Portfolio
      @openMessage="openNotiBox"
      @openDetail="openDetailPanel"/>

      <Contact
      @sendNoti="openNotiBox"/>

      <Footer />

      <transition name="fade" mode="out-in">
        <FollowOverlay
          v-if="showFollow"
          @closeOverlay="showFollow = !showFollow"/>
      </transition>

      <transition name="fadeScale" mode="out-in">
        <Notification
        v-if="showNoti"
        :message="notiMessage"
        @closeNoti="showNoti = !showNoti"
        />
      </transition>

      <transition name="slide-left" mode="out-in">
        <ProjectDetail
          v-if="showDetail"
          :project="project"
          @closePanel="closePanel"/>
      </transition>

    </div>
    <FixedFooter v-if="isMobile" />
  </div>
</template>

<script>
import store from '@/store';
import constant from '@/constant';
import { VueHammer } from 'vue2-hammer';
import bg from '@/assets/images/backgrounds/page-background.jpg';

VueHammer.config.swipe = {
  direction: 'horizontal',
};


export default {
  name: 'Home',
  components: {
    VerticalNavbar: () => import('@/components/navbar/vertical-navbar.vue'),
    HorizontalNavbar: () => import('@/components/navbar/horizontal-navbar.vue'),
    FixedFooter: () => import('@/components/fixed-footer.vue'),

    HomeBlock: () => import('./content-block/home-block.vue'),
    About: () => import('./content-block/about.vue'),
    Portfolio: () => import('./content-block/portfolio.vue'),
    Contact: () => import('./content-block/contact.vue'),
    Footer: () => import('./content-block/footer.vue'),

    FollowOverlay: () => import('./follow-overlay.vue'),
    ProjectDetail: () => import('./project-detail.vue'),
    Notification: () => import('@/components/notification.vue'),
  },
  data() {
    return {
      showFollow: false,
      showNoti: false,
      project: {},
      notiMessage: '',
    };
  },
  computed: {
    isNavbarActive() {
      return store.state.isActive;
    },
    isMobile() {
      return store.state.isMobile;
    },
    showDetail() {
      return store.state.showDetail;
    },
    followList() {
      return constant.followConst;
    },
    isToggle() {
      return store.state.isToggle;
    },
  },
  methods: {
    goDown() {
      this.$scrollTo('#about', { offset: this.isMobile ? -200 : -70 });
    },
    openFollow() {
      this.showFollow = !this.showFollow;
    },
    openDetailPanel(project) {
      if (this.isToggle) store.commit('isToggle');
      this.project = project;
      store.commit('showDetail');
    },
    closePanel() {
      store.commit('showDetail');
    },
    openNotiBox(str) {
      this.showNoti = true;
      this.notiMessage = str;
    },
    setToggle(e) {
      const swipe = e.type;
      if (this.isMobile) {
        swipe === 'swiperight'
          ? store.commit('setToggle', true)
          : store.commit('setToggle', false);
      }
    },
    setBackgroundImage() {
      const str = `url(${bg})`;
      console.log(str);
      document.body.style.backgroundImage = str;
    },
  },
  created() {
    this.setBackgroundImage();
  },
  mounted() {
    this.$nextTick(() => store.commit('checkLoading', false));
  },
  destroyed() {
    store.commit('checkLoading', true);
  },
};
</script>
