import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Items.css'

class items extends Component {
	constructor(props){
		super(props);
		this.state = { items: [], nextID: 0, editIndex: 0, input: "", description: "", priority:"None", date:"", mode:"Add", editMode:"Add"}
	  }
	
	  submit() {
		if(this.state.input == null || this.state.input == ""){
			return alert("Item name cannot be empty");
		}
		if (this.state.mode == "Add")
		{
		  this.setState({ 
			nextID: this.state.nextID + 1,
			input: "",
			description: "",
			priority: "None",
			date: "",
			items: [...this.state.items, 
					{item: this.state.input, description: this.state.description, priority: this.state.priority, date:this.state.date, id: this.state.nextID + 1}]
		  })
		} 
		else 
		{
		  var newItems = this.state.items;
		  newItems[this.state.editIndex].item = this.state.input;
		  newItems[this.state.editIndex].description = this.state.description;
		  newItems[this.state.editIndex].priority = this.state.priority;
		  newItems[this.state.editIndex].date = this.state.date;
	
		  this.setState({ 
			mode: "Add",
			editMode: "Add",
			input: "",
			description: "",
			priority:"None",
			date:"",
			items: newItems
		  })      
		}
	  }
	
	  delete(delID) {
		if (this.state.mode != "Save")
		{
		  this.setState({ 
			items: this.state.items.filter( ({item,id}) => id != delID )
		  })
		}    
	  }
	
	  edit(editID) {
		var editItem = this.state.items.find( ({item,id}) => id == editID );
	
		this.setState({ 
		  input: editItem.item,
		  description: editItem.description,
		  priority: editItem.priority,
		  date: editItem.date,
		  mode: "Save",
		  editMode: "Edit",
		  editIndex: this.state.items.indexOf(editItem)
		})    
	  } 

	  getStripedStyle(index) {
		return { background: index % 2 ? '#fafafa' : '#323' };
	}
	
	  render() {
		return (
		  <div>
			<br/>
			<span id="task_title">{this.state.editMode} Item:</span>
			  <TextField id="outlined-basic" label="Item" variant="outlined" onChange={(event) => this.setState({input: event.target.value})}
				   value={this.state.input} required />
			  <TextField id="outlined-textarea" label="Description" placeholder="Description" multiline variant="outlined"
			  onChange={(event) => this.setState({description: event.target.value})}
			  value={this.state.description}/>
			<FormControl variant="outlined">
			<InputLabel id="demo-simple-select-placeholder-outlined-label">Priority</InputLabel>
			<Select
			  labelId="demo-simple-select-outlined-label"
			  id="demo-simple-select-outlined"
			  label="Priority"
			  onChange={(event) => this.setState({priority: event.target.value})} value={this.state.priority}
			>
			  <MenuItem value="None">
				<em>None</em>
			  </MenuItem>
			  <MenuItem value="Low">Low</MenuItem>
			  <MenuItem value="Medium">Medium</MenuItem>
			  <MenuItem value="High">High</MenuItem>
			</Select>
		  </FormControl>
		  <TextField type="Date" variant="outlined"  label="Date" InputLabelProps={{shrink: true,}} onChange={(event) => this.setState({date: event.target.value})}
			  value={this.state.date}></TextField>
		  <span className="Task_addition"><Button className="Category_addition"  variant="contained" color="primary" onClick={this.submit.bind(this)}>{this.state.mode}</Button></span>
			

			{this.state.items.length > 0 &&
				<TableContainer component={Paper} id="tasks_table_container">
				<Table aria-label="simple table" id="tasks_table" >
					<colgroup>
						<col width="27%" />
						<col width="25%" />
						<col width="12%" />
						<col width="12%" />
						<col width="12%" />
						<col width="12%" />
					</colgroup>
					<TableHead>
					<TableRow>
						<TableCell align="center">Item</TableCell>
						<TableCell align="center">Description</TableCell>
						<TableCell align="center">Priority</TableCell>
						<TableCell align="center">Date</TableCell>
						<TableCell align="center">Edit</TableCell>
						<TableCell align="center">Delete</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{this.state.items.map(({item,description,priority,date,id}) => (
						<TableRow key={id}>
						<TableCell align="center" component="th" scope="row" className="table_data">
							{item}
						</TableCell>
						<TableCell align="center" className="table_data" >{description}</TableCell>
						<TableCell align="center">{priority}</TableCell>
						<TableCell align="center">{date}</TableCell>
						<TableCell align="center"><Button variant="contained" color="primary" onClick={this.edit.bind(this,id)} startIcon={<EditIcon />}> Edit </Button></TableCell>
						<TableCell align="center"><Button variant="contained" color="secondary" onClick={this.delete.bind(this,id)} startIcon={<DeleteIcon />}> Delete </Button></TableCell>
						</TableRow>
						))}
						</TableBody>
					</Table>
					</TableContainer>
			}
		  </div>
		)
	  }
	}

export default items
