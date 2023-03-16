// tests go here; this will not be compiled when this package is used as an extension.

Sensors.SetLightLevel();
Sensors.OnLightDrop(function () {
    music.playTone(440, 500)
    console.logValue("distance", Sensors.ping(DigitalPin.P8, DigitalPin.P15))
})

