"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getAllNotes = exports.createNote = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../config/sqlConfig");
const notesValidator_1 = require("../validators/notesValidator");
const uuid_1 = require("uuid");
const dbhelpers_1 = __importDefault(require("../dbhelpers/dbhelpers"));
const dbhelper = new dbhelpers_1.default;
// create a note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { note_title, note_body } = req.body;
        const { error } = notesValidator_1.notesValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        let note_id = (0, uuid_1.v4)();
        // const pool = await mssql.connect(sqlConfig);
        // const request = pool.request();
        // request.input("note_id", mssql.VarChar, note_id);
        // request.input("note_title", mssql.VarChar, note_title);
        // request.input("note_body", mssql.VarChar, note_body);
        // const result = await request.execute('createNote');
        let result = yield dbhelper.execute('createNote', {
            note_id, note_title, note_body
        });
        if (result.returnValue !== 0) {
            return res.status(500).json({ error: "Failed to create note." });
        }
        return res.status(200).json({ message: 'Note created successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.createNote = createNote;
// get all notes
const getAllNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.query('SELECT * FROM note');
        if (pool.connected) {
            console.log('Database connected');
        }
        return res.status(200).json(result.recordset);
    }
    catch (error) {
        return res.status(500).send("notes not found");
    }
});
exports.getAllNotes = getAllNotes;
//get a single note by id
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.query(`SELECT * FROM note WHERE id = ${id}`);
        if (pool.connected) {
            console.log('Database connected');
        }
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json(result.recordset[0]);
    }
    catch (error) {
        return res.status(500).send("notes not found");
    }
});
exports.getNoteById = getNoteById;
//update a note by ID
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { note_title, note_body } = req.body;
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.query(`
            UPDATE note
            SET note_title = '${note_title}', note_body = '${note_body}'
            WHERE id = ${id}
        `);
        if (pool.connected) {
            console.log('Database connected');
        }
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(200).json({ message: 'Note updated successfully' });
    }
    catch (error) {
        return res.status(500).send("notes not found");
    }
});
exports.updateNote = updateNote;
// delete a note by ID
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const result = yield pool.query(`DELETE FROM note WHERE id = ${id}`);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        return res.status(204).json();
    }
    catch (error) {
        return res.status(500).send("note not deleted");
    }
});
exports.deleteNote = deleteNote;
