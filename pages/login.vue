<template>
  <v-card>
    <v-card-title class="text-center"> Login </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-text-field label="Username" v-model="username" outlined></v-text-field>
      <v-text-field label="Password" v-model="Password" outlined></v-text-field
    ></v-card-text>
    <v-card-actions>
      <v-btn @click="login" :loading="loading">Login</v-btn>
      <v-btn @click="logout" :loading="loading">logout</v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      username: "",
      Password: "",
      loading: false,
    };
  },

  methods: {
    async login() {
      try{
        await this.$store.dispatch('login',{
          username:this.username,
          password:this.Password,
          
        })
        
      }catch(e){
        console.log('failded');
      }
      },
      logout(){
        this.$store.dispatch('logout')
      }
  },
};
</script>

<style>
</style>