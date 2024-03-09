const database = require("../dbConnect");
const asyncHandler = require("express-async-handler");

const sendMessage=asyncHandler(async(req,res)=>{
    try {
        const { message } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user.id;
        console.log(senderId, receiverId, message);

        //Find or create a convo b/w the participants
        const findOrCreateConversationQuery = `
            WITH new_conversation AS (
                INSERT INTO conversations (created_at, updated_at)
                VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING id
            )
            INSERT INTO conversation_participants (conversation_id, user_id)
            SELECT id, ${senderId} FROM new_conversation
            UNION
            SELECT id, ${receiverId} FROM new_conversation
            RETURNING conversation_id;
        `;
        const { rows: [{ conversation_id: conversationId }] } = await database.query(findOrCreateConversationQuery);

        //Create new message
        const createMessageQuery = `
            INSERT INTO messages (sender_id, receiver_id, message, created_at, updated_at)
            VALUES (${senderId}, ${receiverId}, '${message}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING id;
        `;
        const { rows: [{ id: messageId }] } = await database.query(createMessageQuery);

        // Add message to the convo
        const addMessageToConversationQuery = `
            INSERT INTO conversation_messages (conversation_id, message_id)
            VALUES (${conversationId}, ${messageId});
        `;
        await database.query(addMessageToConversationQuery);

        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" + error});
    }
});

const getMessages = async (req, res) => {
    try {
        const userToChatId  = req.params.id;
        const senderId = req.user.id;

        const getMessagesQuery = `
            SELECT m.*
            FROM conversation_messages cm
            JOIN messages m ON cm.message_id = m.id
            WHERE cm.conversation_id IN (
                SELECT cp.conversation_id
                FROM conversation_participants cp
                WHERE cp.user_id = $1
                    AND cp.conversation_id IN (
                        SELECT cp.conversation_id
                        FROM conversation_participants cp
                        WHERE cp.user_id = $2
                    )
            )
        `;

        const values = [senderId, userToChatId];

        const result = await database.query(getMessagesQuery, values);

        const messages = result.rows;

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports={sendMessage, getMessages};