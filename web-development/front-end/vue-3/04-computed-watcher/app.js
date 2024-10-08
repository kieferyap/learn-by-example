const app = Vue.createApp({
  data() {
    return {
      math: 90,
      science: 95,
      english: 89,
      socialStudies: 90,
      assessment: 'Passed',
      assessmentClass: ['text-success'],
      timeout: null,
    }
  },
  computed: {
    // If math, science, or english changes value, this method is triggered.
    average() {
      const average = (this.math + this.science + this.english)/3
      return Math.round(average * 10) / 10
    }
  },
  watch: {
    // If the socialStudies variable within data() changes, this method is triggered.
    socialStudies(newValue, oldValue) {
      // Reset the timer
      clearTimeout(this.timeout)

      // Set the timer
      // This makes it so that the function is not called every time the user types.
      // It waits until the user has not typed for 300ms before triggering the function.
      this.timeout = setTimeout(() => {
        const highGrade = 95
        const passingGrade = 70
        const closeCallGrade = 75
        
        // Set the assessment and its class
        this.assessmentClass = ['text-success']
        this.assessment = 'Passed'

        if (newValue >= highGrade) {
          this.assessmentClass = ['text-info', 'fw-bold']
          this.assessment = 'Passed with flying colors!'
        }
        else if (newValue < passingGrade) {
          this.assessmentClass = ['text-danger', 'fst-italic']
          this.assessment = 'Failed...'
        }
        else if (newValue <= closeCallGrade) {
          this.assessmentClass = ['text-warning']
          this.assessment = 'Passed (That was close!)'
        }

        // Log the old and new values
        console.log(`New value: ${newValue}, Old value: ${oldValue}`)
      }, 300)
      
    }
  },
})

app.mount('#app')
