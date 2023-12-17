import { Link } from "expo-router";
import { CategoryCardProps } from '../types';
import { useRouter } from "expo-router";
import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DeleteBtn from "./DeleteBtn";


export default function CategoryCard({ category, onDelete }: CategoryCardProps){
    const router = useRouter();

    
    return (
        <Card style={styles.card}>
                <Card.Content>
                {/* <Link href={{ pathname: '/home/categories/[id]', params: { id: category._id } }}> */}
                    <Text variant="titleLarge">{category.name}</Text>
                {/* </Link> */}
                </Card.Content>
                <Card.Actions>
                    <Button style={styles.editButton} onPress={() => router.push(`/home/categories/${category._id}/edit`)}><Text style={styles.editText}>Edit</Text></Button>
                    <DeleteBtn resource="categories" id={category._id} deleteCallback={onDelete} />
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
        borderRadius: 4
    },
    editButton: {
        backgroundColor: '#ffa502',
        borderColor: '#ffa502',
        borderRadius: 4,
    },
    editText: {
        color: '#fff',
    }
})