import { Link, router, useNavigation } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorCard from '../../../../../components/AuthorCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';


export default function Page() {

  const [authors, setAuthors] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: 'Authors' });
  }, [navigation]);

  useEffect(() => {
    axios.get('https://ajs-ca1-music-api.vercel.app/api/authors')
    .then(response => {
        console.log(response.data);
        setAuthors(response.data);
    })
    .catch(e => {
        console.log(e);
        })
}, []);

const onDelete = (id?: string) => {
    let newAuthors = authors.filter((author: any) => author._id !== id);
    setAuthors(newAuthors);
}

let authorsList = authors.map((author: any) => {
    return <AuthorCard key={author._id} author={author} onDelete={onDelete} />
})

  return (
  <ScrollView style={styles.container}>
        <Text variant="headlineSmall" style={styles.text1}>🎤 List of Authors</Text>
        <Button onPress={() => router.push('/home/authors/create')} style={styles.buttonAdd}><Text style={styles.textAdd}><Icon name="plus-circle" size={15} /> Author</Text></Button>
        {authorsList}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingBottom: 25,
  },
  text1:{
    marginTop: 20,
    textAlign: 'center',
    alignContent: 'center',
  },
  buttonAdd: {
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#000',
    marginLeft: 25,
    marginRight: 25,
    padding: 1
},
textAdd: {
    color: '#fff',
    fontWeight: 'bold',
},
})