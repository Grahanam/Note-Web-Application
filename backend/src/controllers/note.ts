import { Request,Response } from "express";
import Note from '../models/Note';
import User from "../models/User"

// Create Note
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const { userId } = req.params;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const note = await Note.create({
      title,
      user: userId
    });
    
    res.status(201).json({
      data: note,
      message: 'Note created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
};

//Delete Note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { noteId } = req.params;
    
    const deletedNote = await Note.findByIdAndDelete(noteId);
    
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json({
      message: 'Note deleted successfully',
      data: deletedNote
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
};

//Get Notes by UserId
export const getNotes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const notes = await Note.find({ user: userId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      message: 'Notes retrieved successfully',
      data: notes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error });
  }
};

