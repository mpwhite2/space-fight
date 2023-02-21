namespace SpriteKind {
    export const Laser = SpriteKind.create()
}
function IsGameStarted () {
    return Go == 1
}
function Start () {
    Go = 1
}
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player2) {
    Start()
    mp.moveWithButtons(player2, 0, 100)
    if (mp.getPlayerState(player2, MultiplayerState.life) > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . 7 7 7 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mp.getPlayerSprite(player2), 100, 0)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Laser, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Laser, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
mp.onLifeZero(function (player2) {
    sprites.destroy(mp.getPlayerSprite(player2), effects.disintegrate, 500)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    mp.changePlayerStateBy(mp.getPlayerBySprite(sprite), MultiplayerState.life, -1)
})
let projectile3: Sprite = null
let projectile2: Sprite = null
let projectile: Sprite = null
let PlayerSprite: Sprite = null
let Go = 0
let Num = -15
Go = 0
mp.setPlayerIndicatorsVisible(false)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
    c c . . . . . . . . . . . . . . 
    c c c . . . . . . . . . . . . . 
    c c c c . . . . . . . . . . . . 
    c c c f . . . . . . . . . . . . 
    c c c f e . . . . . . . . . . . 
    c c e f e c . . . . . . . . . . 
    e e e c 2 c e e . . . . . . . . 
    e e 2 c 2 c 2 e e f c f c c c c 
    2 2 2 e 2 e 4 4 2 f 2 f b d d d 
    2 2 2 e 4 e e e . . . . . . . . 
    2 2 2 f e e . . . . . . . . . . 
    2 4 4 f e . . . . . . . . . . . 
    4 2 2 e . . . . . . . . . . . . 
    2 2 e e . . . . . . . . . . . . 
    e e e . . . . . . . . . . . . . 
    e e . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
    8 8 . . . . . . . . . . . . . . 
    8 8 8 . . . . . . . . . . . . . 
    8 8 8 8 . . . . . . . . . . . . 
    8 8 8 f . . . . . . . . . . . . 
    8 8 8 f 8 . . . . . . . . . . . 
    8 8 8 f 8 c . . . . . . . . . . 
    8 8 8 c 6 c 8 8 . . . . . . . . 
    8 8 6 c 6 c 6 8 8 f c f c c c c 
    6 6 6 e 6 8 9 9 6 f 6 f b d d d 
    6 6 6 e 9 8 8 8 . . . . . . . . 
    6 6 6 f 8 8 . . . . . . . . . . 
    6 9 9 f 8 . . . . . . . . . . . 
    9 6 6 8 . . . . . . . . . . . . 
    6 6 8 8 . . . . . . . . . . . . 
    8 8 8 . . . . . . . . . . . . . 
    8 8 . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Three), sprites.create(img`
    e e . . . . . . . . . . . . . . 
    e e e . . . . . . . . . . . . . 
    e e e e . . . . . . . . . . . . 
    e e e f . . . . . . . . . . . . 
    e e e f e . . . . . . . . . . . 
    e e 2 f e c . . . . . . . . . . 
    2 2 2 c 4 c e e . . . . . . . . 
    2 2 4 c 4 c 4 e e f c f c c c c 
    4 4 4 2 4 2 5 5 4 f 4 f b d d d 
    4 4 4 2 5 2 2 2 . . . . . . . . 
    4 4 4 f 2 2 . . . . . . . . . . 
    4 5 5 f 2 . . . . . . . . . . . 
    5 4 4 2 . . . . . . . . . . . . 
    4 4 2 2 . . . . . . . . . . . . 
    2 2 2 . . . . . . . . . . . . . 
    2 2 . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Four), sprites.create(img`
    8 8 . . . . . . . . . . . . . . 
    8 8 8 . . . . . . . . . . . . . 
    8 8 8 8 . . . . . . . . . . . . 
    8 8 8 f . . . . . . . . . . . . 
    8 8 8 f 8 . . . . . . . . . . . 
    8 8 6 f 8 c . . . . . . . . . . 
    6 6 6 c 7 c 8 8 . . . . . . . . 
    6 6 7 c 7 c 7 8 8 f c f c c c c 
    7 7 7 6 7 6 5 5 7 f 7 f b d d d 
    7 7 7 6 5 6 6 6 . . . . . . . . 
    7 7 7 f 6 6 . . . . . . . . . . 
    7 5 5 f 6 . . . . . . . . . . . 
    5 7 7 6 . . . . . . . . . . . . 
    7 7 6 6 . . . . . . . . . . . . 
    6 6 6 . . . . . . . . . . . . . 
    6 6 . . . . . . . . . . . . . . 
    `, SpriteKind.Player))
let List = sprites.allOfKind(SpriteKind.Player)
for (let index = 0; index < 4; index++) {
    PlayerSprite = List.shift()
    Num += 30
    PlayerSprite.setPosition(13, Num)
    PlayerSprite.setStayInScreen(true)
    mp.setPlayerState(mp.getPlayerBySprite(PlayerSprite), MultiplayerState.score, 0)
    mp.setPlayerState(mp.getPlayerBySprite(PlayerSprite), MultiplayerState.life, 3)
}
game.onUpdateInterval(700, function () {
    if (IsGameStarted()) {
        projectile2 = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . 5 
            . . . . . . . . . . . . . . 5 5 
            . . . . . . . . . . . . . 5 5 5 
            . . . . . . . . 8 8 8 5 5 5 5 5 
            . . . . . . 8 8 8 5 5 5 5 5 5 5 
            . . . . 5 5 5 5 5 5 5 5 5 5 5 5 
            d d 5 5 5 5 5 4 4 4 4 4 4 4 4 5 
            . . . . 5 5 5 5 5 5 5 5 5 5 5 5 
            . . . . . . . 5 4 4 4 4 4 4 4 4 
            . . . . . . . . 5 5 5 5 5 5 5 5 
            . . . . . . . . . . 5 5 5 5 5 5 
            . . . . . . . . . . . . 5 5 5 5 
            . . . . . . . . . . . . . . 5 5 
            . . . . . . . . . . . . . . . 5 
            `, -50, 0)
        projectile2.y = randint(0, 120)
        projectile2.setKind(SpriteKind.Enemy)
    }
})
forever(function () {
    if (sprites.allOfKind(SpriteKind.Player).length == 1) {
        mp.gameOverPlayerWin(mp.getPlayerBySprite(sprites.allOfKind(SpriteKind.Player).shift()))
    }
})
game.onUpdateInterval(500, function () {
    if (IsGameStarted()) {
        projectile3 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 4 . . . . . . 
            . . . . . . . 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, sprites.allOfKind(SpriteKind.Enemy)._pickRandom(), -120, 0)
        projectile3.setKind(SpriteKind.Laser)
    }
})
