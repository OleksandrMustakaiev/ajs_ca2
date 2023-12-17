import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useSession } from '../../../../contexts/AuthContext';
import LoginForm from '../../../../components/LoginForm';

export default function Profile() {

  const { session, signOut } = useSession();
  
  return (
    <>
    {(!session) ? <LoginForm /> : (
      <View style={styles.container}>
            <Button style={styles.buttonLogout} mode="contained" onPress={signOut}>Logout</Button>
      </View>
    )}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogout:{
    backgroundColor: '#000',
    borderColor: '#000',
    padding: 3,
    marginLeft: 6,
    borderRadius: 4,
  },
});
