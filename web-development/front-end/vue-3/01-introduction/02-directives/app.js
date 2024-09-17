const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      linkVariable: 'https://google.com',
      numbersOnly: 0,
      trimmedString: '',
    }
  },
  methods: {
    increaseCounter() {
      if (this.counter < 99)
        this.counter += 1
    },
    decreaseCounter() {
      if (this.counter > 0)
        this.counter -= 1
    },
    keyPressed(keyName) {
      alert(`The following key has been pressed: ${keyName}`)
    },
    alertTrimmedString() {
      alert(`This is the string, but trimmed from both sides: (${this.trimmedString})`)
    },
    alertNumber() {
      alert(`This should be a number: (${this.numbersOnly})`)
    }
  }
})

app.mount('#app')
