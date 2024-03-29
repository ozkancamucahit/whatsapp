import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';



interface Props {

}

const otp = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0;
  const {bottom} = useSafeAreaInsets();
  const {signUp, setActive} = useSignUp();
  const {signIn} = useSignIn();

  const openLink = () => {
    Linking.openURL('https://meta.com');
  }

  const sendOTP = async () => {
    setLoading(true);
    try {
      await signUp?.create({
        phoneNumber
      });

      signUp?.preparePhoneNumberVerification();
      router.push(`/verify/${phoneNumber}`);
    } catch (error) {
      if(isClerkAPIResponseError(error)){
        if(error.errors[0].code === 'form_identifier_exists'){
          console.log('user exists');
          await trySignIn();
        }else{
          Alert.alert('Error', error.errors[0].message)
        }
      }
      
    }
    finally{
      setLoading(false);
    }
  }

  const trySignIn = async () => {
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor :any = supportedFirstFactors.find((factor :any) => {
      return factor.strategy === "phone_code";
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: "phone_code",
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);
  }
  

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size={"large"} color={Colors.primary}/> 
            <Text style={{fontSize: 16, padding: 10}}>Sending code...</Text>
          </View>
        )}
        <Text style={styles.description}>Verify your account</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>TURKEY</Text>
            <Ionicons name="chevron-down" size={24} color={Colors.primary} />
          </View>

          <View style={styles.separator} />
          <MaskInput
            value={phoneNumber}
            style={styles.input}
            placeholder='+90 your phone number'
            autoFocus
            inputMode='numeric'

            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked); // you can use the unmasked value as well
            }}
            mask={[
              "+",
              "9",
              "0",
              "(",
              /\d/,
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
          />
        </View>
        <Text style={styles.legal}>
          You must be{" "}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{" "}
          to register. Learn how Whatsapp works with the{" "}
          <Text style={styles.link} onPress={openLink}>
            Meta companies
          </Text>
        </Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={sendOTP}
          style={[
            styles.button,
            phoneNumber !== "" ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
          disabled={phoneNumber === ""}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
}

export default otp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20
  },
  description: {
    fontSize: 14,
    color: Colors.gray
  },
  list: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 10,
    padding: 10
  },
  listItem : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 6
  },
  listItemText : {
    fontSize: 18,
    color: Colors.primary
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.4
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000'
  },
  link: {
    color: Colors.primary
  },
  button:{
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: '500'
  },
  enabled:{
    backgroundColor: Colors.primary,
    color: '#FFF'
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
    fontWeight: 'bold'
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  }


})

