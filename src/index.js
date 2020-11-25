import {createStore} from "redux"

const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector("form")

const ADD_TODO = "addTodo"
const DELETE_TODO = "deleteTodo"


const paintTodo = () =>{
  const lists = stateStore.getState() 
  ul.innerHTML=""
  lists.forEach(element => {
    const li = document.createElement("li")
    const btn = document.createElement("button")
    btn.innerText="del"
    li.innerText = element.text
    li.id = element.text
    li.appendChild(btn)
    ul.appendChild(li)
  });

}

const reducer = (state = [], action ) => {
  switch(action.type){
    case ADD_TODO : return [{text:action.text, id: Date.now()} , ...state ]
    case DELETE_TODO: return []
    default :return state
  } 
}

//store을 수정할수 있는 방법은 action보내는 방법 뿐이다!!
//절대 mutation(변형)하지말것!! mutation 할수 없다면, 새로운 object를 리턴해야함
//ex) mutation
/* const friend = ["dal"]
  friends.push("kim")
  이것이 바로 mutation(변형)
  */

const stateStore = createStore(reducer)

stateStore.subscribe(paintTodo)



const addTodo = text => {
  stateStore.dispatch({type:ADD_TODO, text})
}

const handleSubmit = (event) => {
  event.preventDefault()
  const todo = input.value
  input.value=""
   addTodo(todo)
}

form.addEventListener("submit", handleSubmit)