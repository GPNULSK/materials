<template>

</template>

<script>



  const apiUrl=process.env.BASE_API;
  const username='';
  const uid='';

export default {
  apiUrl,
  username,
  uid,
  setUsername(username){
    this.username=username;
  },
  setUid(uid){
    this.uid=uid
  },
  name: "Global"
}
</script>

<style scoped>

</style>
