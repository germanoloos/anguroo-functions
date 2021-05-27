
export interface AngurooProject {
    id: string;
    name: string;
    type: string;
    email: string;
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
