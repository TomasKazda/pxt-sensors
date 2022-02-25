radio.setGroup(111)
radio.setTransmitPower(7)

// music.setVolume(19)

// let onTheWay = false
// let startTime = 0
// let duration = 0

// RunComp.SetLightLevel();
// RunComp.OnLightDrop(function () {
//     if (!onTheWay) {
//         radio.sendNumber(1)
//         startTime = control.millis()
//         onTheWay = true
//         music.playTone(440, 500)
//     }
// })

// input.onButtonPressed(Button.A, function() {
//     radio.sendNumber(0)
//     onTheWay = false

//     music.playTone(320, 800)
// })

// input.onButtonPressed(Button.B, function () {
//     basic.showNumber(duration, 500)
//     basic.clearScreen()
// })

// radio.onReceivedNumber(function(receivedNumber: number) {
//     if (receivedNumber == 2)
//     {
//         onTheWay = false
//         let stopTime = control.millis()
//         duration = Math.round((stopTime - startTime) / 10) / 100
//         basic.showNumber(duration, 500)
//         basic.clearScreen()
//     }
// })
