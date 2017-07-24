// /services/index.js
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

const socket = io(process.env.FEATHERS_URL)

export const app = feathers().configure(socketio(socket))

export const contactsService = app.service('contacts')
