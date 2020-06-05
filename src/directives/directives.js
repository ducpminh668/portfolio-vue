import Vue from 'vue';

/* eslint-disable no-param-reassign */
Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    el.eventSetDrag = function eventSetDrag() {
      el.setAttribute('data-dragging', 'yes');
    };
    el.eventClearDrag = function eventSetDrag() {
      el.removeAttribute('data-dragging');
    };
    el.eventOnClick = function eventOnClick(event) {
      const dragging = el.getAttribute('data-dragging');
      if (!(el === event.target || el.contains(event.target)) && !dragging) {
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener('touchstart', el.eventClearDrag);
    document.addEventListener('touchmove', el.eventSetDrag);
    document.addEventListener('click', el.eventOnClick);
    document.addEventListener('touchend', el.eventOnClick);
  },
  unbind(el) {
    document.removeEventListener('touchstart', el.eventClearDrag);
    document.removeEventListener('touchmove', el.eventSetDrag);
    document.removeEventListener('click', el.eventOnClick);
    document.removeEventListener('touchend', el.eventOnClick);
    el.removeAttribute('data-dragging');
  },

  stopProp(event) { event.stopPropagation(); },
});
/* eslint-enable no-param-reassign */
