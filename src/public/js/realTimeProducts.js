const socket = io()

const form = document.getElementById('formProduct');

socket.emit('connection', 'Conexión establecida');

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log(e.target);
    const datForm = new FormData(e.target) //formulario que dispara el evento
    const product = Object.fromEntries(datForm) //convierte el formulario en un objeto
    console.log(product);
    socket.emit('newProduct', product)
});
socket.on('agregar', (respuesta) => {
    console.log(respuesta);
});