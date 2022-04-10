<template>
  <div class="page" style="text-align: center" v-if="user">
  <TopBar :componentName="componentName"/>
  <SideBar />
      <!-- <h1>My Calendar Page</h1> -->
    <div class="calendar" style="text-align: center" v-if="user">
      <Calendar />
    </div>
    <div v-else>
      <h1>You must be logged in to view this page</h1>
      <Login />
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import SideBar from "../components/SideBar.vue";
import Login from "../components/Login.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Calendar from "../components/Calendar.vue";

export default {
  name: "MyCalendar",

  components: {
    TopBar,
    SideBar,
    Login,
    Calendar,
  },

  data() {
    return {
      user: true,
      loading: false,
       componentName: "My Calendar"
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = false;
      }
    });
  },
};
</script>

<style scoped>
.page {
  margin-left: 200px; 
  background-color: #fff8f8;
  width: auto;
  height: 100vh;
}

.calendar {
  margin-left: 20px;
}

body {
  margin: 0;
}
</style>