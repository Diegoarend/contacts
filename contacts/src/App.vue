<template>
  <Topbar/>
  <router-view/>
</template>

<script>
import Topbar from '@/components/Topbar.vue'
export default {
  components: {
   Topbar
  },
}
</script>
<style>


@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');

*,
*:after,
*:before {
  box-sizing: border-box;
}

html {
  font-size: 10px;
}

body {
  padding-top: 60px;
  font-family: 'Open Sans', sans-serif;
  background-color: #F8F9FB;
  color: #000;
}


.app {
  width: 100%;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
}

h3 {
  font-size: 1.6em;
}


.container {
  max-width: 100%;
  width: 960px;
  margin: 0px auto;
}


@media screen and (max-width: 0px) {
  h3 {
    font-size: 1.3em;
  }
}

</style>
