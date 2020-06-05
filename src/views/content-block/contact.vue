<template>
  <div id="contact">
    <div class="contact-content page-padding">
      <div class="header">
          <h2 class="title">Get in Touch</h2>
          <UpDownBtn
            :upBlock="'portfolio'"
            :downBlock="'footer'" />
      </div>
      <div class="contact-block">
        <p class="title">Please feel free to contact me if you need any further information.</p>
        <div class="contact-links">
          <div
          v-for="(item, index) in contactItem"
          :key="index"
          class="contact-links__item">
            <a :href="(isMobile ? item.href : 'javascript:void(0)')">
              <span class="material-icons">{{item.icon}}</span>
              <p>
                {{item.content}}
              </p>
            </a>
          </div>
        </div>
      </div>
      <div class="email-block__header">
        <p class="title">Or send me direct message</p>
        <span
        class="material-icons"
        :class="{'hide-panel' : showEmail}"
        @click="showEmailPanel"
        v-if="isMobile">
          arrow_drop_down
        </span>
      </div>

      <transition name="slide-down" mode="out-in">
      <div class="email-block" v-if="(!isMobile || showEmail)">
        <div class="row">
          <div class="col-md-6">
            <div class="email-block__item">
              <label class="title">Name*</label>
              <input
              type="text"
              name="name"
              class="text-input"
              :class="{'error': (formErr.length > 0 && checkErr('Name'))}"
              v-model="directMessage.name"
              />
            </div>
            <div class="email-block__item">
              <label class="title">Email*</label>
              <input
              type="text"
              name="email"
              class="text-input email"
              :class="{'error': (formErr.length > 0 && checkErr('address'))}"
              v-model="directMessage.email"
              />
            </div>
            <div class="email-block__item">
              <label class="title">Subject</label>
              <input
              type="text"
              name="subject"
              class="text-input"
              v-model="directMessage.subject"
              />
            </div>
          </div>
          <div class="col-md-6 lp5">
            <div class="email-block__item">
              <label class="title">Message*</label>
              <textarea
              name="message"
              class="text-area"
              :class="{'error': (formErr.length > 0 && checkErr('content'))}"
              v-model="directMessage.content"
              ></textarea>
            </div>
          </div>

          <transition name="slide-down" mode="in-out">
          <div
          class="email-noti"
          v-if="formErr.length > 0">
            <span
            v-for="(err, index) in formErr"
            :key="index">
              {{err}}
            </span>
          </div>
          </transition>

          <div class="btn-block">
            <div>
              <input
                type="reset"
                value="Clear Message"
                name="reset"
                class="btn btn-clear"
                @click="clearTextbox"
              />
            </div>
            <div>
              <input
                type="submit"
                value="Send Message"
                name="submit"
                class="btn btn-submit"
                :class="{'error' :isError}"
                @click="formValidate"
              />
            </div>
          </div>
        </div>
      </div>
      </transition>

      <div
      class="bottom-card vertical-align"
      v-if="(!showEmail && isMobile)"
      @click="showEmailPanel">
        <p>Tap here to open email sending form</p>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import store from '@/store';
import constant from '@/constant';

export default {
  name: 'Contact',
  components: {
    UpDownBtn: () => import('@/components/up-down.vue'),
  },
  data() {
    return {
      showEmail: false,
      isError: false,
      formErr: [],
      directMessage: {
        name: '',
        email: '',
        subject: '',
        content: '',
      },
    };
  },
  computed: {
    isMobile() {
      return store.state.isMobile;
    },
    contactItem() {
      return constant.contactItem;
    },
  },
  methods: {
    formValidate(e) {
      if (this.directMessage.name
       && this.directMessage.email
       && this.validEmail(this.directMessage.email)
       && this.directMessage.content) {
        this.sendMessage();
        this.isError = false;
      }

      this.isError = true;
      this.formErr = [];

      if (!this.directMessage.name) {
        this.formErr.push('Name required!');
      }
      if (!this.directMessage.email) {
        this.formErr.push('Email address required!');
      } else if (!this.validEmail(this.directMessage.email)) {
        this.formErr.push('Valid email address required.');
      }
      if (!this.directMessage.email) {
        this.formErr.push('Email content required!');
      }
      e.preventDefault();
    },
    validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sendMessage() {
      const serviceId = 'gmail';
      const templateId = 'template_6tzrBLEy';
      const userId = 'user_iN8gsQFj7PKzAV3d6fdFK';

      const data = {
        template_params: {
          from_name: this.directMessage.name,
          from_email: this.directMessage.email,
          subject: this.directMessage.subject,
          message: this.directMessage.content,
        },
      };

      emailjs.send(serviceId, templateId, data, userId)
        .then(() => {
          this.$emit('sendNoti', '<h4>Thank you!</h4><p>Your message has been successfully sent. </p><p>I will contact you very soon!</p>');
          this.clearEmail();
        })
        .catch(() => {
          this.$emit('sendNoti', '<h4>Oops! Some errors occured.</h4><p>Please try again later!</p>');
        });
    },
    showEmailPanel() {
      this.showEmail = !this.showEmail;
    },
    clearEmail() {
      this.directMessage.content = '';
      this.directMessage.subject = '';
      this.directMessage.name = '';
      this.directMessage.email = '';
    },
    clearTextbox() {
      this.directMessage.content = '';
    },
    checkErr(str) {
      const index = this.formErr.findIndex((item) => item.includes(str));
      if (index > -1) {
        return true;
      }
      return false;
    },
  },
};
</script>
