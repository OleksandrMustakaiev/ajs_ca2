import { Link } from "expo-router";
import { TrackCardProps } from '../types';
import { useRouter } from "expo-router";
import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DeleteBtn from "./DeleteBtn";


export default function TrackCard({ track, onDelete }: TrackCardProps){
    const router = useRouter();
    
    return (
        <Card style={styles.card}>
            <Card.Cover style={styles.spacer1} source={{ uri: 'https://cc4-ajs-ca1.s3.eu-west-1.amazonaws.com/' + `${track.image_path}` }} />
                <Card.Content>
                <Link href={{ pathname: '/home/tracks/[id]', params: { id: track._id } }}>
                    <Text variant="titleLarge">{track.title}</Text>
                </Link>
                </Card.Content>
                <Card.Actions>
                    <Button style={styles.editButton} onPress={() => router.push(`/home/tracks/${track._id}/edit`)}><Text style={styles.editText}>Edit</Text></Button>
                    <DeleteBtn resource="tracks" id={track._id} deleteCallback={onDelete} />
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