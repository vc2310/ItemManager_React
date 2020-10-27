import React, { Component } from 'react'
import Items from './Items';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Categories.css'

class Categories extends Component {

	constructor(props) {
		super(props);
		this.state = { items: [], nextID: 0, editIndex: 0, input: "", mode:"Add", editMode:"Add"}
	  }
	
	  submit() {
	
		if(this.state.input == null || this.state.input == ""){
			return alert("Category name cannot be empty. Please enter a valid category name");
		}
		let exists= false
		this.state.items.forEach(element => {
			if(element.item == this.state.input){
				exists = true;
			}
		});
		if (this.state.mode == "Add")
		{
			if(exists == true){
				return alert("Category "+this.state.input+" already exist");
			}
		  this.setState({ 
			nextID: this.state.nextID + 1,
			input: "",
			items: [...this.state.items, 
					{item: this.state.input, id: this.state.nextID + 1}]
		  })
		} 
		else 
		{
		  var newItems = this.state.items;
		  newItems[this.state.editIndex].item = this.state.input;
	
		  this.setState({ 
			mode: "Add",
			editMode :"Add",
			input: "",
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
		  mode: "Save",
		  editMode: "Edit",
		  editIndex: this.state.items.indexOf(editItem)
		})    
	  } 
	
	  render() {
		return (
		  <div>
			  <Container maxWidth="lg">
			<div>
				<span id="category_title">{this.state.editMode} Category:</span>
				<TextField id="outlined-basic" label="Category" variant="outlined" onChange={(event) => this.setState({input: event.target.value})}
				   value={this.state.input} required/>
				<span className="Category_addition"><Button className="Category_addition"  variant="contained" color="primary" onClick={this.submit.bind(this)}>{this.state.mode}</Button></span>
			 </div>
			
			
			  {this.state.items.map( 
				({item,id}) => 
				  <div key={id}>
					  <br/>
					<AppBar position="static" className="MuiAppBar-colorPrimary">
					<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">
					{item}
					</Typography>
					<IconButton aria-label="delete" onClick={this.delete.bind(this,id)}> <DeleteIcon fontSize="large" /> </IconButton>
					<IconButton aria-label="edit" onClick={this.edit.bind(this,id)}> <EditIcon fontSize="large" /> </IconButton>
					</Toolbar>
				</AppBar>
					<Items />
				</div> )}
				  </Container> </div>
		)
	  }
}

export default Categories
