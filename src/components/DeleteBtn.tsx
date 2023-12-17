import { Button, Text } from "react-native-paper";
import { DeleteBtnProps } from "../types";
import axios from "axios";
import { useSession } from "../contexts/AuthContext";
import { useState } from "react";
import { StyleSheet } from "react-native";



export default function DeleteBtn({ resource, id, deleteCallback }: DeleteBtnProps) {
    const [deleting, setDeleting] = useState(false);
    const { session } = useSession();

    const handleDelete = () => {
        axios.delete(`https://ajs-ca1-music-api.vercel.app/api/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${session}`
            }
        })
        .then((response: any) => {
            console.log(response.data);
            if (deleteCallback) {
                deleteCallback(id);
            }
        })
        .catch(e => {
            console.log(e);
        });
    }


    return(
        <Button style={styles.button} onPress={handleDelete}><Text style={styles.text1}>Delete</Text></Button>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#ff4757',
        borderColor: '#ff4757',
        padding: 3,
        marginLeft: 6,
        borderRadius: 4,
    },
    text1:{
        color: '#fff',
    }
})