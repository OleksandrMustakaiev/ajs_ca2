import { router, useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryCard from '../../../../../components/CategoryCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';


export default function Page() {

  const [categories, setCategories] = useState([]);
  // const [filteredCategories, setFilteredCategories] = useState([]);
  // const [term, setTerm] = useState("");
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: 'Categories' });
  }, [navigation]);

  useEffect(() => {
    axios.get('https://ajs-ca1-music-api.vercel.app/api/categories')
    .then(response => {
        console.log(response.data);
        setCategories(response.data);
        // setFilteredCategories(response.data);
    })
    .catch(e => {
        console.log(e);
        })
}, []);

const onDelete = (id?: string) => {
    let newCategories = categories.filter((category: any) => category._id !== id);
    setCategories(newCategories);
}

let categoriesList = categories.map((category: any) => {
    return <CategoryCard key={category._id} category={category} onDelete={onDelete} />
})

 // array of country card
//   let categoriesList = filteredCategories.map((category: any) => {
//     return <CategoryCard key={category._id} category={category} onDelete={onDelete} />;
// });

// search countries by the common name
// const handleSearch = (event: any) => {
//   setTerm(event.target.value);
//   // if search term was changed to blank, show all categories
//   if (event.target.value === "") {
//     setFilteredCategories(categories);
//   }
//   // else if search term is less than or equal to 1, do nothing
//   else if (event.target.value.length <= 1) {
//     return;
//   }
//   else {
//     let filter = categories.filter((category: any) => {
//       return category.nametoLowerCase().includes(term.toLowerCase());
//     });
//     setFilteredCategories(filter);
//   }
// };


  return (
  <ScrollView style={styles.container}>
        <Text variant="headlineSmall" style={styles.text1}>📚 List of Categories</Text>
        <Button onPress={() => router.push('/home/categories/create')} style={styles.buttonAdd}><Text style={styles.textAdd}><Icon name="plus-circle" size={15} /> Category</Text></Button>
        {/* <TextInput onChange={handleSearch} value={term} style={styles.input} label="🔎 Search" /> */}
        {categoriesList}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 4,
    marginTop: 25,
    backgroundColor: '#fff',
    marginLeft: 25,
    marginRight: 25,
    padding: 0
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