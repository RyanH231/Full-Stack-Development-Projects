const graphql = require("graphql");
const _ = require("lodash");
const Author = require("../models/authors");
const Book = require("../models/book");

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorID: {type: GraphQLID},
        author: {
            type:AuthorType,
            resolve(parent, args)
            {
                //return _.find(authors, {id: parent.authorID});
                return Author.findById(parent.AuthorID);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args)
            {
                //return _.filter(books,{authorID:parent.id});
                return Book.find({authorID: parent.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args)
            {
               // _.find(books,{id:args.id});
               return Book.findById(args.id);
            }
        },

        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args)
            {
                return Author.findById(args.id);
                // _.find(authors,{id:args.id});
            }
        },

        books:
        {
            type: new GraphQLList(BookType),
            resolve(parent,args)
            {
               // return books;
               return Book.find({});
            }
        },
 
        authors:
        {
            type: new GraphQLList(AuthorType),
            resolve(parent,args)
            {
                // return authors;
                return Author.find({});
            }
        }

    }

})



const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        AddAuthor:
        {
            type: AuthorType,
            args: {name: {type: GraphQLString}, age: {type: GraphQLInt}},
            resolve(parent,args)
            {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                console.log("Saved author.");
                return author.save();
            }
        },
        AddBook:
        {
            type: BookType,
            args: {name: {type: GraphQLString}, genre: {type: GraphQLString}, authorID: {type: GraphQLID}},
            resolve(parent,args)
            {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID
                })
                console.log("Saved book.");
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation: Mutation
});