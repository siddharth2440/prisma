import {config} from "dotenv"
import express from "express"
import { PrismaClient } from "@prisma/client"
import bodyParser from "body-parser";
config();
const prisma = new PrismaClient();
const app = express();
const PORT = 5003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",async (req,res)=>{
    const allUsers =await prisma.user.findMany()
    return res.json(allUsers)
})

app.post("/",async (req,res)=>{
    const {firstName,lastName,age} = req.body;
    // const newUser = await prisma.user.create({data:req.body});
    const newUser = await prisma.user.create({data:{firstName,lastName,age}});
    return res.json(newUser)
})

app.put("/:id",async (req,res)=>{
    const {id} = req.params;
    const {newAge} = req.body;
    // const findSpecificUser = await prisma.user.findUnique( {where : { id:parseInt(id) }} );
    const updateTheUser = await prisma.user.update( { where:{id:parseInt(id)} , data:{age:newAge} } );
    return res.json(updateTheUser);
    // return res.json(findSpecificUser);
})

app.delete("/:id",async (req,res)=>{
    const {id} = req.params;
    const deleteUser = await prisma.user.delete({ where : { id : parseInt(id)} })
    return res.json(deleteUser);
})

app.delete("/",async (req,res)=>{
    const deleteAllUsers = await prisma.user.deleteMany();
    return res.json({"message":"All user deleted successfully"});
})

app.post("/house",async (req,res)=>{
    const newHouse = await prisma.house.create( { data : req.body} );
    return res.json(newHouse);
})

app.get("/house/:id",async (req,res)=>{
    // const allHouses = await prisma.house.findUnique(
    //     {   
    //         where : { id: +req.params.id },
    //         include:{ owner :true ,built : true },
    //     }
    // );
    const allHouses = await prisma.house.findUnique({
        where:{id:parseInt(req.params.id)},
        include:{owner:false,built:false}
    })
    // console.log(allHouses.built);
    return res.json(allHouses);
})

app.post("/house/many",async (req,res)=>{
    // await prisma.ho
    const createManyHouses = await prisma.house.createMany({data:req.body});
    return res.json(createManyHouses);
})

app.get("/house",async (req,res)=>{
    const allHouses = await prisma.house.findMany();
    return res.json(allHouses);
})

app.get("/user/averageAge",async (req,res)=>{
    const avgAge = await prisma.user.aggregate({
      _avg:{
        age:true                          // return s the average age of all users
      },
      _count:{
        id:true                           // return the total number of the users
      },
      _max:{
        age:true                          // return the maximum age among all users 
      },
      _min:{
        age:true                          // return the minimum age among all users
      }
    })
    return res.json(avgAge);
})

app.get("/user/checkname",async (req,res)=>{
    // console.log("Hitting");
    const userCount = await prisma.user.count();   //count the total number of the users in the model user
    // console.log(userCount);
    const checkName = await prisma.user.aggregate({     // using aggregations
        where:{
            firstName:{
                startsWith:"C"
            }
        },
        _count:{
            id:true 
        }
    })

    res.json(checkName);
})

//  --------- Use of the Logical operators --------------------

// const result = await prisma.user.findMany({
//     where: {
//       OR: [
//         {
//           email: {
//             endsWith: 'prisma.io',
//           },
//         },
//         { email: { endsWith: 'gmail.com' } },
//       ],
//       NOT: {
//         email: {
//           endsWith: 'hotmail.com',
//         },
//       },
//     },
//     select: {
//       email: true,
//     },
// })

app.listen(PORT,()=>console.log(`Server is running in the PORT = ${PORT}`));