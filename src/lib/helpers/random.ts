import {prng_alea} from 'esm-seedrandom';
import { PUBLIC_HASH } from '$env/static/public';

export const shuffle = (array: any[]): any[] => {
    let currentIndex = array.length, randomIndex;
    
    // seed with current git hash
    const dailyrng = prng_alea(PUBLIC_HASH);
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      
      // Pick a remaining element.
      randomIndex = Math.floor(dailyrng() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }