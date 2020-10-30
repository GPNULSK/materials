import Vue from 'vue'
import App from "../App";

new Vue({
    data: function(){
        return {
            uid:'114200563',
			      username:''
        }
    },
    render: h => h(App)
}).$mount('#app');
