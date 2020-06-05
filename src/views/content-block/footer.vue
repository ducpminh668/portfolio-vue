<template>
  <footer
  id="footer"
  class="footer vertical-align row">
    <div class="col-lg-9 col-xl-9 footer-content">
      <p>© 2020 Tamanh Vu. All rights reserved.</p>
    </div>
    <div class="col-lg-3 col-xl-3 footer-btn">
      <Follow />
      <UpDownBtn
        :isEnd="true"
        :upBlock="'home'"/>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {
    UpDownBtn: () => import('@/components/up-down.vue'),
    Follow: () => import('@/components/follow.vue'),
  },
};
</script>
