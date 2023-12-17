import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '../../../../../../contexts/AuthContext';
import { AuthorType } from '../../../../../../types';
import { Text, Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


export default function Page() {
    const { session, isLoading } = useSession();
    const [author, setAuthor] = useState<any>(null);
    const [error, setError] = useState('');
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({ headerShown: true, title: 'Author' });
    }, [navigation]);

    const [form, setForm] = useState<AuthorType>({
        name: "",
        image_path: "",
        tracks: "",
    });

    useEffect(() => {
        axios.get(`https://ajs-ca1-music-api.vercel.app/api/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then(response => {
            console.log(response.data);
            setAuthor(response.data);
            setForm(response.data);
        })
        .catch(e => {
            console.log(e);
            setError(e.response.data.message);
            })
    }, [])

    if(isLoading) return <Text>Loading...</Text>

    if(!author) return <Text>{error}</Text>;

    const handleChange = (e: any) => {
        console.log(e.target.value);

        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log(form)

        axios.put(`https://ajs-ca1-music-api.vercel.app/api/authors/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then(response => {
            console.log(response.data);
            router.push(`/home/authors`);
        })
        .catch(e => {
            console.log(e);
            setError(e.response.data.message);
        })
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!result.canceled) {
    
            let uri = result.assets[0].uri;
                
                console.log("image", uri);
          } else {
            alert('You did not select any image.');
          }
        }

  return(
    <>
        <Text variant="headlineSmall" style={styles.textMain}>Edit Author</Text>
        <Text style={styles.textInput}>Name</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            id="name"
        />
        <Text style={styles.textInput}>Image</Text>
        {/* <Button style={styles.buttonImage}  id="image" value={form.image} onChange={handleChange} onPress={pickImageAsync}><Text style={styles.buttontext}>Upload Image</Text></Button> */}

        <Text style={styles.textInput}>Track</Text>
        <TextInput
            style={styles.input}
            placeholder="Track"
            onChange={handleChange}
            value={form.tracks}
            id="tracks"
        />
        <Button style={styles.button} onPress={handleClick}><Text style={styles.buttontext}>Edit</Text></Button>
    </>
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
    textMain:{
        marginTop: 20,
        textAlign: 'center',
        alignContent: 'center',
      },
    textInput: {
        color: '#777',
        fontWeight: 'normal',
        marginLeft: 12,
        marginTop: 12,
    },
    button: {
        marginTop: 25,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#000',
        margin: 10,
        padding: 4
    },
    buttonImage: {
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#000',
        margin: 10,
        padding: 4
    },
    buttontext: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: '#ff4757',
        textAlign: 'center',
        fontWeight: 'bold',
    }
  });