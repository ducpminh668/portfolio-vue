<template>
  <div id="home">
    <div class="vertical-align home-content">
      <h1>Hello! This is Duc Pham</h1>
      <h2>Fullstack Developer, specializing in Laravel, MySQL, NoSQL, ReactJS, React Native</h2>
    </div>
    <div class="expand-sector">
      <span class="material-icons" @click="$emit('expand')">expand_more</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBlock',
};
</script>
