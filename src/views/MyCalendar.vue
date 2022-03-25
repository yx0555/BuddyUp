<template>
  <div class="page" style="text-align: center" v-if="user">
    <NavBar />
    <SideBar />
    <h1>My Calendar Page</h1>
  </div>
  <!-- <div id="app"></div> -->
  <!-- <div class = "calendar">
    <FullCalendar :options="calendarOptions" />
  </div> -->

</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideBar from "../components/SideBar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import '@fullcalendar/core/vdom';
// import FullCalendar from '@fullcalendar/vue';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';

export default {
  name: "MyCalendar",

  components: {
    NavBar,
    SideBar,
    // FullCalendar
  },

  data() {
    return {
      user: false,
    };
    // return {
    //   calendarOptions: {
    //     plugins: [ dayGridPlugin, interactionPlugin ],
    //     initialView: 'dayGridMonth',
    //   }
    // }
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        alert("you must be logged in to view this page")
        this.$router.push("/")
      }
    });
  },
};
</script>

<style scoped>
.page {
  margin-left: 200px;
}

body {
  margin: 0;
}



</style>