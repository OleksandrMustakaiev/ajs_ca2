import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useSession } from '../../../../../contexts/AuthContext';
import { CategoryType } from '../../../../../types';
import { Text, Button, TextInput } from 'react-native-paper';


export default function Page() {
    const { session, isLoading } = useSession();
    const [error, setError] = useState('');
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: true, title: 'Category' });
    }, [navigation]);

    const [form, setForm] = useState<CategoryType>({
        name: "",
    });

    if(isLoading) return <Text>Loading...</Text>

    const handleChange = (e: any) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log(form)

        let formData = new FormData();
        formData.append('name', form.name);

        axios.post(`https://ajs-ca1-music-api.vercel.app/api/categories`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then(response => {
            console.log(response.data);
            // router.push(`/home/categories/${response.data._id}`);
        })
        .catch(e => {
            console.log(e);
            setError(e.response.data.errors.name.message);
        })
    }

  return(
    <>
        <Text variant="headlineSmall" style={styles.textMain}>Create new Category</Text>
        <Text style={styles.textInput}>Name</Text>
        <TextInput
            style={styles.input}
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            id="name"
        />
        <Text style={styles.error}>{error}</Text>
        <Button style={styles.button} onPress={handleClick}><Text style={styles.buttontext}>Create</Text></Button>
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