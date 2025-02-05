<template>
    <div>
      <h1>Hello Vue 3 with Webpack!</h1>
      <HelloWorld />
    </div>
  </template>
  
  <script>
  import HelloWorld from './components/HelloWorld.vue';
  
  export default {
    components: {
      HelloWorld
    }
  };
  </script>
  
  <style>
  h1 {
    color: #42b983;
  }
  </style>
  