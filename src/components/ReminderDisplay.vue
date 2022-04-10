<template>
  <div class="page" style="text-align: center">
      <h2>Reminders</h2>
      <table id="remindertable" align="center">
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Remarks</th>
          <th>Delete</th>
        </tr>
      </table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import {
  getFirestore,
  collection,
  doc,
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
        } else if (vm.buddynumber == 3){
          vm.buddyName = snapshot.data().buddyName3;
          vm.buddyId = snapshot.data().buddyID3;
        }
      }
      display2();
    }
    async function display2() {
      const uid = auth.currentUser.uid;
      let ind = 1;
      const vRef = collection(db, "Reminders");
      console.log(vm.buddyId)
      const q = query(
        vRef,
        where("buddyID", "==", vm.buddyId),
        where("userID", "==", uid),
        orderBy("date"),
      );
      const querySnapshot = await getDocs(q);
      //Inserting data into the table
      querySnapshot.forEach((docs) => {
        let yy = docs.data();
        var table = document.getElementById("remindertable");
        var row = table.insertRow(ind);
        var date = yy.date;
        var reminder = yy.reminder;
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = ind;
        cell2.innerHTML = date;
        cell3.innerHTML = reminder;
        cell4.innerHTML = "";
        var bu = document.createElement("button")
        bu.innerHTML="X"
        bu.style.backgroundColor = "#abe6e9"
        bu.style.borderRadius = "5px"
        bu.style.fontFamily = "Montserrat"
        bu.style.cursor = "pointer"
        bu.onclick = function(){
            deletereminder(docs.id)
        };
        cell4.appendChild(bu)
        ind += 1;
    
  
      });
    }
    //Delete from firebase
    async function deletereminder(reminderID) {
      if (confirm("Do you want to delete this reminder?")==true){
        await deleteDoc(doc(db, "Reminders", reminderID));
        let tb = document.getElementById("remindertable");
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
#remindertable {
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

</style>
