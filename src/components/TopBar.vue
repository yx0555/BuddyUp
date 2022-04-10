<template>
  <div class="topnav">
    <h1>{{this.componentName}}</h1>
    <Logout />
  </div>
</template>

<script>
import Logout from "./Logout.vue";
export default {
  props: ["componentName"],
  name: "NavBar",

  components: {
    Logout,
  },

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

.topnav {
  background-color: #f07575;
  text-align: right;
  width: 100%;
  height: 65px;
}

h1{
  font-family: "Montserrat";
  text-align: center;
  background-color:#f07575;
}
</style>