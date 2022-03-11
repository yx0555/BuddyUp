<template>
<div>
    <h1> Current Buddy id is {{this.buddyId}} </h1>
</div>
  
</template>

<script>
export default {
    name:'IndivBuddies',
    data(){
        return {buddyId:this.$route.params.id}
    }
}
</script>

<style>

</style>