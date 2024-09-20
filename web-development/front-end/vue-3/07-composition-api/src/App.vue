<template>
  <div>
    <fieldset class="border rounded p-3 mt-3 col-12 col-md-6 offset-md-3">
      <legend>Vue Application</legend>

      <!-- Input group -->
      <div class="input-group mb-3">
        <!-- Input -->
        <input type="text" class="form-control" placeholder="Enter number from 1-100" v-model.number="newNumber" />

        <!-- Button-->
        <div class="input-group-append">
          <button class="btn btn-success" type="button" @click="addNumber">Add number</button>
        </div>
      </div>

      <!-- List of added numbers -->
      <ul class="list-group mb-3">
        <li class="list-group-item" v-for="item in list">{{ item }}</li>
      </ul>

      <!-- Computed and watcher -->
      <ul class="list-group">
        <!-- Computed property: Average -->
        <li class="list-group-item">
          Average: {{ average }}
        </li>

        <!-- Watcher -->
        <li class="list-group-item" v-if="newNumber">
          <span :class="assessmentClass">
            Assessment: {{ assessment }}
          </span>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { Ref, ref, computed, watch } from 'vue'

export default {
  setup() {
    // data()
    const newNumber: Ref<string> = ref('')
    const list: Ref<Array<number>> = ref([])

    // method
    const addNumber = function () {
      const number = Number(newNumber.value)
      if (number < 1 || number > 100) {
        alert('Please enter a number from 1-100.')
        return
      }

      if (!isNaN(number)) {
        list.value.push(number)
        newNumber.value = ''
      } else {
        alert('Please enter a number.')
      }
    }

    // computed
    const average: Ref<Number> = computed(() => {
      if (list.value.length === 0) {
        return 0
      }
      return list.value.reduce((a: number, b: number) => a + b, 0) / list.value.length
    })

    // watcher
    const assessmentClass: Ref<Array<string>> = ref([])
    const assessment: Ref<string> = ref('')
    let timeout = 0
    watch(newNumber, (newValue: string, oldValue: string) => {
      clearTimeout(timeout)
      assessmentClass.value = []
      assessment.value = '...'

      timeout = setTimeout(() => {
        const newNumber: number = Number(newValue)
        const oldNumber: number = Number(oldValue)
        const highGrade = 95
        const passingGrade = 70
        const closeCallGrade = 75

        // Set the assessment and its class
        assessmentClass.value = ['text-success']
        assessment.value = 'Passed'

        if (newNumber >= highGrade) {
          assessmentClass.value = ['text-info', 'fw-bold']
          assessment.value = 'Passed with flying colors!'
        }
        else if (newNumber < passingGrade) {
          assessmentClass.value = ['text-danger', 'fst-italic']
          assessment.value = 'Failed...'
        }
        else if (newNumber <= closeCallGrade) {
          assessmentClass.value = ['text-warning']
          assessment.value = 'Passed (That was close!)'
        }

        // Log the old and new values
        console.log(`New value: ${newNumber}, Old value: ${oldNumber}`)
      }, 500)
    })


    // Exposing functions and variables to the template
    return {
      addNumber,
      newNumber,
      list,
      average,
      assessmentClass,
      assessment,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
