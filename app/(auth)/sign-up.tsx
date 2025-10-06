// sign-in page
import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function SignUp() {
    return (
        <View>
            <Text>Sign Up</Text>
            <Button title="Sign In" onPress={()=> router.push("/sign-in")} />
        </View>
    )
}
