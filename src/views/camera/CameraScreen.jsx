import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Platform, PermissionsAndroid, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/string';

const CameraScreen = props => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rectangles, setRectangles] = useState(null);
  const [googleVisionResponse, setGoogleVisionResponse] = useState(null);
  const [otherVocabulary, setOtherVocabulary] = useState(null);
  const [lengthOfDetectedObject, setlengthOfDetectedObject] = useState(null);

  // xác nhận quyền truy cập camera
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          { title: 'Quyền truy cập máy ảnh', message: 'Ứng dụng cần có quyền này để sử dụng máy ảnh' },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  // xác nhận quyền truy cập bộ nhớ
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          { title: 'Quyền truy cập bộ nhớ', message: 'Ứng dụng cần có quyền này để lưu ảnh', },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
      }
      return false;
    } else return true;
  };

  // chụp ảnh
  const captureImage = async type => {
    let options = { mediaType: type, maxWidth: 500, maxHeight: 600, quality: 1, includeBase64: true };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Máy ảnh không khả dụng trên thiết bị này');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Chưa có quyền truy cập vào máy ảnh');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        // console.log(response.assets[0].uri);
        fetchObjectRecognition(response.assets[0].base64);
        setImage(response.assets[0]);
      });
    }
  };

  // chọn ảnh
  const chooseImage = type => {
    let options = { mediaType: type, maxWidth: 500, maxHeight: 600, quality: 1, includeBase64: true, };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Máy ảnh không khả dụng trên thiết bị này');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Chưa có quyền truy cập vào máy ảnh');
        return;
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
        return;
      }
      // console.log(response.assets[0].uri);
      fetchObjectRecognition(response.assets[0].base64);
      setImage(response.assets[0]);
    });
  };

  const rejectData = type => {
    setLoading(false);
    setImage(null);
    setRectangles(null);
    setGoogleVisionResponse(null);
    setOtherVocabulary(null);
    setlengthOfDetectedObject(null);
    setGoogleVisionResponse(null);
  }

  // nhận diện hình ảnh
  const fetchObjectRecognition = async (base64) => {
    setLoading(true);
    setImage(null);
    setRectangles(null);
    setGoogleVisionResponse(null);
    setOtherVocabulary(null);
    setlengthOfDetectedObject(null);

    let googleVisionRes = await fetch('https://vision.googleapis.com/v1/images:annotate?key='.concat(strings.GOOGLE_API_KEY),
      {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                { type: 'LABEL_DETECTION', maxResults: 13 },
                { type: 'OBJECT_LOCALIZATION', maxResults: 5 },
              ],
            },
          ],
        }),
      },
    );
    await googleVisionRes
      .json()
      .then((response) => {
        // console.log(response.responses[0]);
        setLoading(false);
        if (response) {
          parseVisionResponse(response);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setGoogleVisionResponse("    Không nhận diện được hình ảnh này, thử lại nha!");
      }
      );
  };

  // xử lý text nhận diện được
  const parseVisionResponse = (response) => {
    let objects = [];
    let vocabulary = [];
    let rectanglesForObject = [];
    const detectedObjects = response?.responses[0]['labelAnnotations'];
    const localizedObjectAnnotations = response?.responses[0]['localizedObjectAnnotations'];

    detectedObjects.map;
    for (const detectedObject in detectedObjects) {
      objects.push({
        description: detectedObjects[detectedObject]['description'],
        score: detectedObjects[detectedObject]['score'],
      });
    }

    for (const localizedObjectAnnotation in localizedObjectAnnotations) {
      const find = vocabulary.find(item => item.name === localizedObjectAnnotations[localizedObjectAnnotation]['name']);
      if (find == undefined) {
        vocabulary.push({
          name: localizedObjectAnnotations[localizedObjectAnnotation]['name'],
          coordinates:
            localizedObjectAnnotations[localizedObjectAnnotation]['boundingPoly']['normalizedVertices'],
        });
      }

      rectanglesForObject.push({
        name: localizedObjectAnnotations[localizedObjectAnnotation]['name'],
        coordinates:
          localizedObjectAnnotations[localizedObjectAnnotation]['boundingPoly']['normalizedVertices'],
      });
    }

    setGoogleVisionResponse(
      vocabulary.map((data) => {
        return (
          <View key={data.name} style={styles.row}>
            <TouchableOpacity style={styles.detectionButton}
              onPress={() =>
                props.navigation.navigate('Meaning', {
                  data: data.name,
                })
              }
            >
              <Text style={styles.detectionText}>{data.name}</Text>
            </TouchableOpacity>
          </View>
        );
      }),
    );

    setOtherVocabulary(
      objects.map((data) => {
        return (
          <View key={data.description} style={styles.row}>
            <TouchableOpacity style={styles.detectionButton}
              onPress={() =>
                props.navigation.navigate('Meaning', {
                  data: data.description,
                })
              }
            >
              <Text style={styles.detectionText}>{data.description}</Text>
            </TouchableOpacity>
          </View>
        );
      }),
    );

    setRectangles(
      rectanglesForObject.map((data) => {
        return (
          <View
            key={data.name + Math.random()}
            style={{
              height:
                Math.abs(data.coordinates[0]['y'] - data.coordinates[3]['y']) * 100 + '%',
              width:
                Math.abs(data.coordinates[0]['x'] - data.coordinates[1]['x']) * 100 + '%',
              borderWidth: 2,
              borderColor: colors.primary,
              position: 'absolute',
              zIndex: 99,
              top: Math.abs(data.coordinates[0].y) * 96 + '%',
              left: Math.abs(data.coordinates[0].x) * 110 + '%',
            }}>
          </View>
        );
      }),
    );

    setlengthOfDetectedObject(rectanglesForObject.length);
  };

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.white} barStyle='dark-content' />

      <TouchableOpacity style={styles.back}
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Image source={require('../../images/back.png')} style={styles.backImg} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        {image && (
          <View style={styles.detectionView}>
            <Image
              source={{ uri: image.uri }}
              style={{ resizeMode: 'contain', height: (image.height - 105) }}
            />
            {rectangles}
          </View>
        )}

        {loading === true ? <ActivityIndicator size="large" color={colors.primary} style={styles.loading}/> : <Text></Text>}

        {googleVisionResponse && (
          <Text style={styles.noDetectionText}>{googleVisionResponse}</Text>
        )}

        {otherVocabulary && (
          <View style={styles.detectionViewNoti}>
            <Text style={styles.detectionTextNoti}>TẤT CẢ TỪ VỰNG NHẬN DIỆN ĐƯỢC</Text>
          </View>
        )}

        {otherVocabulary && (
          <Text>{otherVocabulary}</Text>
        )}

        <View style={{ height: 100 }}></View>
      </ScrollView>

      <View style={styles.bottom}>
        <View style={styles.viewLibrary}>
          <TouchableOpacity style={styles.buttonLibrary}
            onPress={() => chooseImage('photo')}>
            <Image style={styles.imageLibrary} source={require('../../images/gallery.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewCamrera}>
          <TouchableOpacity style={styles.buttonCamera}
            onPress={() => captureImage('photo')}>
            <Image style={styles.imageCamera} source={require('../../images/camera2.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewReject}>
          <TouchableOpacity style={styles.buttonReject}
            onPress={() => rejectData('reject')}>
            <Image style={styles.imageReject} source={require('../../images/reject.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CameraScreen;
