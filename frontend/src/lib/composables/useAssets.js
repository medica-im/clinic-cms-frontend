export default function useAssets(asset) {
    const assets = import.meta.glob('/src/lib/assets/images/*.{jpg,jpeg,png}', {eager: true});
    console.log(asset);
    console.log(assets);
    console.log(assets[asset]);
    const getAssetUrl = () => {
     if (assets[`/src/lib/assets/images/${asset}`]) {
       return assets[`/src/lib/assets/images/${asset}`].default
     }
    }
  
    return getAssetUrl()
  }