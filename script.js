// ========================================
// GAME CONFIGURATION
// ========================================
const CONFIG = {
    // Canvas settings
    CANVAS_WIDTH: 740,
    CANVAS_HEIGHT: 400,
    
    // Player settings
    PLAYER_WIDTH: 40,
    PLAYER_HEIGHT: 50,
    PLAYER_X: 50,
    PLAYER_GROUND_Y: 320,
    
    // Physics
    GRAVITY: 0.6,
    JUMP_FORCE: -12,
    
    // Game speed
    INITIAL_SPEED: 5,
    SPEED_INCREMENT: 0.001,
    MAX_SPEED: 12,
    
    // Obstacles
    OBSTACLE_WIDTH: 30,
    OBSTACLE_MIN_HEIGHT: 40,
    OBSTACLE_MAX_HEIGHT: 60,
    OBSTACLE_MIN_GAP: 1500,
    OBSTACLE_MAX_GAP: 2500,
    
    // Clouds
    CLOUD_COUNT: 3,
    CLOUD_SPEED: 1,
    
    // Score
    SCORE_INCREMENT: 1,
    MILESTONE_SCORE: 100
};

// ========================================
// GAME STATE
// ========================================
const gameState = {
    isRunning: false,
    score: 0,
    highScore: 0,
    speed: CONFIG.INITIAL_SPEED,
    frameCount: 0,
    lastMilestone: 0
};

// ========================================
// GAME OBJECTS
// ========================================
const player = {
    x: CONFIG.PLAYER_X,
    y: CONFIG.PLAYER_GROUND_Y,
    width: CONFIG.PLAYER_WIDTH,
    height: CONFIG.PLAYER_HEIGHT,
    velocityY: 0,
    isJumping: false,
    
    jump() {
        if (!this.isJumping) {
            this.velocityY = CONFIG.JUMP_FORCE;
            this.isJumping = true;
            playSound('jump');
        }
    },
    
    update() {
        // Apply gravity
        this.velocityY += CONFIG.GRAVITY;
        this.y += this.velocityY;
        
        // Ground collision
        if (this.y >= CONFIG.PLAYER_GROUND_Y) {
            this.y = CONFIG.PLAYER_GROUND_Y;
            this.velocityY = 0;
            this.isJumping = false;
        }
    },
    
    draw(ctx) {
        // Draw dino body (simple pixel art style)
        ctx.fillStyle = '#4CAF50';
        
        // Body
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Head
        ctx.fillRect(this.x + this.width - 15, this.y - 15, 20, 20);
        
        // Eye
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x + this.width - 8, this.y - 10, 5, 5);
        
        // Legs
        ctx.fillStyle = '#4CAF50';
        const legOffset = Math.floor(gameState.frameCount / 10) % 2 === 0 ? 0 : 5;
        ctx.fillRect(this.x + 5, this.y + this.height, 8, 10 + legOffset);
        ctx.fillRect(this.x + this.width - 13, this.y + this.height, 8, 10 - legOffset);
        
        // Tail
        ctx.fillRect(this.x - 10, this.y + 10, 15, 8);
    },
    
    reset() {
        this.y = CONFIG.PLAYER_GROUND_Y;
        this.velocityY = 0;
        this.isJumping = false;
    }
};

const obstacles = [];
const clouds = [];

// ========================================
// OBSTACLE CLASS
// ========================================
class Obstacle {
    constructor(x) {
        this.x = x;
        this.width = CONFIG.OBSTACLE_WIDTH;
        this.height = CONFIG.OBSTACLE_MIN_HEIGHT + 
                     Math.random() * (CONFIG.OBSTACLE_MAX_HEIGHT - CONFIG.OBSTACLE_MIN_HEIGHT);
        this.y = CONFIG.PLAYER_GROUND_Y + CONFIG.PLAYER_HEIGHT - this.height;
        this.passed = false;
    }
    
    update() {
        this.x -= gameState.speed;
    }
    
