import { StyleSheet } from "react-native";
import axios from 'axios';
import { useState } from "react";
import { useSession } from "../contexts/AuthContext";
import { RegisterFormType } from "../types";
import { TextInput, Text, Button } from 'react-native-paper';
import { Redirect } from "expo-router";

export default function LoginForm(){

    const { signIn } = useSession();

    const [form, setForm] = useState<RegisterFormType>({
        full_name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = () => {
        console.log('clicked', form);

        axios.post('https://ajs-ca1-music-api.vercel.app/api/users/register', {
            full_name: form.full_name,
            email: form.email,
            password: form.password
        })
            .then((response) => {
                <Redirect href="/home" />
            })
            .catch((e) => {
                console.error(e);
                setError(e.response.data.msg);
            });
    }

    return(
        <>
            <Text style={styles.text1} variant="headlineLarge">Register Your Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChange={handleChange}
                value={form.full_name}
                id="full_name"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                id="email"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                id="password"
            />
            <Text style={styles.error}>{error}</Text>
            <Button style={styles.button} onPress={handleClick} mode="contained"><Text style={styles.buttontext}>Register</Text></Button>
            
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

    text1: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 20,
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
        color: '#f00',
        textAlign: 'center',
        marginTop: 10,
    }
  });