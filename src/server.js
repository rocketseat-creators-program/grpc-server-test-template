const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const { bookstoreImpl, authorImpl } = require('./handlers')
const protoFile = require('path').resolve(__dirname, '../proto/bookstore.proto')

const protoObject = protoLoader.loadSync(protoFile)
const protoDefinition = grpc.loadPackageDefinition(protoObject)

const server = new grpc.Server()
server.addService(protoDefinition.Bookstore.service, bookstoreImpl)
server.addService(protoDefinition.Authors.service, authorImpl)

server.bindAsync(`0.0.0.0:${process.env.PORT || 50051}`, grpc.credentials.createInsecure(), (err, port) => {
  if (err) {
    throw err
  }
  server.start()
  console.log(`Server listening on ${port}`)
})
