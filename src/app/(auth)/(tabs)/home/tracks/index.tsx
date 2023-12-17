import { Link, router, useNavigation } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TrackCard from '../../../../../components/TrackCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';


export default function Page() {

  const [tracks, setTracks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: 'Tracks' });
  }, [navigation]);

  useEffect(() => {
    axios.get('https://ajs-ca1-music-api.vercel.app/api/tracks')
    .then(response => {
        console.log(response.data);
        setTracks(response.data);
    })
    .catch(e => {
        console.log(e);
        })
}, []);

const onDelete = (id?: string) => {
    let newTracks = tracks.filter((track: any) => track._id !== id);
    setTracks(newTracks);
}

let tracksList = tracks.map((track: any) => {
    return <TrackCard key={track._id} track={track} onDelete={onDelete} />
})

  return (
  <ScrollView style={styles.container}>
        <Text variant="headlineSmall" style={styles.text1}>🎧 List of Tracks</Text>
        <Button onPress={() => router.push('/home/tracks/create')} style={styles.buttonAdd}><Text style={styles.textAdd}><Icon name="plus-circle" size={15} /> Track</Text></Button>
        {tracksList}
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