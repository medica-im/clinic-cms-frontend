import { entryPageUrl } from '$lib/utils/utils.ts';
import type { MapData } from '$lib/interfaces/mapData.interface.ts';
import type { Facility, Address, Entry, AddressFeature } from '$lib/store/directoryStoreInterface.ts';
import type { IconOptions } from 'leaflet';

export const createMapData = (address: Address, facilityName: string = "") => {
    const mapData: MapData[] = [
        {
            latLng: [Number(address?.latitude ?? 0), Number(address?.longitude ?? 0)],
            zoom: address?.zoom ?? 0,
            tooltip: {
                text: facilityName,
                permanent: false,
                direction: "auto",
                opacity: 0.7
            }
        }
    ];
    return mapData;
};

export const createFacilitiesMapData = (facilities: Facility[], tooltip = false) => {
    console.log(`facilities: ${JSON.stringify(facilities)}`);
    const points: MapData[] = [];
    facilities.forEach((item: Facility) => {
        points.push({
            latLng: [Number(item.address?.latitude ?? 0), Number(item.address?.longitude ?? 0)],
            zoom: item?.address?.zoom ?? 0,
            tooltip: {
                text: item.address?.tooltip_text || item.name,
                permanent: tooltip,
                direction: item.address?.tooltip_direction || "auto",
                opacity: 0.7
            }
        });
    });
    return points;
};

function getTarget(addressFeature: AddressFeature) {
	return {
            latLng: [addressFeature.geometry.coordinates[1], addressFeature.geometry.coordinates[0]],
            zoom: 0,
            tooltip: {
                text: addressFeature.properties.label,
                permanent: false,
                direction: "auto",
                opacity: 0.7
            },
            iconUrl: "/icons/home.png",
            iconOptions: {
                iconUrl: "/icons/home.png",
                iconSize: [50, 50],
                iconAnchor: [25, 50],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
            }
        }
}

export const createEntriesMapData = (entries: Entry[], tooltip = false, target) => {
    const points: MapData[] = [];
    entries.forEach((entry: Entry) => {
        let tooltipHtml = `
        <b>${entry.address?.tooltip_text || entry.name}</b>
        <br>
        ${entry.types[0].name}<br>`
        let popupHtml = `
        <a href="${entryPageUrl(entry)}">
        <b>${entry.address?.tooltip_text || entry.name}</b>
        </a>
        <br>
        ${entry.types[0].name}<br>`
        
        points.push({
            latLng: [Number(entry.address?.latitude ?? 0), Number(entry.address?.longitude ?? 0)],
            zoom: entry?.address?.zoom ?? 0,
            popup: {
                text: popupHtml
            },
            tooltip: {
                text: tooltipHtml,
                permanent: tooltip,
                direction: entry.address?.tooltip_direction || "auto",
                opacity: 0.7
            }
        });
    });
    if (target?.geometry?.coordinates) {
        let point = getTarget(target);
        points.push(point);
    }
    return points;
};