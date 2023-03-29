export default function useAssets(asset) {
    const assets = import.meta.glob('/src/lib/assets/images/*.{jpg,jpeg,png}', {eager: true});
    const getAssetUrl = () => {
     if (assets[`/src/lib/assets/images/${asset}`]) {
       return assets[`/src/lib/assets/images/${asset}`].default
     }
    }
    return getAssetUrl()
  }