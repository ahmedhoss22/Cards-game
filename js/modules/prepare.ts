import { Card } from './card';
export interface Iprepare{
    card?:Card[];
    selectedCard1?:Card;
    selectedCard2?:Card;
    selectedIndex1?:number;
    selectedIndex2?:number;
    progress?:number;
    fullTrack?:HTMLAudioElement;
    flipAudio?:HTMLAudioElement;
    goodAudio?:HTMLAudioElement;
    failAudio?:HTMLAudioElement;
    gameOverAudio?:HTMLAudioElement;
}