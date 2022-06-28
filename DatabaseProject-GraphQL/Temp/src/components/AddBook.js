import {gql} from "apollo-boost";
import { Component } from "react";
import {graphql} from "react-apollo";
import {flowRight as compose} from "lodash";
import GetBooksQuery from "./BookList";

const getAuthorQuery = gql`
{
    authors{
        name 
        id
    }
}`

const AddBookMutation = gql`
{
    mutation($name:String,$genre:String,$authorID:ID){
        AddBook(name:$name, genre:$genre, authorID:$authorID)
        {
            name
            genre
        }
    }
}
`

class AddBook extends Component()
{
    constructor(props)
    {
        super(props)
        this.state = {
            name:"",
            genre:"",
            authorID:""
        };
    }

    DisplayAuthors()
    {
        var data = this.props.data;
        if(data.loading)
        {
            return(<option disabled> Loading Authors </option>)
        }
        else
        {
            return(data.authors.map(author=>{
                return(<option key={author.id} value={author.id}>author.name</option>)
            }));
        }
    }

    submitForm(e)
    {
        e.preventDefault();
        this.props.AddBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorID:this.state.authorID
            },
            refetchQueries:[{query:GetBooksQuery}]
        });
        
    }

    AddBook()
    {
        <form id="Add-Book" onSubmit={this.submitForm.bind(this)}>
            
            <div className="field">
                <label>Book Name</label>
                <input type="text" onChange={(e) => {this.setState({name: e.target.value})}}></input>
            </div>

            <div className="field">
                <label>Genre</label>
                <input type="text" onChange={(e) => {this.setState({genre: e.target.value})}}></input>
            </div>  

            <div className="field">
                <label>Author</label>
                <select onChange={(e) => {this.setState({authorID: e.target.value})}}>
                    <option>Select Author</option>
                    DisplayAuthors();
                </select>
            </div> 

            <button>+</button>
        </form>
    }
}

export default compose(
    graphql(getAuthorQuery, {name:"GetAuthorQuery"}),
    graphql(AddBookMutation,{name:"AddBookMutation"})
)(AddBook);