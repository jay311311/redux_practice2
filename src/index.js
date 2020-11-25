import {createStore} from "redux"

const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector("form")

const ADD_TODO = "addTodo"
const DELETE_TODO = "deleteTodo"



const addtodo=text=>{
  stateStore.dispatch({type:ADD_TODO, text})
}

const deleteTodo = id =>{
  stateStore.dispatch({type:DELETE_TODO, id})
}


// mutations을 하지 않기 때문데 삭제를 위한 slice를 사용할수없다,
// 그대신 filter 를 사용해 새로운 array를 생성할 것
const paintTodo = () =>{
  const lists = stateStore.getState() 
  ul.innerHTML=""
  lists.forEach(element => {
    const li = document.createElement("li")
    const btn = document.createElement("button")
    btn.innerText="del"
    li.innerText = element.text
    li.id = element.id
    btn.addEventListener("click",dispatchDeleteTodo)
    li.appendChild(btn)
    ul.appendChild(li)
  });
}

const reducer = (state = [], action ) => {
  switch(action.type){
    case ADD_TODO : return [{id: Date.now(),text:action.text} , ...state ]
    case DELETE_TODO: return  state.filter(todo=> todo.id !== action.id ) 
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
stateStore.subscribe(()=>{console.log(stateStore.getState())})


const dispatchAddTodo = text => {
  addtodo(text)
}

const dispatchDeleteTodo =(event)=>{
  const id = parseInt(event.target.parentNode.id)
  console.log(id)
  deleteTodo(id)
}

const handleSubmit = (event) => {
  event.preventDefault()
  const todo = input.value
  input.value=""
  dispatchAddTodo(todo)
}

form.addEventListener("submit", handleSubmit)