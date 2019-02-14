/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform';

//To use momentjs for formatting date
import moment from 'moment';

//To use vue-progress bar
import VueProgressBar from 'vue-progressbar';

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

//To use vue router
import VueRouter from 'vue-router'

//To use Sweet Alert
// ES6 Modules or TypeScript
import swal from 'sweetalert2'
window.swal = swal;

//We register the toaster Globally
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

//We can also register toaster to the window
window.toast = toast;


Vue.use(VueRouter)

//Defining Our Routes
let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/users', component: require('./components/Users.vue').default },
    { path: '/view-users', component: require('./components/View-users.vue').default }

  ]


  //We register our routes
  const router = new VueRouter({
      mode: 'history',
    routes // short for `routes: routes`
  });


  //We register Global Filters
  Vue.filter('upText', function(text){
       return text.charAt(0).toUpperCase() + text.slice(1);
  });


  //Filters to enable us use momentjs for our dates
  Vue.filter('myDate', function(created){
   return moment(created).format("MMM Do YYYY");
  });

  //Setting our vue progress bar globally
  Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
  });
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
