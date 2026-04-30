import images from './meditation-images';

export interface MeditationSession {
  id: number;
  image: any;
  title: string;
  audioPath: string; // Path to audio file
  duration?: number; // in seconds
}

const MEDITATION_GALLERY: MeditationSession[] = [
  {
    id: 1,
    image: images.treeImage,
    title: "Trees",
    audioPath: require('@/assets/audio/trees.mp3'),
    duration: 600,
  },
  {
    id: 2,
    image: images.riverImage,
    title: "Rivers",
    audioPath: require('@/assets/audio/river.mp3'),
    duration: 600,
  },
  {
    id: 3,
    image: images.beachImage,
    title: "Beach",
    audioPath: require('@/assets/audio/beach.mp3'),
    duration: 600,
  },
  {
    id: 4,
    image: images.yosemiteImage,
    title: "Yosemite",
    audioPath: require('@/assets/audio/yosemite.mp3'),
    duration: 600,
  },
  {
    id: 5,
    image: images.waterfallImage,
    title: "Waterfall",
    audioPath: require('@/assets/audio/waterfall.mp3'),
    duration: 600,
  },
];

export default MEDITATION_GALLERY;
