export type GhostSite = {
    title: string;
    description: string;
    logo: string | null;
    version: string;
    url: string;
};
export type GhostError = {
    message: string;
    type: string;
    context: string;
};

export type GhostSiteResponse = {
    success: false,
    errors: GhostError[]
} | {
    success: true;
    data: GhostSite;
};