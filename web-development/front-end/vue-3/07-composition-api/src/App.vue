<template>
  <div>
    <!-- Composition API -->
    <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
      <h3>Composition API</h3>

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
    </div>

    <!-- Reactive -->
    <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
      <h3>Reactive()</h3>

      <!-- Name -->
      <ul class="list-group">
        <!-- First name -->
        <li class="list-group-item">
          <input type="text" class="form-control" placeholder="First name" v-model="fullName.first" />
        </li>

        <!-- Middle name -->
        <li class="list-group-item">
          <input type="text" class="form-control" placeholder="Middle name" v-model="fullName.middle" />
        </li>

        <!-- Last name -->
        <li class="list-group-item">
          <input type="text" class="form-control" placeholder="Last name" v-model="fullName.last" />
        </li>

        <!-- Full name -->
        <li class="list-group-item">
          Full name: {{ computedFullName }}
        </li>

      </ul>
    </div>

    <!-- Reference Properties -->
    <div class="border rounded p-3 mt-3 col-12 col-md-6 mx-auto">
      <h3>Reference Properties</h3>

      <!-- Name -->
      <ul class="list-group">
        <!-- Username -->
        <li class="list-group-item">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Enter username" ref="username" />
            <div class="input-group-append">
              <button class="btn btn-success" type="button" @click="alertUsername">Alert Username</button>
            </div>
          </div>
        </li>

        <!-- Alert Button -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref, computed, watch, reactive, toRefs, isRef, isReactive } from 'vue'

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

      // Note how we are accessing the list via list.value
      // but in the template, we are only using list
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

    // reactive
    const fullName = reactive({
      first: '',
      middle: '',
      last: ''
    })

    // Note how we are not using fullName.value.first
    const computedFullName = computed(() => {
      return `${fullName.first} ${fullName.middle} ${fullName.last}`
    })

    // toRefs, isRefs, isReactive
    const fullNameRefs = toRefs(fullName)
    console.log('fullNameRefs:', fullNameRefs, fullNameRefs.first, `>>${fullNameRefs.first.value}<<`)
    console.log('isRef:', isRef(newNumber))
    console.log('isReactive:', isReactive(fullName))

    // Reference properties
    const username = ref<HTMLInputElement | null>(null)
    const alertUsername = function () {
      alert(username.value?.value)
    }

    // Exposing functions and variables to the template
    return {
      addNumber,
      newNumber,
      list,
      average,
      assessmentClass,
      assessment,
      fullName,
      computedFullName,
      username,
      alertUsername
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
