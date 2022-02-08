export const getChatList = (socket, eventEmitter, userId) => {
  console.log(userId);
  socket.emit("chat-list", userId);
  socket.on("chat-list-response", (data) => {
    eventEmitter.emit("chat-list-response", data);
  });
};

export const sendMessage = (socket, message) => {
  socket.emit("send-message", message);
};

export const receiveMessage = (socket, eventEmitter) => {
  socket.on("send-message-response", (data) => {
    console.log(data);
    eventEmitter.emit("send-message-response", data);
  });
};

export const exitChat = (socket, eventEmitter, userId) => {
  socket.emit("exit-chat", userId);
  socket.on("exit-chat-response", (data) => {
    eventEmitter.emit("exit-chat-response", data);
  });
};

export const getRandomUsers = (socket, data) => {
  socket.emit("get-random-users", {
    userId: data.userId,
    page: data.page,
    limit: data.limit,
    choices: data.choices
  });
};

export const like = (socket, data) => {
  socket.emit("like", data);
};

export const getLikes = (socket, eventEmitter) => {
  socket.on("like-response", (data) => {
    eventEmitter.emit("like-response", data);
  });
};
