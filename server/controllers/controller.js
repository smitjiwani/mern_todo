import mongoose from "mongoose";
import Todos from "../models/model.js";

//Get a todo
export const getTodos = async (req, res) => {
    try {
        const allTodos = await Todos.find({}).sort({ createdAt: -1 });
        res.status(200).json(allTodos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Create a todo
export const createTodo = async (req, res) => {
    const todo = req.body;
    const newTodo = new Todos(todo);
    try {
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//Update a todo
export const updateTodo = async (req, res) => {
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('No todo with that id');
        }
        const todoId = {id : _id}
        const newTodo = await Todos.create(Todos);
        res.status(200).json(newTodo);
    }catch{
        res.status(404).json({ message: error.message });
    }
}

//Delete a todo
export const deleteTodo = async (req, res) => {
    const {id} = req.params;
    try{
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No todo with that id');
    }
    await Todos.findByIdAndRemove(id);
    res.status(200).json({message: 'Todo deleted successfully'});
    }catch{
        res.status(404).json({ message: error.message });
    }
}

// complete a todo
export const completeTodo = async (req, res) => {
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('No todo with that id');
        }
        const todo = await Todos.findById(id);
        const updatedTodo = await Todos.findByIdAndUpdate(id, {completed: !todo.completed}, {new: true});
        res.status(200).json(updatedTodo);
    }catch{
        res.status(404).json({ message: error.message });
    }
}
