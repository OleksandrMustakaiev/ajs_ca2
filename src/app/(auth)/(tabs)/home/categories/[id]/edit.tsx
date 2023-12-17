import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '../../../../../../contexts/AuthContext';
import { CategoryType } from '../../../../../../types/';
import { Text, Button, TextInput } from 'react-native-paper';


export default function Page() {
    const { session, isLoading } = useSession();
    const [category, setCategory] = useState<any>(null);
    const [error, setError] = useState('');
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({ headerShown: true, title: 'Category' });
    }, [navigation]);

    const [form, setForm] = useState<CategoryType>({
        name: ""
    });

    useEffect(() => {
        axios.get(`https://ajs-ca1-music-api.vercel.app/api/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then(response => {
            console.log(response.data);
            setCategory(response.data);
            setForm(response.data);
        })
        .catch(e => {
            console.log(e);
            setError(e.response.data.message);
            })
    }, [])

    if(isLoading) return <Text>Loading...</Text>

    if(!category) return <Text>{error}</Text>;

    const handleChange = (e: any) => {
        console.log(e.target.value);

        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log(form)

        axios.put(`https://ajs-ca1-music-api.vercel.app/api/categories/${id}`, form, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then(response => {
            console.log(response.data);
            router.push(`/home/categories`);
        })
        .catch(e => {
            console.log(e);
            setError(e.response.data.message);
        })
    }

  return(
    <>
        <Text variant="headlineSmall" style={styles.textMain}>Edit Category</Text>
        <Text style={styles.textInput}>Name</Text>
        <TextInput
                style={styles.input}
                placeholder="Name"
                onChange={handleChange}
                value={form.name}
                id="name"
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