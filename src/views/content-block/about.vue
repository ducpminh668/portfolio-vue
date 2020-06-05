<template>
  <div id="about">
    <ViewBlock
    class="about-content"
    :title="'About me'"
    :upBlock="'home'"
    :downBlock="'portfolio'">
      <div class="personal-statement">
        <div class="personal-infor">
          <!-- eslint-disable max-len -->
          <p>
            I was late 2 years started at university but “better late than never”, I am trying my best and will do anything to reach the goal.
          </p>
          <p>
            I've worked as a bartender for 5 years, may sound irrelevant but it helps me expanding myself with soft skills, creative and self-developing.
          </p>
          <p>
            Also, I am able to work in an English-speaking environment and with foreign experts. Willing to learn is my advantage, besides, I can work under pressure and meet the deadline.
          </p>
          <p>
            Overall, I consider myself to be a hardworking, ambitious one who is motivated by challenges, can gain personal benefit from new experiences, and I am always open to new chances.
          </p>
          <!-- eslint-enable max-len -->
        </div>
        <div class="personal-img">
          <img class="img-fluid" width="250" height="250" src="@/assets/images/avatar2.jpg" />
        </div>
      </div>
      <div class="download-btn-block">
        <a
          href="https://drive.google.com/file/d/1hJBiwx8RAknytWgJYXT5MFcRBv0ehMbn/view?usp=sharing"
          class="btn btn-download"
          >Download My CV</a>
      </div>
      <div class="about-detail-block">
        <div class="block__header">
          <h3>My skill set:</h3>
          <span
          class="material-icons"
          :class="{'hide-panel' : showSkillSet}"
          @click="showSkillSetPanel"
          v-if="isMobile">
            arrow_drop_down
          </span>
        </div>
        <transition name="slide-down" mode="in-out">
        <div class="skill-set" v-if="(showSkillSet || !isMobile)">
          <div
          v-for="(sector, index) in skillSet"
          :key="index"
          class="skill-set__item">
            <h4>{{ sector.name }}</h4>
            <div class="item-details">
              <p
              v-for="(item, index) in sector.item"
              :key="index">
                {{ item }}
              </p>
            </div>
          </div>
        </div>
        </transition>
        <div
        class="bottom-card vertical-align"
        v-if="(!showSkillSet && isMobile)"
        @click="showSkillSetPanel">
          <p>Tap here to see my skill set</p>
        </div>
      </div>
      <div class="about-detail-block">
        <div class="block__header">
          <h3>My timeline</h3>
          <span
          class="material-icons"
          :class="{'hide-panel' : showTimeline}"
          @click="showTimelinePanel"
          v-if="isMobile">
            arrow_drop_down
          </span>
        </div>
        <transition name="slide-down" mode="in-out">
          <div v-if="(showTimeline || !isMobile)">
            <Timeline />
          </div>
        </transition>
        <div
        class="bottom-card vertical-align"
        v-if="(!showTimeline && isMobile)"
        @click="showTimelinePanel">
          <p>Tap here to see my timeline</p>
        </div>
      </div>
    </ViewBlock>
  </div>
</template>

<script>
import store from '@/store';
import constant from '@/constant';

export default {
  name: 'About',
  components: {
    ViewBlock: () => import('@/components/view-block.vue'),
    Timeline: () => import('@/components/timeline.vue'),
  },
  data() {
    return {
      showSkillSet: false,
      showTimeline: false,
    };
  },
  computed: {
    isMobile() {
      return store.state.isMobile;
    },
    skillSet() {
      return constant.skillSet;
    },
  },
  methods: {
    showSkillSetPanel() {
      this.showSkillSet = !this.showSkillSet;
    },
    showTimelinePanel() {
      this.showTimeline = !this.showTimeline;
    },
  },
};
</script>
