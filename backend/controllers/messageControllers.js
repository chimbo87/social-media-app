import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import { getRecipientSocketId } from "../socket/socket.js";

async function sendMessage(req, res) {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recipientId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });
      await conversation.save();
    }
    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
    });

    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: {
          text: message,
          sender: senderId,
        }
      })
    ]);
    const recipientSocketId = getRecipientSocketId(recipientId);
   if(recipientSocketId){
    io.to(recipientSocketId).emit("newMessage", newMessage)
   }
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getMessages(req, res){
    const {otherUserId}= req.params;
    const userId = req.user._id;
    try{
        // console.log("User ID:", userId);
        // console.log("Other User ID:", otherUserId);

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        });

        if(!conversation){
            // console.log("Conversation not found");
            return res.status(404).json({error:"Conversation not found"})
        }

        console.log("Found conversation:", conversation);

        const messages = await Message.find({
            conversationId: conversation._id
        }).sort({createdAt: 1});

        console.log("Found messages:", messages);

        res.status(200).json(messages);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

async function getConversations(req, res){
    const userId = req.user._id;
try{
    const conversations = await Conversation.find({participants: userId}).populate({
        path: "participants",
        select: "username profilePic"
    });
    //remove the current user from the particiapnt array
    conversations.forEach(conversation => {
      conversation.participants = conversation.participants.filter(
        participant => participant._id.toString() !== userId.toString()
      )
    })
    res.status(200).json(conversations);
}catch(error){
    res.status(500).json({error: error.message});
}
}

export { sendMessage, getMessages, getConversations };
