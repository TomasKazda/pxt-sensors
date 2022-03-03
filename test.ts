// tests go here; this will not be compiled when this package is used as an extension.
radio.setGroup(111)
radio.setTransmitPower(7)

let onTheWay = 0
let myWay = control.deviceSerialNumber()
let startTime = 0
let duration = 0
radio.setTransmitSerialNumber(true)

RunComp.SetLightLevel();
RunComp.OnLightDrop(function () {
    if (onTheWay == 0) {
        radio.sendNumber(1)
        startTime = control.millis()
        onTheWay = myWay
        music.playTone(440, 500)
    } 
    else if (onTheWay != myWay) {
        radio.sendNumber(2)
        finish()
    }
})

input.onButtonPressed(Button.A, reset)

input.onButtonPressed(Button.B, showResult)

radio.onReceivedNumber(function(receivedNumber: number) {
    if (receivedNumber == 2)
    {
        finish()
    }
    if (receivedNumber == 1)
    {
        startTime = control.millis()
        onTheWay = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        music.playTone(440, 500)

    }
    if (receivedNumber == 0) {
        reset()
    }
})

function reset() {
    radio.sendNumber(0)
    onTheWay = 0
    duration = 0
    music.playTone(320, 800)
}

function showResult() {
    basic.showNumber(duration)
    basic.clearScreen()
}

function finish() {
    onTheWay = 0
    let stopTime = control.millis()
    duration = Math.round((stopTime - startTime) / 10) / 100
    music.playTone(660, 700)
    basic.pause(2000)
}