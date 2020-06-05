<template>
  <div class="up-down-btn">
    <span class="material-icons" @click="goTo(upBlock)">keyboard_arrow_up</span>
    <span
    class="material-icons"
    v-if="!isEnd"
    @click="goTo(downBlock)">
      keyboard_arrow_down
    </span>
  </div>
</template>

<script>

export default {
  name: 'UpDownBtn',
  props: {
    upBlock: String,
    downBlock: String,
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    upBlockCom() {
      return this.upBlock;
    },
  },
  methods: {
    goTo(block) {
      this.$scrollTo(`#${block}`);
    },
  },
};
</script>
