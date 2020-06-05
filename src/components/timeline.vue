<template>
  <div id="timeline">
      <div class="timeline-wrapper">
        <div class="timeline-events">
          <ul>
            <li
              class="timeline-item"
              v-for="(item, index) in timeline"
              :key="index"
              :class="{ 'active-timestamp': activeTimestamp >= index }"
            >
              <span class="number">{{index + 1}}</span>
              <div class="content">
                <h2>{{item.date | formatDate}}</h2>
                <div class="item-detail">
                  <p>{{item.position}}</p>
                  <p>{{item.name}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
import constant from '@/constant';

export default {
  name: 'timeline',
  data() {
    return {
      activeTimestamp: 0,
    };
  },
  computed: {
    timeline() {
      return constant.timeline.sort((a, b) => a.date - b.date);
    },
  },
  methods: {
    isScrolledIntoView(el) {
      const parent = document.getElementsByClassName('timeline-wrapper')[0];
      const rect = el.getBoundingClientRect();
      const elemTop = rect.top;
      const elemBottom = rect.bottom;
      const parentRect = parent.getBoundingClientRect();
      const parentTop = parentRect.top;
      const parentBottom = parentRect.bottom;

      return (elemTop >= parentTop) && (elemBottom <= parentBottom);
    },
    checkElementInParent() {
      const items = document.getElementsByClassName('timeline-item');
      items.forEach((el, index) => {
        const visible = this.isScrolledIntoView(el);
        if (visible) this.activeTimestamp = index;
      });
    },
  },
  mounted() {
    const wrapper = document.getElementsByClassName('timeline-wrapper')[0];
    wrapper.addEventListener('scroll', () => { this.checkElementInParent(); });
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(value).format('MM/YYYY');
      }
      return null;
    },
  },
};
</script>
