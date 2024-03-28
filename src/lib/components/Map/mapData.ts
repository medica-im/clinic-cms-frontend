import type { MapData } from '$lib/interfaces/mapData.interface';

export const createMapData = (address) => {
    const mapData: MapData = {
        latLng: [Number(address?.latitude ?? 0), Number(address?.longitude ?? 0)],
        zoom: address?.zoom ?? 0
    };
    return mapData;
};