function generateRandomNumber(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      linkVariable: 'https://google.com',
      immediateString: '',
      lazyString: '',
      numbersOnly: 0,
      trimmedString: '',
      specialCounter: 10,
    }
  },
  methods: {
    increaseCounter(event) {
      console.log('Event: ', event)
      this.counter += 1
    },
    decreaseCounter(event, value) {
      console.log('Event: ', event)
      this.counter -= value
    },
    keyPressed(keyName) {
      alert(`The following key has been pressed: ${keyName}`)
    },
    alertNumber() {
      alert(`This should be a number: (${this.numbersOnly})`)
    },
    alertTrimmedString() {
      alert(`This is the string, but trimmed from both sides: (${this.trimmedString})`)
    },
    increaseSpecialCounter(){
      if (this.specialCounter < 999)
        this.specialCounter += generateRandomNumber(5, 10)
    }
  }
})

app.mount('#app')
