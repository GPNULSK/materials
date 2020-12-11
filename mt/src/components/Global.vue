<template>

</template>

<script>



  //const apiUrl='http://weixin.landa.com.cn:8094/zzld_material'  //郑州凌达地址
  //const apiUrl='http://weixin.landa.com.cn:8094/CQLD_material'  //重庆凌达
  //const apiUrl='http://weixin.landa.com.cn:8094/springboot'     //合肥凌达
  //const apiUrl='http://weixin.landa.com.cn:8094/zhld_material'    //珠海凌达
  const apiUrl='http://localhost:8094/zhld_material'
  //const apiUrl='http://172.75.200.53:8094/zhld_material'
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
