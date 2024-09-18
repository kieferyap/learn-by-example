function generateRandomNumber(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

const app = Vue.createApp({
  data() {
    return {
      // v-if
      guessedNumberIf: '',
      targetNumberIf: 50,
      isLowerIf: false,
      isHigherIf: true,

      // v-show
      guessedNumberShow: '',
      targetNumberShow: 50,
      isLowerShow: false,
      isHigherShow: true,

      // v-for
      gemstones: [
        'Diamond',
        'Emerald',
        'Garnet',
        'Jade',
        'Opal',
        'Ruby',
        'Sapphire',
        'Topaz',
      ],

      // v-for, but for an object
      character: {
        level: 36,
        element: 'fire',
        species: 'badger',
        gender: 'male'
      }
    }
  },
  methods: {
    // for v-if
    checkNumberIf() {
      this.isLowerIf = this.targetNumberIf < this.guessedNumberIf
      this.isHigherIf = this.targetNumberIf > this.guessedNumberIf
    },
    generateNumberIf() {
      this.targetNumberIf = generateRandomNumber(1, 100)
      this.guessedNumberIf = ''
      this.isLowerIf = false
      this.isHigherIf = true
    },

    // for v-show
    checkNumberShow() {
      this.isLowerShow = this.targetNumberShow < this.guessedNumberShow
      this.isHigherShow = this.targetNumberShow > this.guessedNumberShow
    },
    generateNumberShow() {
      this.targetNumberShow = generateRandomNumber(1, 100)
      this.guessedNumberShow = ''
      this.isLowerShow = false
      this.isHigherShow = true
    },

    // Removes an item from the gemstone list
    removeGemstone(index) {
      this.gemstones.splice(index, 1)
    }
  }
})

app.mount('#app')
