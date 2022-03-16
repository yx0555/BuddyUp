<template>
  
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
      <br><br> <router-link to="/indivbuddies/3">Buddy 3</router-link>
    </div>
  </div>

  <div class="row">
    <br>
    <button id="addbutton" type="button" v-on:click="addbuddy()"> Add a buddy </button>
  </div>
  

</template>

<script>
export default {
  methods:{
    addbuddy(){
      // var image = document.getElementById("icon");
      // image.src="@/assets/man.png";
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
  @import url('https://fonts.googleapis.com/css2?family=Barlow&display=swap');

#icon{
    color:antiquewhite
}

#addbutton{
  font-family: 'Montserrat';
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