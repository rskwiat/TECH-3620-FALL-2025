import images from './meditation-images';
import riverAudio from '../../assets/audio/river.mp3';
import treeAudio from '../../assets/audio/trees.mp3';
import beachAudio from '../../assets/audio/beach.mp3';
import yosemiteAudio from '../../assets/audio/yosemite.mp3';
import waterfallAudio from '../../assets/audio/waterfall.mp3';

const MEDITATION_GALLERY = [
  {
    "id": 1,
    "image": images.treeImage,
    "title": "Trees",
    "audio": treeAudio
  },
  {
    "id": 2,
    "image": images.riverImage,
    "title": "Rivers",
    "audio": riverAudio
  },
  {
    "id": 3,
    "image": images.beachImage,
    "title": "Beach",
    "audio": beachAudio
  },
  {
    "id": 4,
    "image": images.yosemiteImage,
    "title": "Yosemite",
    "audio": yosemiteAudio
  },
  {
    "id": 5,
    "image": images.waterfallImage,
    "title": "Waterfall",
    "audio": waterfallAudio
  }
];

export default MEDITATION_GALLERY;
