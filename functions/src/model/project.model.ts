
export interface AngurooProject {
    id: string;
    name: string;
    type: string;
    framework: {
        name: string
        props: {
            prefix: string;
            angularMaterial: boolean;
            stylesheet: string;
            bootstrap: boolean;
            jquery: boolean;
            ngxMask: boolean;
        }
    }
}
