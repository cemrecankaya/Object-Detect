import React , {Component} from "react";
import { View, Text, TouchableOpacity,Image, Modal,Dimensions  } from "react-native";
import styles from "../style/style.js";
import { launchImageLibrary } from "react-native-image-picker";
import ImageZoom from 'react-native-image-pan-zoom';

export default class gallery extends Component{
  state= {
    photo : null,
    comparedPhoto: null, 
    objectCount: -1,
  };

  choosePhoto = () => {
    this.setState({
      photo : null,
      comparedPhoto: null, 
      objectCount: -1, });
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (responsePhoto) => {
        if(responsePhoto.uri){
          this.setState({photo: responsePhoto});
        }
      }
    )
  };

  sendPicture = async () => {
    if(this.state.photo){

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data");
      var formdata = new FormData();
      
      formdata.append("files", {
        uri: this.state.photo.uri,
        type: 'image/jpg',
        name: 'image.jpg',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://objectdetect.azurewebsites.net/objectdetect", requestOptions)
        .then(response => response.json())
        .then((data)=> {
            this.setState({photo:null, comparedPhoto:"data:image/jpeg;base64," + data["base64"], objectCount:data["objectCount"]})
        })
        .catch(error => console.log('error', error))
    }
  }

  render(){
    const {photo} = this.state;
    const {comparedPhoto} = this.state;
    const {objectCount} = this.state;

    return(
      <View style={styles.container}>
        <View style={{flex:80,alignItems:'center', justifyContent:'center',width:'100%',height:'100%',}}>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={400}
            imageHeight={1000}>
            { 
              photo !== null &&
              <Image 
                source={{uri: photo.uri}}
                style={{flex:1, resizeMode:'contain', width:400, height:1000}}
              />
            }
            {
              comparedPhoto !== null &&
              <Image 
                source={{uri: comparedPhoto}}
                style={{flex:1, resizeMode:'contain', width:400, height:1000}}
              />
            }
          </ImageZoom>
        </View>
        <View style={{
          flex:20, 
          width:'100%',
          height:'100%',
          alignItems:'center',
          justifyContent:'center', 
          backgroundColor:'rgba(255, 255, 255, 0.8)',
          padding:4,
        }}>
          { 
            objectCount > -1 &&
            <Text style={{fontSize:30 }}>Obje sayısı : {this.state.objectCount}</Text>
          }
          <View style={{
            flex:1, 
            width:'100%',
            height:'100%',
            alignItems:'center',
            justifyContent:'center', 
            flexDirection:'row',
            margin:15,
          }}>
            <TouchableOpacity style={styles.touchable} onPress={this.choosePhoto}>
              <Text style={{fontSize:26}}>Fotoğraf Seç</Text>
            </TouchableOpacity>
            {
              photo !== null &&
            <TouchableOpacity style={styles.touchable} onPress={this.sendPicture}>
              <Text style={{fontSize:26}}>Gönder</Text>
            </TouchableOpacity>
            }
          </View>
        </View>    
      </View>
    );
  }
}
