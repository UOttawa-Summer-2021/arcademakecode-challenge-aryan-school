
controller.up.onEvent(ControllerButtonEvent.Pressed, () => {
    guess(0)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, () => {
    guess(1)
})

controller.down.onEvent(ControllerButtonEvent.Pressed, () => {
    guess(2)
})

controller.left.onEvent(ControllerButtonEvent.Pressed, () => {
    guess(3)
})

function guess(buttonId: number){
    if (!userTurn)
        return;
    
    userTurn = false
    buttonPress(buttonId)

    if (buttonId == currentAnswer){
        game.splash("Good job!!")
        info.player1.changeScoreBy(1)

        pause(1000)
        startRound()
    }
    else{
        game.over(false, effects.melt)
    }
}

function setButton () {
    red = sprites.create(assets.image`redButton`, SpriteKind.Player)
    red.setPosition(80, 40)

    green = sprites.create(assets.image`greenButton`, SpriteKind.Player)
    green.setPosition(80, 80)

    blue = sprites.create(assets.image`blueButton`, SpriteKind.Player)
    blue.setPosition(60, 60)

    yellow = sprites.create(assets.image`yellowButton`, SpriteKind.Player)
    yellow.setPosition(100, 60)
}

function startRound(){
    currentAnswer = randint(0, 3)
    buttonPress(currentAnswer)

    pause(1000)
    game.splash("Select the right one")
    userTurn = true
}

function buttonPress(buttonId: number){
    let targetSprite: Sprite = null;
    let upImage: Image = null;
    let downImage: Image = null;

    switch(buttonId){
        case 0:
            targetSprite = red
            upImage = assets.image`redButton`
            downImage = assets.image`redButtonPush`
        break;

        case 1:
            targetSprite = yellow
            upImage = assets.image`yellowButton`
            downImage = assets.image`yellowButtonPush`
        break;

        case 2:
            targetSprite = green
            upImage = assets.image`greenButton`
            downImage = assets.image`greenButtonPush`
        break;

        case 3:
            targetSprite = blue
            upImage = assets.image`blueButton`
            downImage = assets.image`blueButtonPush`
        break;

        default: //red for fallback
            targetSprite = red
            upImage = assets.image`redButton`
            downImage = assets.image`redButtonPush`
        break;
    }

    targetSprite.setImage(downImage)
    targetSprite.startEffect(effects.confetti, 700)
    music.playTone(262, music.beat(BeatFraction.Whole))
    pause(500)
    targetSprite.setImage(upImage)
}

let yellow: Sprite = null
let blue: Sprite = null
let green: Sprite = null
let red: Sprite = null
let userTurn = false
let currentAnswer: number;

scene.setBackgroundColor(1)
setButton()
info.setScore(0)

pause(1000)
startRound()