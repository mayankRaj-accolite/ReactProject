import React, { Component } from 'react';
//import Button from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './listItem';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();
    this.state ={
      newTodo: 'Add new Todo',
      editing:false,
      editingIndex:null,
      notification:null,
      todos: []
    };

    this.apiUrl = 'https://5d5b59254311db0014982723.mockapi.io';

   this.handleChange = this.handleChange.bind(this);
   this.addTodo = this.addTodo.bind(this);
   this.deleteTodo = this.deleteTodo.bind(this);
   this.updateTodo = this.updateTodo.bind(this);
   this.editTodo = this.editTodo.bind(this);
   this.alert = this.alert.bind(this);
   
  };


  componentWillMount(){
    console.log("Will Mount");
  }

  async componentDidMount(){
    //console.log("Did Mount");
    const response = await axios.get(`${this.apiUrl}/todos`);
    console.log(response);
    this.setState({
      todos:response.data
    });
  }

  handleChange(event)
  {
    this.setState(
      {
        newTodo: event.target.value
      }
    );
    //console.log(event.target.name, event.target.value);
  }

  async addTodo(event){

    const response = await axios.post(`${this.apiUrl}/todos`, {name: this.state.newTodo});
    console.log(response);
  
    const oldTodos = this.state.todos;
    oldTodos.push(response.data);
    this.setState({
      todos:oldTodos,
      newTodo:'',
    } 
    );
    this.alert('Todo Added Successfully');
  }

  async deleteTodo(event){
    //console.log(event);
    var index = event;
    const todo = this.state.todos[index];
    const oldTodos = this.state.todos;

    const response = await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
    console.log("Deleted");

    delete oldTodos[index];
    this.setState({
      todos:oldTodos,
    });
    this.alert('Todo Deleted Successfully');
  }

  editTodo(index){
    
    const todo = this.state.todos[index];
    this.setState({
      editing:true,
      newTodo: todo.name,
      editingIndex:index,
    })
   
  }

  updateTodo(){
    console.log("Inside Update");
    const todo = this.state.todos[this.state.editingIndex];
    todo.name = this.state.newTodo;

    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;

    this.setState({
      todos:todos,
      editing:false,
      editingIndex:null,
      newTodo:''
    });
    this.alert('Todo Updated Successfully');
  }

  alert(notification){
    this.setState({
      notification
    });

    setTimeout(()=> {

      this.setState({
        notification:null
      });
    }, 2000);

  }

  render(){

    console.log(this.state);
    return (
      <div className="App">
      
        <h2 className="text center p4">Todos</h2>
        {
          this.state.notification && 

          <div className ="alert mt-3 alert-success">
          <p className="text-center">{this.state.notification}</p>
        </div>
        }
       

        <input
        type="text" className="my-4 form-control"
        name="Add List Items"
        placeholder="Add New Todo"
        value={this.state.newTodo}
        onChange={this.handleChange}
        />
         <button 
          className ="btn-success mb-3 form-control"
          onClick={this.state.editing ? this.updateTodo : this.addTodo}
          disabled = {this.state.newTodo.length < 5}>
            {this.state.editing ? 'Update Todo' : 'Add Todo'}
          </button>
          <div className="Container">
          {
            !this.state.editing &&
              <ul className="list-group">
              {
                this.state.todos.map((item, index)=>{
                    return <ListItem
                    key = {item.id}
                    item ={item}
                    editTodo={()=> {this.editTodo(index);}}
                    deleteTodo={()=> {this.deleteTodo(index);}}
                  >
                    </ListItem>
                })
              }
              </ul>
          }
           
          </div>
      </div>
    );

  }
 
}

export default App;
