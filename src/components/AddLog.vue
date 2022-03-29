<template>
  <div class="page" style="text-align: center">
    <div class="Addvisitation">
      <form id="myform">
        <h2>Log a new visitation</h2>
        <div class="formli">
          <label for="date"> Date:</label>
          <input type="date" id="date" required="" placeholder="DD/MM/YYYY" v-model="a"/>
          <br /><br />
          <label for="starttime">Start Time:</label>
          <input type="number" id="starttime" required="" placeholder="0000HR(HHMM)" v-model="b"/><br /><br />
          <label for="endtime">End Time:</label>
          <input type="number" id="endtime" required="" placeholder="0000HR(HHMM)" v-model="c"/><br /><br />
          <label for="remarks">Remarks:</label>
          <input type="text" id="remarks" required="" placeholder="Eg. Bring item" v-model="d"/><br /><br />
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
import { getFirestore, addDoc, collection, doc, arrayUnion,updateDoc,getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  props: ['buddynumber'] ,
  data() {
    return {
      a:"",b:"",c:"",d:"",
      buddyId: "", 
      buddyName: "",
    };
  },

  mounted() { 
    var vm = this;  
    const auth = getAuth();
    //UPDATE THE BUDDYNAME AND BUDDYID BASED ON THE ROUTE PARAMETERS
    async function display(){
        var uid = auth.currentUser.uid;
        const docRef = getDoc(doc(db, "Users", uid));
        docRef.then(function (snapshot) {
          if (vm.buddynumber==1){
            vm.buddyName = snapshot.data().buddyName1;
            vm.buddyId=snapshot.data().buddyID1;
          } else if (vm.buddynumber==2){
            vm.buddyName = snapshot.data().buddyName2;
            vm.buddyId=snapshot.data().buddyID2;
          }
          else {
            vm.buddyName = snapshot.data().buddyName3;
            vm.buddyId=snapshot.data().buddyID3;
          }
        });
    }
    display();

  },

   methods: {
    async savetofs() {
      if (!(String(this.a) == "" || String(this.b) == "" || String(this.c) == "")){
        if (this.b>=0 && this.c>=0 && String(this.b).length==4 && String(this.c).length==4){
            if (this.b!=this.c) {
            //Date and time cannot be empty
            try {
                var uid = auth.currentUser.uid;
                const docRef = await addDoc(collection(db, "Visitations"), {
                date: this.a, startTime: this.b, endTime: this.c, remarks: this.d, userID: uid, buddyID: this.buddyId,
                });
                console.log(docRef);
                const addRef = doc(db, "Buddies", this.buddyId);
                await updateDoc(addRef, {visitationID: arrayUnion(docRef.id),});
                document.getElementById("myform").reset();
                this.$emit("added");
                alert("Visitation has been added")
            } catch (error) {
                console.error("Error adding document: ", error);
            }
            } else alert("Start and end time cannot be the same!");
        } else alert("Please enter a valid time")
      } else alert("Cannot take empty values. Please enter the values");
    },
  
},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");

.page {
  margin-left: 0px;
}

h1,h2{
    text-align:center;
    background-color: #f5a4a4;
    font-size:1.5em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight:bold;
    font-family: "Montserrat"
}

.formli{
    display: inline-block;
    text-align: left;
}

form{
    text-align: center;
    align-items: center;
    margin: auto;
}

label {
    display: inline-block;
    width:100px;
    text-align: right;
}

input {
    width: 150px
}

input:hover{
    box-shadow: 3px 3px #dddddd;
    border-radius: 2px;
}

.save{
    text-align: center;
}

#savebutton {
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #abe6e9;
  font-size: 15px;
}

</style>
