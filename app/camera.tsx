
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import { classifyImage } from './model';

const TensorCamera = cameraWithTensors(Camera);

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [classification, setClassification] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraStream = (images) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (!nextImageTensor) return;

      const prediction = await classifyImage(nextImageTensor);
      setClassification(prediction);
      tf.dispose([nextImageTensor]);
      requestAnimationFrame(loop);
    };
    loop();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TensorCamera
        ref={cameraRef}
        style={styles.camera}
        facing={'back'}
        onReady={handleCameraStream}
        resizeHeight={224}
        resizeWidth={224}
        resizeDepth={3}
        autorender={true}
        cameraTextureHeight={Platform.OS === 'ios' ? 1920 : 1200}
        cameraTextureWidth={Platform.OS === 'ios' ? 1080 : 1600}
      />
      {classification && (
        <View style={styles.classificationContainer}>
          <Text style={styles.classificationText}>
            {classification.className}: {classification.probability.toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  classificationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  classificationText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CameraComponent;
