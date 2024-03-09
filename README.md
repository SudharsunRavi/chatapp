Database name: chatapp
Table name: users, messages

# Table structure

CREATE TABLE messages (
 id SERIAL PRIMARY KEY,
 sender_id INTEGER REFERENCES users(id) NOT NULL,
 receiver_id INTEGER REFERENCES users(id) NOT NULL,
 message TEXT NOT NULL,
 created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversations (
 id SERIAL PRIMARY KEY,
 created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversation_participants (
 conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
 user_id INTEGER REFERENCES users(id), -- Assuming you have a 'users' table
 PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE conversation_messages (
 conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
 message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
 PRIMARY KEY (conversation_id, message_id)
);
s