import {gql} from "apollo-boost";
import {graphql} from "react-apollo";
import { Component } from "react";
import BookDetails from "./BookDetails";

const bookQuery = gql`
{
    book{
        name 
        id
        genre
    }
}`

class BookList extends Component
{
    DisplayBooks()
    {
        var data = this.props.data;

        if(data.loading)
        {
            return(
            <div>
                Loading Books...
            </div>)
        }
        else
        {
            return data.books.map(book=>{
                 <li key={book.id}>{book.name}</li>
            });
        }
    }
    
    ListOfBooks()
    {
    return (
            <div id="BookList">
                <ul>
                 <li>{this.DisplayBooks()}</li>
                </ul>
                <BookDetails />
            </div>
        );
    }
}

export default graphql(bookQuery)(BookList);