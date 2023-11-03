import joi from 'joi';

export const notesValidationSchema = joi.object({
    note_title:joi.string().required().min(2).max(3000),
    note_body:joi.string().required().min(1).max(10000),
   

});

