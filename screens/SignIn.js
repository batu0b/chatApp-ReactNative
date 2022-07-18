import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import {
 signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../App";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLOading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();


  const logIn = async() => {
    setIsLoading(true)
    try{
        await signInWithEmailAndPassword(auth,email,password)
        navigation.navigate('main')

    }
    catch (e){

        setIsLoading(false)
        setError(e.message)


    }



  }

  return (
    <View style={{ margin: 16 }}>

       { !!error &&( <Subheading style={{textAlign: "center" , color: "red" , marginBottom: 13 }}>{error}</Subheading>)}
  

      <TextInput
        label="email"
        style={{ margin: 16 }}
        onChangeText={(text) => setEmail(text)}
        keyboardType=  "email-address"
        value={email}
      />
      <TextInput
        label="passsword"
        style={{ margin: 16 }}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        value={password}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button compact onPress={() => navigation.navigate('SignUp') }>Sign Up</Button>
        <Button
          mode="contained"
          loading={isLOading}
          onPress={() => logIn()}
        
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};
export default SignIn;
