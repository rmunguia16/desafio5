const socket = io();

// Escucho el evento 'products' y renderizo la tabla cuando lleguen productos
socket.emit('Starting socket connection', (socket) => {
    console.log('Starting socket connection');

    socket.on('products', (products) => {
        console.log(products);
    });

    socket.emit("Respuesta", "Hola soy el cliente");

});