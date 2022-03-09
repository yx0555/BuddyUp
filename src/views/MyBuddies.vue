<template>
  
  <h1>My Buddies Page</h1>
  <div class="row">
    <div class="column">
      <img id = "icon" src="@/assets/buddyicon.png" width="150" alt="Buddy Icon">
    </div>
    <div class="column">
      <img id = "icon" src="@/assets/buddyicon.png" width="150" alt="Buddy Icon">
    </div>
    <div class="column">
      <img id = "icon" src="@/assets/buddyicon.png" width="150" alt="Buddy Icon">
    </div>

    <div class="row">
    <div class="column">
    <br>
      <router-link to="/indivbuddies">Buddy 1</router-link>
    </div>
    <div class="column"><br>
      <router-link to="/indivbuddies">Buddy 2</router-link>
      </div>
    <div class="column"><br>
      <router-link to="/indivbuddies">Buddy 3</router-link></div>
    </div>
    <br><br>
    <button type="button"> Add a buddy </button>



  </div>

</template>

<script>
export default {

}
</script>

<style>
#icon{

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