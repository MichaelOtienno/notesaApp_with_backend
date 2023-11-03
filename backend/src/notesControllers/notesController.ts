import { Request, Response } from "express";
import mssql from 'mssql'
import { sqlConfig } from "../config/sqlConfig";
import { notesValidationSchema } from "../validators/notesValidator";
import { v4 } from "uuid";
import Connection from "../dbhelpers/dbhelpers";
const dbhelper = new Connection

// create a note
export const createNote = async (req: Request, res: Response) => {
    try {
        let { note_title, note_body } = req.body;
        const { error } = notesValidationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        let note_id = v4();

        // const pool = await mssql.connect(sqlConfig);
        // const request = pool.request();
        // request.input("note_id", mssql.VarChar, note_id);
        // request.input("note_title", mssql.VarChar, note_title);
        // request.input("note_body", mssql.VarChar, note_body);
         // const result = await request.execute('createNote');

          let result =  await dbhelper.execute('createNote',{
            note_id,note_title,note_body
        });

       

        if (result.returnValue !== 0) {
            return res.status(500).json({ error: "Failed to create note." });
        }

        return res.status(200).json({ message: 'Note created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


// get all notes
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.query('SELECT * FROM note');

        if (pool.connected) {
            console.log('Database connected');
        }

        return res.status(200).json(result.recordset);
    } catch (error) {
        return res.status(500).send("notes not found");
    }
};

//get a single note by id
export const getNoteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.query(`SELECT * FROM note WHERE id = ${id}`);

        if (pool.connected) {
            console.log('Database connected');
        }

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        return res.status(200).json(result.recordset[0]);
    } catch (error) {
        return res.status(500).send("notes not found");
    }
};


//update a note by ID
export const updateNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { note_title, note_body } = req.body;

    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.query(`
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
    } catch (error) {
        return res.status(500).send("notes not found");
    }
};


// delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.query(`DELETE FROM note WHERE id = ${id}`);


        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).send("note not deleted")
    }
};




