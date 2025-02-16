import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Loader from './Loader';
import axios from 'axios';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://adamix.net/defensa_civil/def/miembros.php');
        setMembers(response.data.datos);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.memberContainer}>
      <Image source={{ uri: item.foto }} style={styles.memberImage} />
      <Text style={styles.memberName}>{item.nombre}</Text>
      <Text style={styles.memberCargo}>{item.cargo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Miembros</Text>
      {loading ? (
        <Loader/>
      ) : (
        <FlatList
          data={members}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 20,
  },
  flatListContainer: {
    alignItems: 'center',
  },
  memberContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberCargo: {
    fontSize: 16,
  },
});

export default Members;
