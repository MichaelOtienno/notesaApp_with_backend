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
let noteTitle = document.getElementById('noteTitle');
let noteBody = document.getElementById('noteBody');
let note_form = document.getElementById('note_form');
let noteError = document.getElementById('response');
note_form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let note_title = noteTitle.value.trim();
    let note_body = noteBody.value.trim();
    if (note_title === '' || note_body === '') {
        noteError.textContent = 'please fill all fields';
        setTimeout(() => {
            noteError.style.display = 'none';
            noteError.style.color = 'red';
        }, 3000);
        return;
    }
    try {
        const response = yield fetch('http://localhost:3500/notes/create', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "note_title": note_title,
                "note_body": note_body,
            })
        });
        if (response.ok) {
            const data = yield response.json();
            noteError.textContent = 'note created successfully';
            noteError.style.color = 'blue';
            console.log(data);
        }
        else {
            const errorData = yield response.json();
            console.log("Registration failed. Server returned:", errorData);
            noteError.textContent = `registration failed :${JSON.stringify({ errorData })}`;
            setTimeout(() => {
                noteError.style.color = 'red';
            }, 3000);
        }
    }
    catch (error) {
        const { message } = error;
        console.log(message);
        console.error("An error occurred during note creation:", error);
    }
}));
