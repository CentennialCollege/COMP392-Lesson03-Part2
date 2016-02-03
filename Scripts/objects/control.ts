/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed:number;
        public bouncingSpeed:number;
        public ambientColour:string;
        public pointColour: string;
        public intensity: number;
        public distance: number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number, bouncingSpeed:number, ambientColour:string, pointColour:string, intensity:number, distance: number) {
            this.rotationSpeed = rotationSpeed;
            this.bouncingSpeed = bouncingSpeed;
            this.ambientColour = ambientColour;
            this.pointColour = pointColour;
            this.intensity = intensity;
            this.distance = distance;
        }
        
    }
}
