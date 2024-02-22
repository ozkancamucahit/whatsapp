import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
// import { welcomeImage } from "@/assets/images/splash.png";
const welcomeImage = require("@/assets/images/welcome.png");

const welcome_image_uri = Image.resolveAssetSource(welcomeImage)?.uri;
// console.log(' ==> TEST :', welcomeImage);
interface Props {

}

const Page = (props: Props) => {

  const openLink = () => {
    Linking.openURL('https://meta.com');
  }



  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image_uri }} style={styles.welcome} />
      <Text style={styles.headline}>Welcome</Text>
      <Text style={styles.description}>
        Read our{" "}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        {'Tap "Aggree & Continue" to accept the '}
        <Text style={styles.link} onPress={openLink}>
          Terms Of Service
        </Text>
      </Text>
      <Link href={"/otp"} asChild replace>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>AGREE & CONTINUE</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  welcome: {
    width: "100%",
    height: 300,
    marginBottom: 80,
  },
  headline: {
    fontSize: 21,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold'
  },
});