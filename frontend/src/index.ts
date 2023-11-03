let noteTitle = document.getElementById('noteTitle') as HTMLInputElement;
let noteBody = document.getElementById('noteBody') as HTMLInputElement;
let note_form = document.getElementById('note_form') as HTMLFormElement;
let noteError = document.getElementById('response') as HTMLElement

note_form.addEventListener('submit', async (e)=>{
    e.preventDefault()

    let note_title = noteTitle.value.trim()
    let note_body = noteBody.value.trim()

    if (note_title === '' || note_body === '') {
        noteError.textContent = 'please fill all fields'
        setTimeout(() => {
            noteError.style.display = 'none'
            noteError.style.color = 'red'
            
        },3000);
       
        return; 
    }
    try {
        const response = await fetch('http://localhost:3500/notes/create', {
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
            const data = await response.json();
            noteError.textContent = 'note created successfully'
            noteError.style.color = 'blue'
            console.log(data);
            
        } else {
            const errorData = await response.json();
            console.log("Registration failed. Server returned:", errorData);
            noteError.textContent = `registration failed :${JSON.stringify({errorData})}`
            setTimeout(() => {
                noteError.style.color = 'red'
                
            },3000);
            
        }
    } catch (error) {
        const {message}:any
         = error
        console.log(message);
        
        console.error("An error occurred during note creation:", error);
        
        
    }

 

})