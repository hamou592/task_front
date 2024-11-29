import React,{Component} from 'react'
import CustomModal from './component/Modal';
import "./App.css"
const tasks =[
    {
        "id": 1,
        "title": "revise lesson",
        "description": "revise",
        "completed": false
    },
    {
        "id": 2,
        "title": "do course",
        "description": "revise",
        "completed": false
    },
    {
        "id": 3,
        "title": "reading",
        "description": "revise",
        "completed": true
    },
    {
        "id": 4,
        "title": "learning ",
        "description": "revise",
        "completed": false
    }
]

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            viewCompleted:false,
            taskList:tasks
        }
    }
    displayCompleted = status => {
        if(status ){
            return this.setStatus({viewCompleted:true})
        }
        return this.setStatus({viewCompleted:false})
    }
    renderTabList = () =>{
        return(
            <div className='my-5 tab-list'>
                <span 
                    onClick={()=>this.displayCompleted(true)}
                    className={this.state.viewCompleted?"active":""}
                >
                    Completed
                </span>
                <span 
                    onClick={()=>this.displayCompleted(false)}
                    className={this.state.viewCompleted?"":"active"}
                >
                    Incompleted
                </span>
            </div>
        )
    }
    //rendering the item of the list completed or incompleted
    renderItems = () =>{
        const {viewCompleted} = this.state;
        const newItems =this.state.taskList.filter(
            item => item.completed==viewCompleted
        )
        return newItems.map(item =>(
            <li key={item.id} className='list-group-item d-flex justify-content-between align-item-center'>
                <span className={ `todo-title mr-2 ${this.state.Completed?"completed-todo" :""}`}
                title={item.title}
                >
                    {item.title}
                </span>
                <span>
                    <button className='btn btn-info mr-2'>Edit</button>
                    <button className='btn btn-danger mr-2'>Delete</button>
                </span>
            </li>
        ))
    }
    render(){
        return(
            <main className='context'>
                <h1 className='text-black text-uppercase text-center my-4' >
                    Task Manager
                </h1>
                <div className='row'>
                    <div className='col-md-6 col-sma-10 mx-auto p-0'>
                        <div className='card p-3'>
                            <div>
                                <button className='btn btn-warning'>
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
            </main>
        )
    }
}
export default App;