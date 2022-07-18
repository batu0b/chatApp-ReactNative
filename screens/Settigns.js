import Reac , {useEffect, useState} from "react";
import { Text, View } from "react-native";
import {Avatar,Title,Subheading,Button} from "react-native-paper"
import { auth,  } from "../App";
import {signOut} from  "firebase/auth"
import { useNavigation } from "@react-navigation/native";

import {onAuthStateChanged} from "firebase/auth"


const Settings = () => {

   const  [userName,setUserName] = useState("")
   const  [email,setEmail] = useState("")


    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            setUserName(user?.displayName?? "")
            setEmail(user?.email ?? "")

          
        })

    } ,[])

    const navigation = useNavigation()
    const logOut = async() => {

        await signOut(auth)
       

    }

    return ( 
        <View style={{alignItems:"center" , marginTop: 16}}>
            <Avatar.Text size={56} label={userName[0]} />
            <Title> {userName} </Title>
            <Subheading>{email} </Subheading>
            <Button onPress={() => logOut()}>Sign Out</Button>

            
        </View>
     );
}
export default Settings ;