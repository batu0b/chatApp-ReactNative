import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { doc, onSnapshot,setDoc } from "firebase/firestore";
import { auth, db } from "../App";
import { GiftedChat } from "react-native-gifted-chat";
import { onAuthStateChanged } from "firebase/auth";

const Chat = () => {
  const route = useRoute();
  const [messages, setMessages] = useState();
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUid(user?.uid?? "")
      setName(user?.displayName?? "")
    });
  }, []);

  useEffect(() => {
    const messageId = doc(db, "chats/" + route.params.chatId);

    return onSnapshot(messageId, (snapshot) => {
      setMessages(snapshot.data()?.messages ?? []);
    });
  }, [route.params.chatId]);

  const onSend = (m = []) => {

    

   setDoc( doc(db, "chats/" + route.params.chatId) ,{

        messages: GiftedChat.append(messages, m)
    }, {merge: true})
    



  };


  return ( 

    <View style={{flex: 1 , backgroundColor: "white"}}>
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: uid,
        name: name
      }}
    />
    </View>
  );
};
export default Chat;
