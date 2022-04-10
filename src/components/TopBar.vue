<template>
  <div class="topnav">
    <!-- <div class="topnav-left">
        <img id="logo" src="@/assets/BuddyUpLogo.png" alt="Logo" />
      </div> -->
      <h1> test {{ this.pageName }} </h1>
    <div id="logoutButton">
      <Logout />
    </div>
  </div>
</template>

<script>
import Logout from "./Logout.vue";
export default {
  name: "NavBar",
  props: ["page"],

  components: {
    Logout,
  },

data() {
    return {
      pageName: "",
    };
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

#logoutButton {
  margin-right: 10px;
  margin-left: auto;
}

</style>