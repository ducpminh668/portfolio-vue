<template>
<div class="loading-spinner vertical-align">
  <div class="lds-facebook">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
</template>

<script >
export default {
  name: 'loading-spinner',
  mounted() {
    document.documentElement.style.overflow = 'hidden';
  },
  destroyed() {
    document.documentElement.style.overflow = 'auto';
  },
};
</script>
