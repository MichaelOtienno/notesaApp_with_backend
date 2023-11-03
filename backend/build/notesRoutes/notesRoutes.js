"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notesController_1 = require("../notesControllers/notesController");
const notes_router = (0, express_1.Router)();
notes_router.post('/create', notesController_1.createNote);
// notes_router.get('/', getAllNotes);
// notes_router.get('/:id', getNoteById);
// notes_router.put('/:id', updateNote);
// notes_router.delete('/:id', deleteNote);
exports.default = notes_router;
