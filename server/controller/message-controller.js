import Message from "../model/Message.js"
import Conversation from "../model/Conversation.js";

export const newMessage = async (request, response) => {
    try {
        const newMessage = new Message(request.body);

        await newMessage.save();
        await Conversation.findByIdAndUpdate(request.body.conversationId, {message: request.body.text});

        return response.status(200).json('Message has been sent successfully');
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getMessages = async (request, response) => {
    try {
        const messages = await Message.find({conversationId: request.params.id});
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const clearConversationMessages = async (request, response) => {
    try {
        await Message.deleteMany({ conversationId: request.params.id });
        await Conversation.findByIdAndUpdate(request.params.id, { message: "" });
        return response.status(200).json({ message: "Conversation messages cleared successfully" });
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const clearAllMessages = async (request, response) => {
    try {
        await Message.deleteMany({});
        await Conversation.deleteMany({});
        return response.status(200).json({ message: "All messages and conversations cleared successfully" });
    } catch (error) {
        return response.status(500).json(error.message);
    }
}