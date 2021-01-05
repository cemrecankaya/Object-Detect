import React , { useState } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageZoom from 'react-native-image-pan-zoom';
import styles1 from "../style/style.js";


export default function camera() {
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [comparedPhoto, setComparedPhoto] = useState(null);
  const [count, setCount] = useState(-1);
  const [open, setOpen] = useState(null);
  const [open1, setOpen1] = useState(null);

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: false, width:600,height:800 };
      const data = await this.camera.takePictureAsync(options);
      setCapturedPhoto(data);
      setOpen(true);
    }
  };

  sendPicture = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    console.log("1");
    var formdata = new FormData();
    
    formdata.append("files", {
      uri: capturedPhoto.uri,
      type: 'image/jpg',
      name: 'image.jpg',
    });  

    //console.log(formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    //console.log(requestOptions);
    fetch("https://objectdetect.azurewebsites.net/objectdetect", requestOptions)
      .then(response => response.json())
      .then((data)=> {
          setComparedPhoto("data:image/jpeg;base64," + data["base64"]);
          setCount(data["objectCount"]);
          setOpen1(true);
      })
      .catch(error => console.log('error', error))
      .done(()=>{
        setCapturedPhoto(null);

      });
  };
  return(
    <SafeAreaView style={{flex:1,backgroundColor:'transparent'}}>
      <RNCamera 
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
      }} 
        ref={cam=>{this.camera = cam;}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Kameraya erişim izni',
          message: 'Uygulamanın kameranızı kullanmasına izin veriyor musunuz?',
          buttonPositive: 'Evet',
          buttonNegative: 'Hayır',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Ses kayıt izni',
          message: 'Uygulamanın sesinizi kaydetmesine izin veriyor musunuz?',
          buttonPositive: 'Evet',
          buttonNegative: 'Hayır',
        }}
        >
      </RNCamera>
      <TouchableOpacity 
        style={styles.button} 
        onPress={()=> takePicture()}
      >
        <Text style={{color:'white',fontSize:23,fontFamily:'Calibri',fontWeight:'bold'}}>Çek</Text>

      </TouchableOpacity>
      { 
        capturedPhoto && 
        <Modal
          animationType='slide'
          transparent={false}
          visible={open}
          onRequestClose={()=> setOpen(false)}
        >
          <View style={{flex:80, justifyContent:'center',alignItems:'center', margin:10, marginTop:10}}>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={400}
            imageHeight={900}>
            {
              capturedPhoto &&
              <Image
                style={{ resizeMode:'contain', width:'100%',height:'100%',}}
                source={{uri: capturedPhoto.uri}}
              />
            }
            </ImageZoom>
          </View>
            <View style={{ 
              flex:20,
              width:'100%',
              height:'100%',
              flexDirection:'row', 
              justifyContent:'center', 
              alignItems:'center',
              backgroundColor:'rgba(255, 255, 255, 0.8)',
              padding:4,
            }}>
              <TouchableOpacity style={styles1.touchable} onPress={() => setOpen(false) }>
                <Text style={{color:'black', fontSize:26}}>Kapat</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles1.touchable} onPress={() => sendPicture() }>
                  <Text style={{color:'black', fontSize:26}}>Gönder</Text>
                </TouchableOpacity>
              
          </View>
         
        </Modal>
      }
      { 
        comparedPhoto && 
        <Modal
          animationType='slide'
          transparent={false}
          visible={open1}
          onRequestClose={()=> setOpen1(false)}
        >
          <View style={{flex:80, justifyContent:'center',alignItems:'center', margin:10, marginTop:10}}>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={400}
            imageHeight={1000}>
            {
              comparedPhoto &&
              <Image
                style={{ resizeMode:'contain', width:'100%',height:'100%',}}
                source={{uri: comparedPhoto}}
              />
            }
            </ImageZoom>
          </View>
            <View style={{flex:20, 
              width:'100%',
              height:'100%',
              alignItems:'center',
              justifyContent:'center', 
              backgroundColor:'rgba(255, 255, 255, 0.8)',
              padding:4,}}
            >
              { 
              count > -1 &&
              <Text style={{fontSize:30}}>Obje sayısı : {count}</Text>
              }
           
              <View style={{ flex:20, margin:20, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
               
              <TouchableOpacity style={styles1.touchable} onPress={() => setOpen1(false) }>
                <Text style={{color:'black', fontSize:26}}>Kapat</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles1.touchable} onPress={() => sendPicture() }>
                  <Text style={{color:'black', fontSize:26}}>Gönder</Text>
                </TouchableOpacity>
            </View>
          </View>
         
        </Modal>
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'grey',
    margin:20,
    marginHorizontal:100,
    borderRadius:20,
    height:50,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});