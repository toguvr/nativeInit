import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [list, setList] = useState([])

  async function ListRepository() {
    const response = await api.get(`/repositories`)

    setList(response.data)
  }

  // useEffect(()=>{
  //   ListRepository()
  // },[])

  async function handleLikeRepository(id) {

  const response = await api.post(`/repositories/${id}/like`)

  const newList = [...list]
  const repoIndex = newList.findIndex(repo=> repo.id === id)

  newList[repoIndex] = response.data

  setList(newList)
   
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
     {list.map(repository=>
     <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repository.title}</Text>
          {repository.techs(tech=>
          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              {tech}
            </Text>
          </View>)}
          

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${repository.id}`}
            >
              {`${repository.likes} ${Number(repository.likes) === 1 ? 'curtida' : 'curtidas'}`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>)   }
{/*    
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-d6e43105-a559-45b7-8fd7-53416b415741`}
            >
              {`1 curtida`}
            </Text>
       

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository('d6e43105-a559-45b7-8fd7-53416b415741')}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-d6e43105-a559-45b7-8fd7-53416b415741`}
          > <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
