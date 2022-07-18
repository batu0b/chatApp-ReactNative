import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile
} from "firebase/auth";
import { auth } from "../App";
import { useNavigation } from "@react-navigation/native";
import { user } from "../App";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLOading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const CreateUser = async () => {
    setIsLoading(true);

    try {
 await createUserWithEmailAndPassword(auth, email, password);

 await updateProfile(auth.currentUser,{displayName: name}).catch((e) => console.log(e.message))


     
    await navigation.navigate('main')
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setError(e.message)
    }
  };

  return (
    <View style={{ margin: 16 }}>

       { !!error &&( <Subheading style={{textAlign: "center" , color: "red" , marginBottom: 13 }}>{error}</Subheading>)}
      <TextInput
        label="name"
        style={{ margin: 16 }}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        label="email"
        style={{ margin: 16 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        label="passsword"
        style={{ margin: 16 }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        
        secureTextEntry
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button compact onPress={() => navigation.navigate('SignIn') }>Sign In</Button>
        <Button
          mode="contained"
          loading={isLOading}
          onPress={() => CreateUser()}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
};
export default SignUp;
