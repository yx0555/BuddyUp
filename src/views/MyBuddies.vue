<template>
  <NavBar />
  <h1>My Buddies Page</h1>
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
  }
}
</script>

<style>

</style>