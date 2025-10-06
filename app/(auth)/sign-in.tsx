// sign-in page
import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function SignIn() {
    return (
        <View>
            <Text>Sign In</Text>
            <Button title="Sign Up" onPress={()=> router.push("/sign-up")} />
        </View>
    )
}
