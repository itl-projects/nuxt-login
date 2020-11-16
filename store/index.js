const cookieparser = require('cookieparser')
const Cookie = require('js-cookie')
export const state = () => ({
    authUser: null,
    token:null
})

export const mutations = {
    SET_USER(state, user) {
        state.authUser = user
    }
}

export const actions = {
    nuxtServerInit({commit},{req}){
        let auth = null
        if(req.headers.cookie){
            const parsed = cookieparser.parse(req.headers.cookie)
            try{
                auth = JSON.parse(parsed.auth)
            }catch(err){
                //no vaild cooie found
            }
        }
        commit('SET_USER',auth)
    },
    async login({ commit }, { username, password }) {
        var data = {
            username,
            password
        }
        try {
            const res = await this.$auth.loginWith('local',{data:data})
            if(res){
                commit('SET_USER',res);
                Cookie.set('auth',res)
                Cookie.set('isLogged',true)
                let token = res.data.token
                this.$auth.setUserToken(token)

            }
            this.$router.push('/')
        } catch (error) {
            console.log(error)
        }
        
    },
    async logout({commit}){
        await this.$auth.logout();
        Cookie.remove('auth')
        Cookie.remove('isLogged')
        commit('SET_USER',null)
        this.$router.push('login')
    }
}

export const getters = {
    isAuthenticated(state) {
      return state.auth.loggedIn
    },
  
    loggedInUser(state) {
      return state.auth.user
    }
  }