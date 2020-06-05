<template>
  <ul class="social">
    <li
    v-for="(item, index) of followList"
    :key="index"
    class="icon">
      <a :href="item.href"><i :class="'fa ' + item.icon"></i></a>
    </li>
  </ul>
</template>

<script>
import constant from '../constant';

export default {
  name: 'Follow',
  computed: {
    followList() {
      return constant.followConst;
    },
  },
};
</script>

<style>

</style>
