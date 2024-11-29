import React,{ Component} from 'react'
import CustomModal from './component/Modal';
import "./App.css"
import axios from 'axios';
const API_URL = process.env.TASK_APP_API_URL
class App extends Component{
    constructor(props){
        super(props);
        this.state={
            modal:false,
            viewCompleted:false,
            activeItem:{
              title:"",
              description:"",
              completed:false,
            },
            todoList:[]
        }
    }
    componentDidMount(){
      this.refreshList()
    }
    //to send the request from the client to the server
    refreshList=()=>{
      axios
      .get(`${API_URL}/api/tasks/`)
      .then(res =>this.setState({todoList:res.data})) //this is used to update data of the front end 
      .catch(err => console.log(err))
    }

    toggle = () =>{
      this.setState({modal:!this.state.modal})
    }
    handleSubmit = item =>{
      this.toggle()
      if(item.id){
        axios
        .put(`${API_URL}/api/tasks/${item.id}/`,item)
        .then(res => this.refreshList())
        return
      }
      axios
       .post(`${API_URL}/api/tasks/`,item)
       .then(res => this.refreshList())
    }
    handleDelete = item =>{
      axios
        .delete(`${API_URL}/api/tasks/${item.id}/`)
        .then(res => this.refreshList())
    }
    createItem = ()=>{
        const item = { title: "", description: "", completed: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
    }
    editItem=item=>{
      this.setState({activeItem:item,modal:!this.state.modal})
    }
    displayCompleted = status => {
        if(status ){
            return this.setState({viewCompleted:true})
        }
        return this.setState({viewCompleted:false})
    }
    renderTabList = () =>{
        return(
            <div className='my-5 tab-list'>
                <span 
                    onClick={()=>this.displayCompleted(true)}
                    className={this.state.viewCompleted?"active":""}
                >
                    Completed task
                </span>
                <span 
                    onClick={()=>this.displayCompleted(false)}
                    className={this.state.viewCompleted?"":"active"}
                >
                    Incompleted task
                </span>
            </div>
        )
    }
    //rendering the item of the list completed or incompleted
    renderItems = () =>{
        const {viewCompleted} = this.state;
        const newItems =this.state.todoList.filter(
            item => item.completed===viewCompleted
        )
        return newItems.map(item =>(
            <li key={item.id} className='list-group-item d-flex justify-content-between align-item-center'>
                <span className={ `todo-title mr-2 ${this.state.Completed?"completed-todo" :""}`}
                title={item.title}
                >
                    {item.title}
                </span>
                <span>
                    {/* //we use row function in the onClick evenet in order not to the functions during rendering */}
                    <button onClick={() => this.editItem(item)} className='btn btn-info mr-2'>Edit</button>
                    <button onClick={() => this.handleDelete(item)} className='btn btn-danger mr-2'>Delete</button>
                </span>
            </li>
        ))
    }
    render(){
        return(
            <main className='content p-3 mb-2 bg-info'>
                <h1 className='text-white text-uppercase text-center my-4' >
                    Task Manager
                </h1>
                <div className='row'>
                    <div className='col-md-6 col-sma-10 mx-auto p-0'>
                        <div className='card p-3'>
                            <div>
                                <button onClick={this.createItem} className='btn btn-warning'>
                                    Add Task
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className='list-group list-group-flush'>
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>

                </div>
                <footer className='my-3 mb-2 bg-info text-white text-center'>
                  Copyright 2024 &copy; all Rights Reserved
                </footer>
                {this.state.modal&&(
                  <CustomModal activeItem={this.state.activeItem} toggle={this.toggle}
                  onSave={this.handleSubmit} />
                )}
            </main>
        )
    }
}

export default App;