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
}