<template>
  <div class="topnav">
    <h1>{{this.componentName}}</h1>
    <div id="logoutButton">
      <Logout />
    </div>
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

h1 {
  background-color: #f07575;
  margin-left: 100px;
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
}

.topnav {
  background-color: #f07575;
  width: 100%;
  height: 65px;
  display: flex;
}

#logoutButton {
  margin-right: 10px;
  margin-left: auto;
  margin-bottom: 0;
  margin-top: auto
}

</style>