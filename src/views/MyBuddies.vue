<template>
  <NavBar />
  <h1>My Buddies Page</h1>
  <br>
  <div class="row">
    <div class="column">
      <img id = "icon" src="@/assets/buddyicon.png" width="150" alt="Buddy Icon">
      <br><br><router-link to="/indivbuddies/1">Buddy 1</router-link>
    </div>

    <div class="column">
      <img id = "icon2" src="@/assets/buddyicon.png" width="150" alt="Buddy Icon">
      <br><br> <router-link to="/indivbuddies/2">Buddy 2</router-link>
    </div>

    <div class="column">
      <img id = "icon3" src="@/assets/buddyicon.png" width="150" alt="Buddy Icon">
      <br><br> <router-link to="/indivbuddies/2">Buddy 2</router-link>
    </div>
  </div>

  <div class="row">
    <br>
    <button id="addbutton" type="button" v-on:click="addbuddy()"> Add a buddy </button>
  </div>
  

</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return{
      refreshComp:0
    }
  },
  
  methods:{
    addbuddy(){
      var image = document.getElementById("icon");
      image.src="@/assets/buddyicon.png";
    }
  }
}
</script>

<style>
#icon{
    color:antiquewhite
}

#addbutton{
  font-family: Helvetica;
  background-color: lightpink ;
  font-size: 15px;
  border-radius: 5px;
  
}

.column{
  float: left;
  width: 33.33%;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}



</style>