    draw(ctx) {
        // Draw cactus (pixel art style)
        ctx.fillStyle = '#2E7D32';
        
        // Main body
        ctx.fillRect(this.x + 10, this.y, 10, this.height);
        
        // Arms
        if (this.height > 45) {
            ctx.fillRect(this.x, this.y + 15, 10, 8);
            ctx.fillRect(this.x + 20, this.y + 20, 10, 8);
        }
        
        // Spikes
        ctx.fillStyle = '#1B5E20';
        for (let i = 0; i < this.height; i += 8) {
            ctx.fillRect(this.x + 8, this.y + i, 3, 3);
            ctx.fillRect(this.x + 19, this.y + i + 4, 3, 3);
        }
    }
    
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    collidesWith(player) {
        return player.x < this.x + this.width - 5 &&
               player.x + player.width > this.x + 5 &&
               player.y < this.y + this.height - 5 &&
               player.y + player.height > this.y + 5;
    }
}

// ========================================
// CLOUD CLASS
// ========================================
class Cloud {
    constructor() {
        this.x = Math.random() * CONFIG.CANVAS_WIDTH;
        this.y = Math.random() * 150 + 20;
        this.width = 60 + Math.random() * 40;
        this.height = 30;
        this.speed = CONFIG.CLOUD_SPEED * (0.5 + Math.random() * 0.5);
    }
    
    update() {
        this.x -= this.speed;
        
        // Wrap around
        if (this.x + this.width < 0) {
            this.x = CONFIG.CANVAS_WIDTH;
            this.y = Math.random() * 150 + 20;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        // Cloud shape (simple circles)
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.arc(this.x + 20, this.y, 20, 0, Math.PI * 2);
        ctx.arc(this.x + 40, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ========================================
// DOM ELEMENTS
// ========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const currentScoreEl = document.getElementById('currentScore');
const highScoreEl = document.getElementById('highScore');
const finalScoreEl = document.getElementById('finalScore');
const finalHighScoreEl = document.getElementById('finalHighScore');

// Buttons
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const menuBtn = document.getElementById('menuBtn');
const jumpBtn = document.getElementById('jumpBtn');

// Sound elements
const jumpSound = document.getElementById('jumpSound');
const hitSound = document.getElementById('hitSound');
const scoreSound = document.getElementById('scoreSound');

// ========================================
// CANVAS SETUP
// ========================================
function setupCanvas() {
    canvas.width = CONFIG.CANVAS_WIDTH;
    canvas.height = CONFIG.CANVAS_HEIGHT;
}

// ========================================
// GAME INITIALIZATION
// ========================================
function initGame() {
    setupCanvas();
    loadHighScore();
    updateHighScoreDisplay();
    
    // Initialize clouds
    for (let i = 0; i < CONFIG.CLOUD_COUNT; i++) {
        clouds.push(new Cloud());
    }
}

// ========================================
// GAME LOOP
// ========================================
function gameLoop() {
    if (!gameState.isRunning) return;
    
    // Update
    update();
    
    // Draw
    draw();
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// ========================================
// UPDATE FUNCTION
// ========================================
function update() {
    gameState.frameCount++;
    
    // Update player
    player.update();
    
    // Update clouds
    clouds.forEach(cloud => cloud.update());
    
    // Update obstacles
    obstacles.forEach(obstacle => obstacle.update());
    
    // Remove off-screen obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].isOffScreen()) {
            obstacles.splice(i, 1);
        }
    }
    
    // Spawn new obstacles
    if (obstacles.length === 0 || 
        obstacles[obstacles.length - 1].x < CONFIG.CANVAS_WIDTH - 
        (CONFIG.OBSTACLE_MIN_GAP + Math.random() * (CONFIG.OBSTACLE_MAX_GAP - CONFIG.OBSTACLE_MIN_GAP))) {
        obstacles.push(new Obstacle(CONFIG.CANVAS_WIDTH));
    }
    
    // Check collisions
    for (let obstacle of obstacles) {
        if (obstacle.collidesWith(player)) {
            gameOver();
            return;
        }
        
        // Score points for passing obstacles
        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
            obstacle.passed = true;
            gameState.score += CONFIG.SCORE_INCREMENT;
            updateScoreDisplay();
            
            // Play sound at milestones
            if (gameState.score % CONFIG.MILESTONE_SCORE === 0 && 
                gameState.score > gameState.lastMilestone) {
                gameState.lastMilestone = gameState.score;
                playSound('score');
            }
        }
    }
    
    // Increase difficulty over time
    if (gameState.speed < CONFIG.MAX_SPEED) {
        gameState.speed += CONFIG.SPEED_INCREMENT;
    }
}

// ========================================
// DRAW FUNCTION
// ========================================
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // Draw sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, CONFIG.CANVAS_HEIGHT);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
    
    // Draw clouds
    clouds.forEach(cloud => cloud.draw(ctx));
    
    // Draw ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, CONFIG.PLAYER_GROUND_Y + CONFIG.PLAYER_HEIGHT, CONFIG.CANVAS_WIDTH, 10);
    
    // Draw ground pattern
    ctx.fillStyle = '#654321';
    for (let i = 0; i < CONFIG.CANVAS_WIDTH; i += 20) {
        ctx.fillRect(i + (gameState.frameCount % 20), 
                    CONFIG.PLAYER_GROUND_Y + CONFIG.PLAYER_HEIGHT, 
                    10, 10);
    }
    
    // Draw obstacles
    obstacles.forEach(obstacle => obstacle.draw(ctx));
    
    // Draw player
    player.draw(ctx);
}

// ========================================
// GAME CONTROL FUNCTIONS
// ========================================
function startGame() {
    // Reset game state
    gameState.isRunning = true;
    gameState.score = 0;
    gameState.speed = CONFIG.INITIAL_SPEED;
    gameState.frameCount = 0;
    gameState.lastMilestone = 0;
    
    // Reset player
    player.reset();
    
    // Clear obstacles
    obstacles.length = 0;
    
    // Update UI
    updateScoreDisplay();
    showScreen('game');
    
    // Start game loop
    gameLoop();
}

function gameOver() {
    gameState.isRunning = false;
    playSound('hit');
    
    // Update high score
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        saveHighScore();
    }
    
