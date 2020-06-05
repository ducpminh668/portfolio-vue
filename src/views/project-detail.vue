<template>
  <div id="project-detail"
  v-if="project"
  v-hammer:swipe.right="closePanel"
  >
    <div class="close-panel">
      <span
      id="project-detail-close-chevron"
      class="material-icons"
      @click="closePanel">
        chevron_right
      </span>
    </div>

    <div class="project-detail-content">
      <img src="../assets/images/box.png" height="180" width="220" alt />
    <div class="project-detail-info">
      <table>
        <tr>
          <th>Name:</th>
          <th>{{project.name}}</th>
        </tr>
        <tr>
          <th>Type:</th>
          <th>{{project.language}}</th>
        </tr>
        <tr>
          <th>Forks Count:</th>
          <th>{{project.forks_count}}</th>
        </tr>
        <tr v-if="project.owner">
          <th>Owner:</th>
          <th>{{project.owner.login}}</th>
        </tr>
        <tr>
          <th>Created at:</th>
          <th>{{project.created_at | formatDate}}</th>
        </tr>
      </table>
      <div class="detail-btn-block">
        <input
          type="submit"
          value="Go to Project"
          class="btn btn-goto"
          @click="toProject(project.html_url)"
        />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ProjectDetail',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toProject(url) {
      window.location.href = url;
    },
    closePanel() {
      this.$emit('closePanel');
    },
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
      return null;
    },
  },
  mounted() {
    document.documentElement.style.overflow = 'hidden';
  },
  destroyed() {
    document.documentElement.style.overflow = 'auto';
  },
};
</script>
