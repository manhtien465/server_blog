const graphql=require("graphql");
const _=require("lodash")
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql;

var books=[
    {name:"name off the wind",genre:"fantasy",id:"1",authorId:"1"},
    {name:"the final emprire",genre:"fantasy",id:"2",authorId:"2"},
    {name:"the long earth",genre:"sci-fi",id:"3",authorId:"3"},
    {name:"the fuck bitch",genre:"comody",id:"3",authorId:"2"},
    {name:"hey what's up guy",genre:"detective",id:"3",authorId:"1"},
    {name:"sex education",genre:"love story",id:"3",authorId:"3"},
]
var authors=[
    {name:"tien",age:"43",id:"1"},
    {name:"nguyen",age:"67",id:"2"},
    {name:"manh",age:"23",id:"3"},
]
const BookType =new GraphQLObjectType({
    name:'book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors,{id:parent.authorId})
                
            }
        }
    })
})
const AuthorType =new GraphQLObjectType({
    name:'author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }
    })
})
const RootQuery =new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               return _.find(books,{id:args.id})
              //code to get data from db/other sources
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query:RootQuery
})
