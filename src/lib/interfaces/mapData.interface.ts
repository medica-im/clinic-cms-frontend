interface Tooltip {
    text: string,
    permanent: boolean,
    direction: string,
    opacity: number,
}

export interface MapData {
    latLng: [number, number];
    zoom?: number;
    tooltip?: Tooltip;
}