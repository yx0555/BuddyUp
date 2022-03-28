<template>
    <body>
        <div class="sidebar">
            <ul>
                <img id="logo" src="@/assets/BuddyUpLogo.png" alt="Logo" />
            </ul>
            <ul>
                <button id="homepagebtn" @click="goToHome()">Homepage</button>
            </ul>
            <ul>
                <button id="myprofilebtn" @click="goToProfile()" >My Profile</button>
            </ul>
            <ul>
                <button id="mybuddiesbtn" @click="goToMyBuddies()">My Buddies</button>
            </ul>
            <ul>
                <button id="mycalendarbtn" @click="goToMyCalendar()">
                    My Calendar
            </button>
            </ul>
            <ul>
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
}
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");


.sidebar {
    background-color: #ffffff;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 225px;
    height: 100%;
    text-align: left;
}

#myprofilebtn {
    background-color: #ffffff;
    border: none;
    color: #000000;
    font-size: 15px;
    text-decoration: underline;
    font-family: "Barlow", sans-serif;
}

#myprofilebtn:hover {
    font-weight: bold;
}

#homepagebtn {
    background-color: #ffffff;
    border: none;
    color: #000000;
    font-size: 15px;
    text-decoration: underline;
    font-family: "Barlow", sans-serif;
}

#homepagebtn:hover {
    font-weight: bold;
}

#mybuddiesbtn {
    background-color: #ffffff;
    border: none;
    color: #000000;
    font-size: 15px;
    text-decoration: underline;
    font-family: "Barlow", sans-serif;
}

#mybuddiesbtn:hover {
    font-weight: bold;
}

#mycalendarbtn {
    background-color: #ffffff;
    border: none;
    color: #000000;
    font-size: 15px;
    text-decoration: underline;
    font-family: "Barlow", sans-serif;
}

#mycalendarbtn:hover {
    font-weight: bold;
}

#aboutusbtn {
    background-color: #ffffff;
    border: none;
    color: #000000;
    font-size: 15px;
    text-decoration: underline;
    font-family: "Barlow", sans-serif;
}

#aboutusbtn:hover {
    font-weight: bold;
}

</style>
