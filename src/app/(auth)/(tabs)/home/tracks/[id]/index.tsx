import axios from 'axios';
import { useEffect, useState } from 'react';
import { Text, Divider } from 'react-native-paper';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useSession } from '../../../../../../contexts/AuthContext'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Page() {
    const { session, isLoading } = useSession();
    const [track, setTrack] = useState<any>(null);
    const [error, setError] = useState('');
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({ headerShown: true, title: 'Track' });
    }, [navigation]);

    useEffect(() => {
        axios.get(`https://ajs-ca1-music-api.vercel.app/api/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then(response => {
            console.log(response.data);
            setTrack(response.data);
        })
        .catch(e => {
            console.log(e);
            setError(e.response.data.msg);
            })
    }, [])

    if(isLoading) return <Text>Loading...</Text>

    if(!track) return <Text>{error}</Text>;

  return(
    <ScrollView style={styles.container}>
        <Text variant="headlineLarge" style={styles.text1}>{track.title}</Text>
        <Text variant="headlineMedium" style={styles.text2}>{track.lyrics}</Text>
        <Divider />
        <Text style={styles.text3}>🎹 Producer: {track.user?.full_name}</Text>
        <Text style={styles.text3}>🎤 Author: {track.authors[0]?.name}</Text>
        <Text style={styles.text3}>📚 Categories: {track.categories[0]?.name}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingBottom: 25,
  },
  text1: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
},
text2: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
},
text3: {
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
},
})
