import { Link } from "expo-router";
import { AuthorCardProps } from '../types';
import { useRouter } from "expo-router";
import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DeleteBtn from "./DeleteBtn";


export default function AuthorCard({ author, onDelete }: AuthorCardProps){
    const router = useRouter();

    
    return (
        <Card style={styles.card}>
            <Card.Cover style={styles.spacer1} source={{ uri: 'https://cc4-ajs-ca1.s3.eu-west-1.amazonaws.com/' + `${author.image_path}` }} />
                <Card.Content>
                <Link href={{ pathname: '/home/authors/[id]', params: { id: author._id } }}>
                    <Text variant="titleLarge">{author.name}</Text>
                </Link>
                </Card.Content>
                <Card.Actions>
                    <Button style={styles.editButton} onPress={() => router.push(`/home/authors/${author._id}/edit`)}><Text style={styles.editText}>Edit</Text></Button>
                    <DeleteBtn resource="authors" id={author._id} deleteCallback={onDelete} />
                </Card.Actions>
        </Card>
    );
}


const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        backgroundColor: '#fff',
        marginRight: 20,
        marginLeft: 20,
    },
    editButton: {
        backgroundColor: '#ffa502',
        borderColor: '#ffa502',
        borderRadius: 4,
    },
    editText: {
        color: '#fff',
    },
    spacer1: {
        marginBottom: 15,
    },
})