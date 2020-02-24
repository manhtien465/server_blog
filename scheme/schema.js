const graphql=require("graphql");
const _=require("lodash")
const Books= require("../modal/book")
const Authors =require("../modal/author")
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull}=graphql;


const BookType =new GraphQLObjectType({
    name:'book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
               
                return Authors.findById(parent.authorId)
                
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
                return Books.find({authorId:parent.id})
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
               return Books.findById(args.id)
              //code to get data from db/other sources
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Authors.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Books.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return Authors.find({})
            }
        }
    }
});
const Mutation= new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                let author=new Authors({
                    name:args.name,
                    age:args.age
                })
               return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                let book =new Books({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return book.save()
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
