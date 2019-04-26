import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import { store } from '../store/store'
import HomePage from '@/components/HomePage'
import Login from '@/components/Login'
import Register from '@/components/Register'
import RegisterSuccessfull from '@/components/RegisterSuccessfull'
import ResendConfirmationEmail from '@/components/ResendConfirmationEmail'
import ResetPassword from '@/components/ResetPassword'
import UserDashboard from '@/components/user/Dashboard'
import TermsAndConditions from '@/components/pages/TermsAndConditions'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import FAQs from '@/components/pages/FAQs'
import Contact from '@/components/pages/Contact'
import AdminDashboard from '@/components/admin/Dashboard'
import AdminOperationsUsers from '@/components/admin/operations/Users/Show'
import AdminOperationsUsersAdd from '@/components/admin/operations/Users/Add'
import AdminOperationsUsersEdit from '@/components/admin/operations/Users/Edit'
import NotFound from '@/components/error-pages/NotFound'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/terms-and-conditions', name: 'terms_and_conditions', component: TermsAndConditions },
    { path: '/privacy-policy', name: 'privacy_policy', component: PrivacyPolicy },
    { path: '/frequently-asked-questions', name: 'frequently_asked_questions', component: FAQs },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/register-success', name: 'RegisterSuccessfull', component: RegisterSuccessfull },
    { path: '/resend-confirmation-email', name: 'ResendConfirmationEmail', component: ResendConfirmationEmail },
    { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
    { path: '/admin/dashboard', name: 'admin_dashboard', component: AdminDashboard, meta: { requiresAuth: true } },
    { path: '/admin/operations/users', name: 'admin_operations_users', component: AdminOperationsUsers, meta: { requiresAuth: true } },
    { path: '/admin/operations/users/add', name: 'admin_operations_users_add', component: AdminOperationsUsersAdd, meta: { requiresAuth: true } },
    { path: '/admin/operations/users/edit', name: 'admin_operations_users_edit', component: AdminOperationsUsersEdit, meta: { requiresAuth: true } },
    { path: '/user/dashboard', name: 'user_dashboard', component: UserDashboard, meta: { requiresAuth: true } },
    { path: '*', name: 'NotFound', component: NotFound }
    // { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
