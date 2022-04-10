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

h1 {
  background-color: #f07575;
  margin-left: 100px;
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
}

.topnav {
  background-color: #f07575;
  text-align: right;
  width: 100%;
  height: 65px;
  display: flex;
}

<<<<<<< HEAD
h1{
  font-family: "Montserrat";
  text-align: center;
  background-color:#f07575;
}
=======
#logoutButton {
  margin-right: 10px;
  margin-left: auto;
}

>>>>>>> e2f2a4eb19071ff13c36b48c3bfb94a0ab519b9c
</style>