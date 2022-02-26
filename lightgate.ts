//% color="#FF6632" icon="\uf0fb" block="Running Comp" blockId="running_competition"
namespace RunComp {
    let lightLevel = 0
    let mindelta = 256
    let isDropped = false
    let lastDropCall = control.millis()
    /**
     * Set initial light flux
    */
    //% blockId=runcomp_setlightflux block="Read normal light level"
    export function SetLightLevel(): void {
        led.enable(true)
        let readcounter = 12
        let sumlight = 0
        let minlight = 256
        let maxlight = 0
        for (let i = 0; i < readcounter; i++) {
            let light = input.lightLevel()
            sumlight += light
            if (light > maxlight) maxlight = light
            if (light < minlight) minlight = light
            music.playTone(440, 50)
            basic.pause(50)
        }
        music.playTone(440, 500)
        lightLevel = Math.idiv(sumlight, readcounter)
        mindelta = maxlight - minlight
    }

    /**
    * Triggering when light level drops
    */
    //% blockId="runcomp_onLightDrop" block="Execute when light level drops"
    export function OnLightDrop(action: () => void) {
        const myEventID = 111 + Math.randomRange(0, 100); // semi-unique
        const lightValue = 1;

        control.onEvent(myEventID, 0, function () {
            control.inBackground(() => {
                action()
            })
        })

        control.inBackground(() => {
            let light = 256
            while (true) {
                light = input.lightLevel()
                if ((lightLevel - mindelta - 10) > light) {
                    if (!isDropped) {
                        if ((control.millis() - lastDropCall) > 180) {
                            lastDropCall = control.millis()
                            control.raiseEvent(myEventID, lightValue)
                        }
                        isDropped = true
                    }
                } else isDropped = false
                basic.pause(20)
            }
        })
    }

    let sosCoef = 1 / ((331 + 0.607 * (input.temperature() - 4)) / 10000 / 2)
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId="runningcomp_ping" block="ping trig %trig|echo %echo|unit %unit"
    export function ping(trig: DigitalPin, echo: DigitalPin, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse in cm
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
        return Math.round(d / sosCoef)
    }
}
