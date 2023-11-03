let noteTitle = document.getElementById('noteTitle') as HTMLInputElement;
let noteBody = document.getElementById('noteBody') as HTMLInputElement;
let note_form = document.getElementById('note_form') as HTMLFormElement;
let noteError = document.getElementById('response') as HTMLElement

note_form.addEventListener('submit', async (e)=>{
    e.preventDefault()

    let title = noteTitle.value.trim()
    let body = noteBody.value.trim()

    if (title === '' || body === '') {
        noteError.textContent = 'please fill all fields'
        return; 
    }
    try {
        const response = await fetch('http://localhost:3600/notes/create', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "title": title,
                "body": body,
              
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            
        } else {
            const errorData = await response.json();
            console.log("Registration failed. Server returned:", errorData);
            noteError.textContent = `registration failed :${JSON.stringify({errorData})}`
        }
    } catch (error) {
        const {message}:any
         = error
        console.log(message);
        
        console.error("An error occurred during note creation:", error);
        
        
    }

 

})