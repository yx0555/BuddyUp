<template>
  <div style="text-align: center" v-if="user">
    <NavBar />
    <div>
      <h1>Buddy's {{this.buddyId }} Visitations</h1>
      <table id="visitationtable" align="center">
        <tr>
        <th> Date </th>
        <th> Start Time </th>
        <th> End Time </th>
        <th> Remarks </th>
        </tr>
      </table>
    </div>
    <div class="buttons">
      <button id="requestdetailsbutton" type="button" v-on:click="requestdetails()">Request Buddy's details</button>
      <button id="addvisitationbutton" type="button" v-on:click="addvisitation()">Add a new visitation</button>
    </div>

  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
// import firebaseApp from "../firebase.js";
// import {
//   getFirestore,
//   getDoc,
//   doc,

// } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// const db = getFirestore(firebaseApp);
// const auth = getAuth();

export default {
  name: "IndivBuddies",

  components: {
    NavBar,
  },

  data() {
    return {
      buddyId: this.$route.params.id,
      user: false,
    };
  },

   methods: {
    async requestdetails() {
      alert("Details of the buddy will be sent to your registered email")
    },

    async addvisitation(){
      // var uid = auth.currentUser.uid;
      // const snapshot = await getDoc(doc(db, "Buddies", this.buddyId));
      // var buddy


    }
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
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

#visitationtable{
  position: relative;
  font-family: "Montserrat";
  font-size: 15px;
  border-collapse: collapse;
  width:70%;
  text-align: center;
}

th, td{
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}

.buttons{
  position: absolute;
  bottom: 10%;   
  display: inline;
}


#requestdetailsbutton{
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #ABE6E9;
  font-size: 15px;
  margin-right: 5px;
}

#addvisitationbutton{
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #ABE6E9;
  font-size: 15px;
}

</style>