/**********************
 * VANILLA JAVASCRIPT *
 **********************/

// Grab the relevant elements from the HTML page
const buttonElement = document.querySelector('#vanilla button')
const inputElement = document.querySelector('#vanilla input')
const listElement = document.querySelector('#vanilla ul')

// Adds a new item from the text within the <input> into the <ul>
function addItem() {
  // Get the value of the new item
  const newItem = inputElement.value

  // Create a new <li> element with the new item and append it into the <ul>
  const listItemElement = document.createElement('li')
  listItemElement.textContent = newItem
  listElement.appendChild(listItemElement)

  // Clear the <input>
  inputElement.value = ''
}

// Make it so that if the button is clicked, addItem() function is called
buttonElement.addEventListener('click', addItem)

/***************************
 * SAME THING BUT WITH VUE *
 ***************************/

const app = Vue.createApp({
  data() {
    // Declare the object which will contain the data to be used in the app
    // In this case, we need a list of items (an empty array at the moment)
    // and the new item (an empty string at the moment)
    return {
      list: [],
      newItem: ''
    }
  },
  methods: {
    // This function pushes whatever string is contained within the newItem
    // into the list of items. It also clears the newItem string.
    addItem() {
      this.list.push(this.newItem)
      this.newItem = ''
    }
  }
})

// Link up the Vue App into the HTML part by specifying the selector 
// In this case, an element with an ID of 'app'
app.mount('#app')