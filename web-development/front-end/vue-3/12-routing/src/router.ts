// Router
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  // Scroll behavior: to, from, savedPosition
  scrollBehavior(_, _2, savedPosition) {
    // A method called whenever the route changes
    if (savedPosition) return savedPosition
    return {
      left: 0,
      top: 0, // Scroll all the way to the top
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
  const isLoggedIn = true

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
