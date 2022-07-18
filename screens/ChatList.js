import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {
  List,
  Avatar,
  Divider,
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
} from "react-native-paper";
import { useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../App";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { messages } from "../App";
const ChatList = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setEmail(user?.email ?? "");
    });
  }, []);

  const navigation = useNavigation();

  const createChat = async () => {
    if (!email || !userEmail) return;

    setIsLoading(true);

    const response = await addDoc(collection(db, "chats"), {
      users: [email, userEmail],
    });

    setUserEmail("");
    setIsLoading(false);
    setIsVisible(false);
    navigation.navigate("Chat", { chatId: response.id });
  };

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const m = query(messages, where("users", "array-contains", email));

    onSnapshot(m, (snapshot) => {
      setChats(snapshot.docs);
    });
  }, [email]);

  

  return (

  
    <View style={{ flex: 1 }}>
      {chats.map((chat) => (

        

        <React.Fragment>
      
          <List.Item
            title={chat.data().users.filter((x) => x !== email)}
            description={chat.data().messages ? chat.data().messages[0].text : "" }
            left={() => (
              <Avatar.Text
                label={chat.data().users.find((x) => x !== email)[0]}
                size={46}
              />
            )}
            onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
          />

          <Divider inset style={{ backgroundColor: "black" }} />
        </React.Fragment>
      ))}

      <Portal>
        <Dialog visible={isVisible} onDismiss={() => setIsVisible(false)}>
          <Dialog.Title>New Chat</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Enter User Email"
              value={userEmail}
              onChangeText={(text) => setUserEmail(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button loading={isLoading} onPress={() => createChat()}>
              Save
            </Button>
            <Button onPress={() => setIsVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 15, right: 15 }}
        onPress={() => setIsVisible(true)}
      />
    </View>
  );
};
export default ChatList;
