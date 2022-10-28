let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', (e) => {
    playerState = e.target.value;
})

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerSprite = new Image();
playerSprite.src = "./img/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 13;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    }, 
    {
        name: 'run',
        frames: 9,
    }, 
    {
        name: 'dizzy',
        frames: 11,
    }, 
    {
        name: 'sit',
        frames: 5,
    }, 
    {
        name: 'roll',
        frames: 7,
    }, 
    {
        name: 'bite',
        frames: 7,
    }, 
    {
        name: 'ko',
        frames: 12,
    }, 
    {
        name: 'getHit',
        frames: 4,
    }, 
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for(let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
})

console.log(spriteAnimations['jump'].loc[0].y);

function animate_sprite() {
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    c.drawImage(playerSprite, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate_sprite);
}

animate_sprite();