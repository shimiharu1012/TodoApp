import React, { useState } from 'react';
import './App.css';
import { isConstructorDeclaration } from 'typescript';

function App() {
  // 入力フォーム
  const [inputValue,setInputValue]=useState("")
  // Todoのリスト
  const [todos,setTodos]=useState<Todo[]>([]);
  
  type Todo={
    inputValue: string;
    id: number;
    checked:boolean;
  }

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(e.target.value);
    setInputValue(e.target.value)
  }

  const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    console.log('handleSubmit is called!!')
    e.preventDefault();

    //新しいTodoを作成
    const newTodo: Todo={
      inputValue: inputValue,
      id: todos.length,
      checked:false,
    };

    
    setTodos([newTodo,...todos]);
    setInputValue('');
  }

  const handleEdit=(id: number,inputValue: string)=>{
    const newTodos=todos.map((todo)=>{
      if(todo.id===id){
        todo.inputValue=inputValue;
      }
      return todo
    })

    setTodos(newTodos);
  };

  const handleChecked=(id:number,checked:boolean)=>{
    const newTodos=todos.map((todo)=>{
      if(todo.id===id){
        todo.checked=!checked;
      }
      return todo
    })

    setTodos(newTodos);
  };

  const handleDelete=(id: number)=>{
    const newTodos=todos.filter((todo)=>todo.id!==id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" value={inputValue} onChange={(e)=>handleChange(e)} className="inputText"></input>
          <input type="submit" value="作成" className='submitButton'></input>
        </form>
        <ul className='todoList'>
          {todos.map((todo)=>(
            <li key={todo.id}>
              <input
                type="text" onChange={(e)=>handleEdit(todo.id,e.target.value)} 
                className="inputText" 
                value={todo.inputValue}
                disabled={todo.checked}>
              </input>
              <input 
                type="checkbox"
                onChange={(e)=>handleChecked(todo.id,todo.checked)} >
              </input>
              <button onClick={()=>handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
