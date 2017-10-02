import VueRouter from 'vue-router'
import Auth from './components/Auth.vue'
import AuthSuccess from './components/AuthSuccess.vue'
import About from './components/About.vue'
import Signup from './components/Signup.vue'
import ManualSignin from './components/Signform.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Auth},
    {path:'/auth', component: Auth},
    {path: '/success', component: AuthSuccess},
    {path: '/about', component: About},
    {path: '/signup', component: Signup},
    {path: '/manualsignin', component: ManualSignin}
  ]
})

export default router
