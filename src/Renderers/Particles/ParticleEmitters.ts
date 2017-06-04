class ParticleEmitters {

    static DamageEmitter = {
        "alpha": {
            "start": 1,
            "end": 0.2
        },
        "scale": {
            "start": 0.25,
            "end": 0.2,
            "minimumScaleMultiplier": 0.001
        },
        "color": {
            "start": "#ff0000",
            "end": "#d67e7e"
        },
        "speed": {
            "start": 100,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 15,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": true,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.12,
            "max": 0.21
        },
        "blendMode": "normal",
        "frequency": 0.001,
        "emitterLifetime": 0.25,
        "maxParticles": 20,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    };

}
