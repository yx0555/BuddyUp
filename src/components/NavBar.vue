<template>
    <div class="topnav">
      <!-- <div class="topnav-left">
        <img id="logo" src="@/assets/BuddyUpLogo.png" alt="Logo" />
      </div> -->
        <Logout />
    </div>
</template>

<script>
import Logout from "./Logout.vue";
export default {
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

</style>