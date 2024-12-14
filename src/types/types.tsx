export interface Environment {
    name: string;
    id: string;
    description?: string;
    backgroundImage?: string;
    screenPosition?: {
        x: number;
        y: number;
    };
    parent?: Environment;
    children?: Environment[];
}

