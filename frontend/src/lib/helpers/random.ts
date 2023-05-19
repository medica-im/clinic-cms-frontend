import {prng_alea} from 'esm-seedrandom';

export const shuffle = (array: []) => {
    let currentIndex = array.length, randomIndex;
    
    // seed with current date (YYYY-MM-DD)
    const date = new Date().toISOString().slice(0,10);
    const dailyrng = prng_alea(date);
  
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