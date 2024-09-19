const app = Vue.createApp({
  data() {
    return {
      hooks: [],
      inputString: ''
    }
  },
  beforeCreate() {
    // this.hooks returns undefined at this point
    console.log('beforeCreate')
  },
  created() {
    // Pushing into this.hooks at this point does NOT trigger beforeUpdate()
    this.hooks.push('created')
  },
  beforeMount() {
    // Pushing into this.hooks at this point does NOT trigger beforeUpdate()
    this.hooks.push('beforeMount')
  },
  mounted() {
    // Pushing a string into this.hooks triggers beforeUpdate()
    this.hooks.push('mounted')
  },
  beforeUpdate() {
    // Updating this.hooks here triggers an infinite loop 
    console.log('beforeUpdate')
  },
  updated() {
    // Updating this.hooks here triggers an infinite loop 
    console.log('updated')
  },
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  unmount() {
    console.log('unmounted')
  },
})

app.mount('#app')

// Unmount
const buttonElement = document.querySelector('#btn-unmount')
buttonElement.addEventListener('click', () => { app.unmount() })