    // Update final scores
    finalScoreEl.textContent = gameState.score;
    finalHighScoreEl.textContent = gameState.highScore;
    
    // Show game over screen
    setTimeout(() => {
        showScreen('gameOver');
    }, 500);
}

function returnToMenu() {
    showScreen('start');
}

// ========================================
// SCREEN MANAGEMENT
// ========================================
function showScreen(screenName) {
    startScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    
    switch(screenName) {
        case 'start':
            startScreen.classList.add('active');
            break;
        case 'game':
            gameScreen.classList.add('active');
            break;
        case 'gameOver':
            gameOverScreen.classList.add('active');
            break;
    }
}

// ========================================
// SCORE MANAGEMENT
// ========================================
function updateScoreDisplay() {
    currentScoreEl.textContent = gameState.score;
}

function updateHighScoreDisplay() {
    highScoreEl.textContent = gameState.highScore;
}

function saveHighScore() {
    try {
        localStorage.setItem('dinoRunnerHighScore', gameState.highScore.toString());
    } catch (e) {
        console.warn('Could not save high score to localStorage');
    }
}

function loadHighScore() {
    try {
        const saved = localStorage.getItem('dinoRunnerHighScore');
        if (saved) {
            gameState.highScore = parseInt(saved, 10);
        }
    } catch (e) {
        console.warn('Could not load high score from localStorage');
    }
}

// ========================================
// SOUND MANAGEMENT
// ========================================
function playSound(soundName) {
    try {
        let sound;
        switch(soundName) {
            case 'jump':
                sound = jumpSound;
                break;
            case 'hit':
                sound = hitSound;
                break;
            case 'score':
                sound = scoreSound;
                break;
        }
        
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => {
                // Silently fail if sound can't play
                console.log('Sound play failed:', e);
            });
        }
    } catch (e) {
        // Silently fail if sound system not available
    }
}

// ========================================
// INPUT CONTROLS
// ========================================
// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameState.isRunning) {
        e.preventDefault();
        player.jump();
    }
});

// Canvas click/touch
canvas.addEventListener('click', () => {
    if (gameState.isRunning) {
        player.jump();
    }
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState.isRunning) {
        player.jump();
    }
});

// Mobile jump button
jumpBtn.addEventListener('click', () => {
    if (gameState.isRunning) {
        player.jump();
    }
});

jumpBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (gameState.isRunning) {
        player.jump();
    }
});

// Button event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
menuBtn.addEventListener('click', returnToMenu);

// ========================================
// INITIALIZE GAME ON LOAD
// ========================================
window.addEventListener('load', () => {
    initGame();
});
