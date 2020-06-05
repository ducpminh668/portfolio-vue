<template>
  <div class="view-block">
    <div class="block-content page-padding">
      <div class="header">
        <h2 class="title">{{ title }}</h2>
        <slot name="header-function"></slot>
        <UpDownBtn
          :isEnd="isEnd"
          :upBlock="upBlock"
          :downBlock="downBlock" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import UpDownBtn from './up-down.vue';

export default {
  name: 'view-block',
  components: {
    UpDownBtn,
  },
  props: {
    title: String,
    upBlock: String,
    downBlock: String,
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
