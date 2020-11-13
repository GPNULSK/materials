<template>

</template>

<script>



// const apiUrl='http://weixin.landa.com.cn:8094/springboot'
 const apiUrl='http://localhost:8096'
  //const apiUrl='http://172.75.200.53:8094/springboot'
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
