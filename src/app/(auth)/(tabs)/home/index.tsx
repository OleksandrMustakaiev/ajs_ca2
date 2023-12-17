import { Link, router, useNavigation } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { Text, Button, Card } from 'react-native-paper';


export default function Home() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View>
      <Text variant="headlineSmall" style={styles.text1}>Hey There 👋</Text>
      <Text style={styles.text2}>Explore some music lyrics!</Text>
      <Card style={styles.img}>
        <Card.Cover source={{ uri: 'https://i.pinimg.com/originals/ab/45/bb/ab45bb4451536652faca51ae4f42d5dd.gif' }} />
      </Card>
      <Button onPress={() => router.push('/home/categories')} style={styles.buttonTop} mode="outlined"><Text>📚 Categories</Text></Button>
      <Button onPress={() => router.push('/home/tracks')} style={styles.button} mode="outlined"><Text>🎧 Tracks</Text></Button>
      <Button onPress={() => router.push('/home/authors')} style={styles.button} mode="outlined"><Text>🎤 Authors</Text></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 25,
    margin: 12,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },

  text1: {
      color: '#000',
      textAlign: 'center',
      marginTop: 90,
  },
  text2: {
    color: '#777',
    fontWeight: 'normal',
    textAlign: 'center',
},
buttonTop: {
  marginTop: 70,
  borderWidth: 0.5,
  borderRadius: 4,
  backgroundColor: '#fff',
  marginRight: 70,
  marginLeft: 70,
},
  button: {
      marginTop: 10,
      borderWidth: 0.5,
      borderRadius: 4,
      backgroundColor: '#fff',
      marginRight: 70,
      marginLeft: 70,
  },
  spacer: {
    marginTop: 50
  },
  img:{
    marginTop: 50,
    marginRight: 70,
    marginLeft: 70, 
  }
});