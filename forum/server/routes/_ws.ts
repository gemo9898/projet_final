import { WebSocketServer } from 'ws' // Asegúrate de importar WebSocketServer
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Crear el servidor WebSocket
  const wsServer = new WebSocketServer({
    noServer: true, // Usamos el servidor HTTP de H3 para manejar la conexión
  })

  // Evento para cuando se establezca una nueva conexión WebSocket
  wsServer.on('connection', (ws) => {
    console.log('Nuevo cliente conectado')

    // Evento para recibir mensajes desde el cliente
    ws.on('message', (message) => {
      console.log('Mensaje recibido:', message)
      // Puedes agregar lógica para manejar el mensaje recibido
    })

    // Enviar un mensaje al cliente al conectarse
    ws.send(JSON.stringify({ message: 'Conexión WebSocket establecida' }))
  })

  // Aquí estamos utilizando el servidor HTTP de H3 para manejar las solicitudes de WebSocket
  event.node.res.socket.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
      wsServer.emit('connection', ws, request)
    })
  })
})
