import {gql} from "apollo-boost";
import { Component } from "react";
import {graphql} from "react-apollo";

const getBookQuery = gql`
{
    query($id: String){
        book(id:$id)
        {
            id
            name
            genre
            author{
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
}`

class BookDetails extends Component
{   
    GetBookDetails()
    {
        return (
            <div id="Book-Details">
               <p>Book Details</p>
            </div>
        );
    }
}

export default graphql(getBookQuery)(BookDetails);