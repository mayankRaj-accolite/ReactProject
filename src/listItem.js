import React  from 'react';
import Button from 'react';
import logo from './logo.svg';
import './App.css';


const ListItem =(props) =>{
    //console.log("Hello");
    return(
       
        <li className ="list-group-item">

                    <button 
                      className="btn-sm mr-4 btn btn-info"
                      onClick = {props.editTodo}>
                      U</button>
                      {props.item.name} 
                      <button 
                      className="btn-sm ml-4 btn btn-danger"
                      onClick = {props.deleteTodo}>
                      X</button>
        </li>
    );
}


export default ListItem;