<template>
    <body>
        <div class="topnav">
            <div class="topnav-left">
                <img id = "logo" src="./assets/BuddyUpLogo.png" alt="Logo">
            </div>
            <div class="topnav-right">
                <img id = "usericon" src="./assets/man.png" alt="usericon">
                <button id="myprofilebtn">My Profile</button><br>
                <button id="logoutbtn">Logout</button>
            </div>
        </div>

        <div class="sidebar">
            <ul><button id="homepagebtn">Homepage</button></ul>
            <ul><button id="mybuddiesbtn">My Buddies</button></ul>
            <ul><button id="mycalendarbtn">My Calendar</button></ul>
            <ul><button id="aboutusbtn">About Us</button></ul>
        </div>
    </body>
</template>

<script>
export default {
    name: 'NavBar'
};
</script>


<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
    @import url('https://fonts.googleapis.com/css2?family=Barlow&display=swap');

    .topnav-left {
        background-color: #F07575;
        width: 50%;
        height: 85px;
        text-align: left;
    }

    .topnav-right {
        background-color: #F07575;
        text-align: right;
        flex-grow: 1;
    }


    .topnav {
        width: 100%;
        height: 85px;
        display: flex;
    }

    .sidebar {
        background-color: #ffffff;
        margin-top: 5%;
        width: 100%;
        height: 100%;
        text-align: left;
    }

    #myprofilebtn {
        font-size: 23px;
        font-family: 'Montserrat', sans-serif;
        color: #ffffff;
        background-color: #F07575;
        border: none;
    }

    #logoutbtn {
        font-size: 12px;
        font-family: 'Montserrat', sans-serif;
        color: #ffffff;
        text-align: right;
        background-color: #F07575;
        border: none;
        text-decoration: underline;
    }

    #homepagebtn {
        background-color: #ffffff;
        border: none;
        color: #000000;
        font-size: 15px;
        text-decoration: underline;
        font-family: 'Barlow', sans-serif;
    }

    #mybuddiesbtn {
        background-color: #ffffff;
        border: none;
        color: #000000;
        font-size: 15px;
        text-decoration: underline;
        font-family: 'Barlow', sans-serif;
    }

    #mycalendarbtn {
        background-color: #ffffff;
        border: none;
        color: #000000;
        font-size: 15px;
        text-decoration: underline;
        font-family: 'Barlow', sans-serif;
    }

    #aboutusbtn {
        background-color: #ffffff;
        border: none;
        color: #000000;
        font-size: 15px;
        text-decoration: underline;
        font-family: 'Barlow', sans-serif;
    }

    #usericon {
        text-align: left;
        height: 50px;
        width: 50px;
    }
</style>