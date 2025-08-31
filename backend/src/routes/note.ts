import express from "express";
import {getNotes,createNote,deleteNote} from "../controllers/note"


const router=express.Router();

router.get('/getall/:userId',getNotes);
router.post('/create/:userId',createNote);
router.delete('/delete/:noteId',deleteNote);

export default router;

