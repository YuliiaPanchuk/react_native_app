import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';

const Login = props => {
  const [email, setEmail] = useState('your@email.com');
  const [password, setPassword] = useState('ssseeeecrreeet');

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Login</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={email => setEmail(email)} // to update those state values when the user types into them
            defaultValue="your@email.com"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)} // to update those state values when the user types into them
            defaultValue="ssseeeecrreeet"
          />
        </View>

        <View style={styles.sectionContainer}>
          <Button
            title="Login"
            onPress={() => props.doLogin(email, password)}></Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingRight: 12,
    paddingLeft: 12,
    marginTop: 12,
  },
  body: {
    backgroundColor: Colors.white,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default Login;
