import {createStore} from "redux"

const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector("form")

const ADD_TODO = "addTodo"
const DELETE_TODO = "deleteTodo"

const reducer = (state, action ) => {
  console.log(action)
  switch(action.type){
    case ADD_TODO : return []
    case DELETE_TODO: return []
    default :return state
  } 
}

const stateStore = createStore(reducer)

const handleSubmit = (event) => {
  event.preventDefault()
  const todo = input.value
  input.value=""
  stateStore.dispatch({type:ADD_TODO, text:todo}) 
  
}

form.addEventListener("submit", handleSubmit)