console.log('Init my chat')
let socket
let user = sessionStorage.getItem('user') || ''
if(user){
    document.querySelector('#username').innerHTML = user + ': '
    initIo()
}
else{
    swal.fire({
        title: 'Autenticacion',
        input: 'text',
        text: 'Ingrese su nombre',
        inputValidator: value => {
            return !value.trim() && 'Por fabor ingrese su nombre'
        },
        allowOutsideClick: false
    }).then(result =>{
        user = result.value
        sessionStorage.setItem('user' , user)
        document.querySelector('#username').innerHTML = user + ': '
        initIo()
    })
}

 
const input = document.querySelector('#chatinput')
input.addEventListener('keyup', event => {
    if(event.key === 'Enter' && event.currentTarget.value.trim().length > 0 ) {
        sendMessage(event.currentTarget.value)
        
    }
})

document.querySelector('#send').addEventListener('click', event => {sendMessage(input.value)})

function sendMessage(message){
   if(message.trim().length > 0){
    socket.emit('message',{user,message} )
   } 
}

function initIo(){
    socket = io()
    socket.on('logs' , messages => {
        const box = document.querySelector('#chatbox')
        let html = ''
        messages.reverse().forEach(message => {
            html += `<p><i>${message.user}</i> : ${message.message}</p>`
        })
        box.innerHTML = html
    })
}
