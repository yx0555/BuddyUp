<template>
  <div id="page">
    <img id="logo" src="@/assets/BuddyUpLogo.png" alt="Buddy Up Logo" />
    <div id="container">
      <form @submit.prevent="login">
        <div id="email">
            <img id="emailIcon" src="@/assets/email.png" alt="Email Icon" />
            <input id="emailField"  type="email" placeholder="Email address..." v-model="email" />
        </div>
          <br />
        <div id="password">
          <img id="passwordIcon" src="@/assets/padlock.png" alt="Password Icon" />
          <input id="passwordField" type="password" placeholder="Password..." v-model="password" />
        </div>
      </form>
      <br />

    <div id = "row">
        <button id="loginBtn" type="submit" v-on:click="submit()">Login</button>
      <p>
        <router-link id="pwRouter" to="/forgotpassword"> Forgot password </router-link>
      </p>
    </div>
      <p>
        <router-link id="registerRouter" to="/register"> Do not have an account? Register here! </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'Login',

  props: {
    route: String,
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    submit() {
      let route = this.route;
      if (!this.route) {
        route = "/";
      }
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          // Signed in
          console.log("signed in successfully");
          this.$router.push(route);
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    mounted() {
      console.log("the current router is:" + this.route);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");

p {
  text-align: center;
  margin-left: 0%;
  margin-right: 0%;
}


#logo {
  width: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#emailIcon, #passwordIcon {
  width: 30px;
  height: 30px;
  margin: 10px;
}

#email, #password {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0 auto;
  margin-bottom: 10px;
}

#loginBtn {
  background-color: #abe6e9;
  color:black;
  border: none;
  border-radius: 10px;
  padding: 0 30px 0 30px;
  font-family: "Montserrat";
  font-weight: 700;
  cursor: pointer;
}

#pwRouter {
  color: #000000;
  font-family: "Montserrat";
  font-size: 14px;
}

#registerRouter {
  color: #000000;
  font-family: "Montserrat";
  font-size: 14px;
}

#emailField, #passwordField{
  padding: 12px 20px;
  width: 225px;
  height: 40px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  text-indent: 10px;
  margin: auto 7px auto 2px;
}

#page {
  background-color: #fff8f8;
  height: 100vh;
  margin: 0;
}

#container {
  width: 400px;
  height: auto;
  margin: 50px auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto 30px auto 30px;
}

</style>
