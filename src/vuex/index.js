import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
	username: 'ddb',
	oneLevel: '',
	menuList: []
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})