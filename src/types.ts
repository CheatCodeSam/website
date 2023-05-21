// Home, Projects, Blog etc.
export type SearchEntry = {
    type: string;
    collection?: "blog" | "projects";
    title: string;
    tags?: string[];
    href: string;
};
