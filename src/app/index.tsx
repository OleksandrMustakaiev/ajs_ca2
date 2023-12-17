import { Button, PaperProvider, Text } from 'react-native-paper';
import { Redirect } from 'expo-router';
import { useSession } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { SafeAreaView, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Page() {

  const { session, signOut } = useSession();

  // const ComponentChange = () => {
  //   const clicked = () => {
  //   if(pressed){
  //     return <RegisterForm />
  //   }else{ return <LoginForm /> }
  // }
  //   return(
  //     {clicked}
  //     <Text>hwllo<Button>Create acc</Button></Text>
  //   )
  // }

  return(
    <SafeAreaView style={styles.container}>
      <PaperProvider>
        {(!session) ? <LoginForm /> : (<Redirect href="/home" />)}
        {/* <Redirect href="/home" /> */}
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});