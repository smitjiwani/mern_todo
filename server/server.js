import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { getTodos, createTodo, updateTodo, deleteTodo, completeTodo } from './controllers/controller.js';

dotenv.config();



const app = express();
const port = process.env.PORT || 5000;
const connectionUrl = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

mongoose.connect(connectionUrl)
    .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message));



//can be added to a seprate file

//Get a todo
app.get('/todos', getTodos);
//Create a todo
app.post('/todos', createTodo);
//Update a todo
app.put('/todos/:id', updateTodo);    
//Delete a todo
app.delete('/todos/:id', deleteTodo);
//Complete a todo
app.patch('/todos/:id', completeTodo);


