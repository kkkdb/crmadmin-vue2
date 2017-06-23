import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
	username: 'ddb',
	oneLevel: '',
	menuList: [],
	pickerOptions: {
      	shortcuts: [{
        	text: '最近一周',
        	onClick(picker) {
          		const end = new Date();
          		const start = new Date();
          		start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          		picker.$emit('pick', [start, end]);
        	}
      	}, {
        	text: '最近一个月',
        	onClick(picker) {
          		const end = new Date();
          		const start = new Date();
          		start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          		picker.$emit('pick', [start, end]);
        	}
      	}, {
        	text: '最近三个月',
        	onClick(picker) {
          		const end = new Date();
          		const start = new Date();
          		start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          		picker.$emit('pick', [start, end]);
        	}
      	}]
    },

}

export default new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
})