<template>
  <div class="page" style="text-align: center">
      <h2>{{ this.buddyName }}'s Visitations</h2>
      <table id="visitationtable" align="center">
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Remarks</th>
          <th>Delete</th>
        </tr>
      </table>
    
    <button id="requestdetailsbutton" type="button" v-on:click="requestdetails()">
      Request Buddy's details
    </button>

    <button id="deletebuddybutton" type="button" v-on:click="deletebuddy()">
      Delete this buddy
    </button>

  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp);
export default {
  props: ["buddynumber"],
  data() {
    return {
      buddyId: "",
      buddyName: "",
    };
  },
  methods: {
    async requestdetails() {
      alert("We have sent the details of your buddy to your registered email!");
    },
    async deletebuddy(){
      if (confirm("Do you want to delete this buddy? This action cannot be undone.")==true){
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const userDocRef = (doc(db, "Users", uid));
        const docSnap = await getDoc(userDocRef);
        var buddyid = "";
        if(this.buddynumber == 1){
          buddyid = docSnap.data().buddyID1;
          await updateDoc(userDocRef,{
            buddyID1:"",
            buddyName1:"",
            buddy1VisitationSlot:"",
          });
        } 
        else if(this.buddynumber == 2){
          buddyid = docSnap.data().buddyID2;
          await updateDoc(userDocRef,{
            buddyID2:"",
            buddyName2:"",
            buddy2VisitationSlot:"",
        });
        } 
        else if(this.buddynumber == 3){
          buddyid = docSnap.data().buddyID3;
          await updateDoc(userDocRef,{
            buddyID3:"",
            buddyName3:"",
            buddy3VisitationSlot:"",
        });
        } 
        await updateDoc(doc(db,"Buddies",buddyid),{
          userID:"",
        }); // delete userid from buddyid

        //Delete visitations
        const vRef = collection(db, "Visitations");
        const q = query(vRef, where("buddyID", "==", buddyid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          deleteDoc(doc(db, "Visitations", document.id));
        });

        //Delete reminders
        const remRef = collection(db, "Reminders");
        const remq = query(remRef, where("buddyID", "==", buddyid));
        const remqSnapshot = await getDocs(remq);
        remqSnapshot.forEach((document) => {
          deleteDoc(doc(db, "Reminders", document.id));
        });

        this.$router.push('/mybuddies');
      }
    } 
  },
  mounted() {
    const auth = getAuth();
    var vm = this;
    display();
    // UPDATE THE BUDDYNAME AND BUDDYID BASED ON THE ROUTE PARAMETERS
    async function display() {
      const uid = auth.currentUser.uid;
      const snapshot = await getDoc(doc(db, "Users", uid));
      if (snapshot.exists()) {
        if (vm.buddynumber == 1) {
          vm.buddyName = snapshot.data().buddyName1;
          vm.buddyId = snapshot.data().buddyID1;
        } else if (vm.buddynumber == 2) {
          vm.buddyName = snapshot.data().buddyName2;
          vm.buddyId = snapshot.data().buddyID2;
        } else {
          vm.buddyName = snapshot.data().buddyName3;
          vm.buddyId = snapshot.data().buddyID3;
        }
      }
      display2();
    }
    async function display2() {
      const uid = auth.currentUser.uid;
      let ind = 1;
      const vRef = collection(db, "Visitations");
      const q = query(
        vRef,
        where("buddyID", "==", vm.buddyId),
        where("userID", "==", uid),
        orderBy("date"),
        orderBy("startTime","asc")
      );
      const querySnapshot = await getDocs(q);
      //Inserting data into the table
      querySnapshot.forEach((docs) => {
        let yy = docs.data();
        var table = document.getElementById("visitationtable");
        var row = table.insertRow(ind);
        var date = yy.date;
        var startTime = yy.startTime;
        var endTime = yy.endTime;
        var remarks = yy.remarks;
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = ind;
        cell2.innerHTML = date;
        cell3.innerHTML = startTime;
        cell4.innerHTML = endTime;
        cell5.innerHTML = remarks;
        cell6.innerHTML = "";
        var bu = document.createElement("button")
        bu.innerHTML="X"
        bu.style.backgroundColor = "#abe6e9"
        bu.style.borderRadius = "5px"
        bu.style.fontFamily = "Montserrat"
        bu.style.cursor = "pointer"
        bu.onclick = function(){
            deletevisitation(docs.id)
        };
        cell6.appendChild(bu)
        ind += 1;
    
  
      });
    }
    //Delete from firebase
    async function deletevisitation(visitationID) {
      if (confirm("Do you want to delete this visitation log?")==true){
        await deleteDoc(doc(db, "Visitations", visitationID));
        let tb = document.getElementById("visitationtable");
        while (tb.rows.length > 1) {
          tb.deleteRow(1);
        }
        display();
      }
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:500");
@import url("https://fonts.googleapis.com/css2?family=Barlow&display=swap");
.page {
  margin-left:120px;
}
h1,
h2 {
  text-align: center;
  background-color: #f5a4a4;
  font-size: 1.5em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  font-family: "Montserrat";
}
#visitationtable {
  font-family: "Montserrat";
  font-size: 15px;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
tr:nth-child(even){
    background-color: #e3edee;
}
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
tr{
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
td{
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
#requestdetailsbutton {
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #abe6e9;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
}

#deletebuddybutton {
  border-radius: 5px;
  font-family: "Montserrat";
  background-color: #ff5353dc;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
