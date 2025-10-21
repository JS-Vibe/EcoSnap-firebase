
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

const modelJson = require('@/assets/model/model.json');
const modelWeights = require('@/assets/model/weights.bin');

const CLASS_LABELS = ['Cardboard', 'Glass', 'Metal', 'Paper', 'Plastic'];

let model;

export const loadModel = async () => {
  await tf.ready();
  model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
  console.log('Model loaded successfully');
};

export const classifyImage = async (imageTensor) => {
  if (!model) {
    await loadModel();
  }

  const predictions = await model.predict(imageTensor.expandDims(0));
  const highestPrediction = predictions.as1D().argMax();
  const className = CLASS_LABELS[highestPrediction.dataSync()[0]];
  const probability = predictions.as1D().max().dataSync()[0];

  return {
    className,
    probability,
  };
};
