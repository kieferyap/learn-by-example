// Router
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import useCookie from '../composables/useCookie'

const router = createRouter({
  history: createWebHistory(),
  // Scroll behavior: to, from, savedPosition
  // This method is called whenever the route changes
  scrollBehavior(_, _2, savedPosition) {
    // Scroll back to the previous position
    if (savedPosition) return savedPosition

    // Scroll all the way to the top
    return {
      left: 0,
      top: 0,
    }
  },
  // Pass the generated routes written by the plugin
  routes,
})

// Global before guards
router.beforeEach(to => {
  // For public pages, simply continue the navigation
  if (to.meta.public)
    return

  // We check if the user is logged in
  const { getCookie } = useCookie()
  const isLoggedIn = !!(getCookie('authToken') && getCookie('userData'))

  // The user is trying to go to login/signup pages
  if (to.meta.unauthenticated) {
    // Redirect to home if the user is already logged in
    if (isLoggedIn) {
      return '/'
    }
    // If not, then continue the navigation
    return
  }

  // The user is trying to go to non-public pages and isn't logged in
  if (!isLoggedIn) {
    return '/login'
  }

  // Allow navigation
  return
})

export default router
