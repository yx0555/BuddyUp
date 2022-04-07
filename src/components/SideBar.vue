<template>
  <body>
    <div class="sidebar">
      <ul>
        <img id="logo" src="@/assets/BuddyUpLogo.png" alt="Logo" />
      </ul>
      <ul>
        <img id="homepageIcon" src="@/assets/homepageicon.png" alt="homepage" />
        <button id="homepagebtn" @click="goToHome()">Homepage</button>
      </ul>
      <ul>
        <img id="profileIcon" src="@/assets/profileicon.png" alt="profile" />
        <button id="myprofilebtn" @click="goToProfile()">My Profile</button>
      </ul>
      <ul>
        <img id="buddiesIcon" src="@/assets/buddiesicon.png" alt="buddies" />
        <button id="mybuddiesbtn" @click="goToMyBuddies()">My Buddies</button>
      </ul>
      <ul>
        <img id="calendarIcon" src="@/assets/calendaricon.png" alt="calendar" />
        <button id="mycalendarbtn" @click="goToMyCalendar()">
          My Calendar
        </button>
      </ul>
      <ul>
        <img id="aboutUsIcon" src="@/assets/aboutusicon.png" alt="aboutus" />
        <button id="aboutusbtn" @click="goToAboutUs()">About Us</button>
      </ul>
    </div>
  </body>
</template>

<script>
export default {
  name: "SideBar",
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    goToMyBuddies() {
      this.$router.push("/mybuddies");
    },
    goToMyCalendar() {
      this.$router.push("/mycalendar");
    },
    goToAboutUs() {
      this.$router.push("/aboutus");
    },
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

.sidebar {
  background-color: #f09797;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 210px;
  height: 100%;
  text-align: left;
}

#homepagebtn, #myprofilebtn, #mybuddiesbtn, #mycalendarbtn, #aboutusbtn { 
  background-color: #f09797;
  border: none;
  color: #411d1d;
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  font-family: "Barlow", sans-serif;
}

#homepagebtn:hover, #myprofilebtn:hover, #mybuddiesbtn:hover, #mycalendarbtn:hover, #aboutusbtn:hover {
  font-weight: bold;
}

#homepageIcon, #profileIcon, #buddiesIcon, #calendarIcon, #aboutUsIcon {
  float: left;
  max-width: 30px;
  max-height: 30px;
}

ul{
  margin: 30px 0;
}

</style>
