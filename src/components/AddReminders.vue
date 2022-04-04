<template>
  <div class="page" style="text-align: center">
    <div class="Addreminder">
      <form id="myform" autocomplete="off">
        <h2>Add a new reminder</h2>
        <div class="formli">
          <label for="date"> Set reminder for:</label>
          <input type="date" id="date" required="" placeholder="DD/MM/YYYY" v-model="a"/>
          <br /><br />
          <label for="remarks">Reminder:</label>
          <input type="text" id="remarks" required="" placeholder="Eg. Bring item" v-model="b"/><br /><br />
          <div class="save">
            <button id="savebutton" type="button" v-on:click="savetofs()">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  data() {
    return {
      a: "",
      b: "",
    };
  },

  methods: {
    async savetofs() {
      if (!(String(this.a) == "" || String(this.b) == "")){
          //Date and time cannot be empty
          try {
              var uid = auth.currentUser.uid;
              const docRef = await addDoc(collection(db, "Reminders"), {
              date: this.a, reminder: this.b, userID: uid,
              });
              const addRef = doc(db, "Users", uid);
              await updateDoc(addRef, {remindersID: arrayUnion(docRef.id),});
              this.a = this.b = ""
              this.$emit("added");
              alert("Reminder has been added")
          } catch (error) {
              console.error("Error adding document: ", error);
          }
      } else alert("Cannot take empty values. Please enter the values");
    },
  },
};


</script>


<style scoped>
h1,
h2 {
  text-align: center;
  background-color: #f5a4a4;
  font-size: 1.5em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  font-weight: bold;
  font-family: "Montserrat";
}

h2{
  display:inline-flex;
  text-align: center;
  background-color: #f5a4a4;
  padding:0px 20px 0px 20px
}

form {
  text-align: center;
  align-items: center;
  margin: auto;
}

label {
  display: inline;
  width: 100px;
  text-align: right;
}

input {
  width: 150px;
}

input:hover {
  box-shadow: 3px 3px #dddddd;
  border-radius: 2px;
}
</style>