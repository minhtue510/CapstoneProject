import React from 'react';
// import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image,TouchableOpacity} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import takePicture from '../../assets/icons/takePicture.png';
import save from '../../assets/icons/save.png';
import discard from '../../assets/icons/discard.png';

// const AboutUsScreen = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar style="auto" />
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>About Us Screen</Text>
//         {/* Add your about us content here */}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AboutUsScreen;

const CameraScreen = () => {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Đang yêu cầu quyền truy cập...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.buttonContainer}>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity onPress={savePhoto} style={styles.button}>
              <Image source={save} style={styles.icon} />
            </TouchableOpacity>
          ) : undefined}
          <TouchableOpacity onPress={() => setPhoto(undefined)} style={styles.button}>
            <Image source={discard} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.captureButtonContainer}>
          <TouchableOpacity onPress={takePic} style={styles.captureButton}>
            <Image source={takePicture} style={styles.captureIcon} />
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 10,
  },
  captureButton: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureIcon: {
    width: 50,
    height: 50,
  },
});
export default CameraScreen;
