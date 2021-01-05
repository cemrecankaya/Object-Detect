import React from "react";
import { View, Text, StyleSheet, Image , TouchableOpacity, StatusBar } from "react-native";

import styles from "../style/style.js";
import camera from "../images/camera.png";
import gallery from "../images/gallery.png";


const button= StyleSheet.create({
  headerView:{
    flex:20,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonView:{
    flex:40,
    paddingLeft:'4%',
    paddingRight:'4%',
    justifyContent:'center',
    alignItems:'center',
    
  },
  button: {
    padding: '3%',
    borderColor:'#434343',
    borderWidth:2,
    borderRadius:20,
  },
  image:{
    height:100,
    width:100,
  },
});

export default function menu({ navigation }) {
    return (
      <View style={styles.container}>        
        <View style={button.headerView}>
          <Text style={styles.headerText}>Object Detection</Text>
        </View>
        <View style={button.buttonView}>
          <View style={{marginBottom:'10%'}}>
            <Text style={styles.text}>Kamera ile fotoğraf çekin.</Text>
          </View>
          <TouchableOpacity style={button.button} onPress={() => navigation.navigate("Kamera") } >
            <Image style={button.image} source={camera}/>
          </TouchableOpacity>
        </View>
        <View style={button.buttonView}>
          <View style={{marginBottom:'10%'}}>
            <Text style={styles.text}>veya galeriden seçin.</Text>
          </View>
          <TouchableOpacity style={button.button} onPress={() => navigation.navigate("Galeri") } >
            <Image style={button.image} source={gallery}/>
          </TouchableOpacity>
        </View>
        <StatusBar barStyle={"default"} />
      </View>
    )
  };