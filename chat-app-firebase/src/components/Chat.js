import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app'; 
import { db, auth } from '../firebase';
import SendMessage from './SendMessage';
import SignOut from './SignOut';

function Chat() {
    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
       
        const oneToOneMessagesUnsubscribe = db.collection('messages')
            .where('users', 'array-contains', auth.currentUser.uid)
            .orderBy('createdAt')
            .limit(50)
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()));
            });

     
        const groupMessagesUnsubscribe = db.collection('group_messages')
            .orderBy('createdAt')
            .limit(50)
            .onSnapshot(snapshot => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    ...snapshot.docs.map(doc => doc.data())
                ]);
            });

      
        const userGroupsUnsubscribe = db.collection('groups')
            .where('members', 'array-contains', auth.currentUser.uid)
            .onSnapshot(snapshot => {
                setGroups(snapshot.docs.map(doc => doc.data()));
            });

        return () => {
            oneToOneMessagesUnsubscribe();
            groupMessagesUnsubscribe();
            userGroupsUnsubscribe();
        };
    }, []);

    const createGroup = () => {
        const groupName = prompt('Enter group name:');
        if (groupName) {
            db.collection('groups').add({
                name: groupName,
                creatorId: auth.currentUser.uid,
                members: [auth.currentUser.uid]
            });
        }
    };

    const joinGroup = () => {
        const groupId = prompt('Enter group ID:');
        if (groupId) {
            db.collection('groups').doc(groupId).update({
                members: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
            });
        }
    };

    return (
        <div>
            <SignOut />
            <div className="groups">
                <h2>My Groups</h2>
                <button onClick={createGroup}>Create Group</button>
                <button onClick={joinGroup}>Join Group</button>
                <ul>
                    {groups.map(group => (
                        <li key={group.groupId}>{group.name}</li>
                    ))}
                </ul>
            </div>
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid, isGroup }) => (
                    <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                        <img src={photoURL} alt="" />
                        <p>{text}</p>
                        {isGroup && <span>Group Message</span>}
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    );
}

export default Chat;
