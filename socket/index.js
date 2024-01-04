const http = require("http");
const socketIO = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const { Message } = require("../models/Message");
const { User } = require("../models/User");
const app = require("../index");
//const { findSocketByPrincipal } = require("./helpers/findSocket");
const History = require("../models/History");
const server = http.createServer(app);
//const io = socketIO(server);
const cors = require('cors');




app.use(cors());

principalSocketMap = {};

const io = socketIO(server, {
  cors: {
    origin: "*",  //["http://127.0.0.1:8080", "http://localhost:3001"], // Replace with the URL of your frontend app
    methods: ["GET", "POST"]
  }
});

function findSocketByPrincipal(principal) {
  const socketId = principalSocketMap[principal];
  return io.sockets.sockets.get(socketId);
}

//minter
// tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae

//ddate
// b5pqo-yef5a-lut3t-kmrpc-h7dnp-v3d2t-ls6di-y33wa-clrtb-xdhl4-dae

//hustlepreet
// nzi52-qfo3s-435lx-y7wx5-nleil-spy56-5expu-yrexx-7hgiy-hnaqe-yqe

//anonymous
// 2vxsx-fae

//default
//b5p7m-si2ig-xo4us-iqu6c-q4rql-w6pfk-l6qat-wgmjf-id2av-z3te7-gqe


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Retrieve the principal from the query parameter
  const userPrincipal = socket.handshake.query.principal; 

  //const userPrincipal = socket.principal;
  //principalSocketMap[userPrincipal] = socket.id;
  if (userPrincipal) {
    principalSocketMap[userPrincipal] = socket.id;
  }

  socket.on("sendMessage", async (data) => {
    try {
      const { fromPrincipal, toPrincipal, message, privateToken } =
        JSON.parse(data);
      const sender = await User.findOne({
        where: { principal: fromPrincipal, privateToken },
      });

      if (sender) {
        // Check if the recipient (toPrincipal) exists in the database
        const recipientExists = await User.findOne({
          where: { principal: toPrincipal },
        });

        console.log("recepient exits",recipientExists)

        if (recipientExists) {
          let history = await History.findOrCreate({
            where: {
              fromPrincipal,
              toPrincipal,
            },
            defaults: {
              fromPrincipal,
              toPrincipal,
              id: uuidv4(),
            },
          });

          // Save the message to the database
          const savedMessage = await Message.create({
            id: uuidv4(),
            fromPrincipal,
            toPrincipal,
            message,
          });

          console.log("message gets saved", savedMessage);

          // Send the message to the recipient
          const recipientSocket = findSocketByPrincipal(toPrincipal);

          console.log("recepient socket is right here ",recipientSocket);

          if (recipientSocket) {
            io.to(recipientSocket.id).emit("receiveMessage", {
              fromPrincipal,
              data: {
                id: uuidv4(),
                fromPrincipal,
                toPrincipal,
                message,
              },
            });
          } else {
            console.log(
              `Recipient with principal ${toPrincipal} is not connected.`
            );
          }
        } else {
          console.log(
            `Recipient with principal ${toPrincipal} does not exist.`
          );
        }
      } else {
        console.log(`Invalid private token for principal ${fromPrincipal}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete principalSocketMap[userPrincipal];
  });
});

module.exports = server;
