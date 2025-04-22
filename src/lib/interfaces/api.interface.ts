export type Tastypie = {
    [key: string]: any[]
} & {
    meta: {
        limit: number,
        next: string | null,
        offset: number,
        previous: string | null,
        total_count: number
    }
};