/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed, bouncingSpeed, ambientColour, pointColour, intensity, distance) {
            this.rotationSpeed = rotationSpeed;
            this.bouncingSpeed = bouncingSpeed;
            this.ambientColour = ambientColour;
            this.pointColour = pointColour;
            this.intensity = intensity;
            this.distance = distance;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map