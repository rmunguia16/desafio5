const socket = io();

// Escucho el evento 'products' y renderizo la tabla cuando lleguen productos
socket.emit('mensaje', "Cliente: Conexión establecida");

socket.on('respuesta', (info) => {
    if(info){
        console.log(info);
        socket.emit('juego', "poker");
    }
});