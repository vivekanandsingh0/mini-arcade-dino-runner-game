# 🦖 Dino Runner - Mini Arcade Game

A fully functional Dino Runner game built with pure HTML5, CSS3, and vanilla JavaScript. Features smooth 60 FPS animations, physics-based jumping, collision detection, score tracking, and mobile-friendly controls.

---

## 📋 Features

✅ **Canvas-based game loop** using `requestAnimationFrame` for smooth 60 FPS  
✅ **Gravity physics simulation** for realistic jumping  
✅ **Random obstacle spawning** with increasing difficulty  
✅ **Collision detection** with precise hitboxes  
✅ **Score tracking** with LocalStorage persistence for high scores  
✅ **Mobile-friendly** with touch controls  
✅ **Modern UI** with gradient backgrounds and smooth animations  
✅ **Sound effects** support (placeholders included)  
✅ **Retro pixel-art style** graphics  
✅ **Difficulty scaling** - speed increases over time  

---

## 🚀 How to Run

1. **Open the game:**
   - Simply open `index.html` in any modern web browser
   - Or double-click the file to launch it

2. **Play the game:**
   - Click **START GAME** on the start screen
   - Press **SPACE** or **TAP/CLICK** the canvas to jump
   - Avoid the cacti obstacles
   - Try to beat your high score!

3. **Mobile/Touch devices:**
   - Use the **JUMP** button at the bottom of the screen
   - Or tap anywhere on the game canvas

---

## 📁 File Structure

```
mini-arcade-game/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Complete game logic
├── sounds/             # Sound effects folder
│   ├── README.md       # Instructions for adding sounds
│   ├── jump.mp3        # Jump sound (add your own)
│   ├── hit.mp3         # Collision sound (add your own)
│   └── score.mp3       # Score milestone sound (add your own)
└── README.md           # This file
```

---

## 🎮 Game Controls

| Action | Desktop | Mobile |
|--------|---------|--------|
| Jump | `SPACE` key | Tap canvas or JUMP button |
| Start Game | Click START GAME | Tap START GAME |
| Restart | Click PLAY AGAIN | Tap PLAY AGAIN |

---

## 🎨 Customization Guide

### Change Colors

**In `style.css`:**

```css
/* Background gradient */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Dinosaur color (in script.js) */
ctx.fillStyle = '#4CAF50';  // Change to any color

/* Cactus color (in script.js) */
ctx.fillStyle = '#2E7D32';  // Change to any color
```

### Adjust Game Speed

**In `script.js`:**

```javascript
const CONFIG = {
    INITIAL_SPEED: 5,        // Starting speed (default: 5)
    SPEED_INCREMENT: 0.001,  // How fast speed increases (default: 0.001)
    MAX_SPEED: 12,           // Maximum speed (default: 12)
};
```

### Modify Jump Physics

**In `script.js`:**

```javascript
const CONFIG = {
    GRAVITY: 0.6,           // Gravity strength (default: 0.6)
    JUMP_FORCE: -12,        // Jump power (default: -12)
};
```

### Change Obstacle Frequency

**In `script.js`:**

```javascript
const CONFIG = {
    OBSTACLE_MIN_GAP: 1500,  // Minimum distance between obstacles
    OBSTACLE_MAX_GAP: 2500,  // Maximum distance between obstacles
};
```

### Adjust Player Size

**In `script.js`:**

```javascript
const CONFIG = {
    PLAYER_WIDTH: 40,   // Dinosaur width (default: 40)
    PLAYER_HEIGHT: 50,  // Dinosaur height (default: 50)
};
```

---

## 🔊 Adding Sound Effects

The game includes placeholders for sound effects. To add sounds:

1. Download free sound effects from:
   - [Freesound.org](https://freesound.org/)
   - [Zapsplat](https://www.zapsplat.com/)
   - [Mixkit](https://mixkit.co/free-sound-effects/)

2. Save the following files in the `sounds/` folder:
   - `jump.mp3` - Plays when dinosaur jumps
   - `hit.mp3` - Plays on collision (game over)
   - `score.mp3` - Plays at score milestones (every 100 points)

3. The game will automatically play sounds when available

**Note:** The game works perfectly without sound files!

---

## 🛠️ Code Structure

### HTML (`index.html`)
- Start screen with instructions
- Game screen with canvas and score display
- Game over screen with final scores
- Audio elements for sound effects

### CSS (`style.css`)
- Modern gradient backgrounds
- Smooth button animations
- Responsive design for all screen sizes
- Retro pixel-style typography
- Screen transitions

### JavaScript (`script.js`)

**Main Components:**

1. **Configuration** - All game settings in one place
2. **Game State** - Tracks score, speed, and game status
3. **Player Object** - Handles dinosaur movement and physics
4. **Obstacle Class** - Manages cactus obstacles
5. **Cloud Class** - Background decoration
6. **Game Loop** - 60 FPS update and render cycle
7. **Collision Detection** - Precise hitbox checking
8. **Score System** - LocalStorage for high score persistence
9. **Input Controls** - Keyboard and touch support

---

## 🎯 Game Mechanics

### Physics
- Realistic gravity simulation
- Smooth jump arc
- Ground collision detection

### Difficulty Progression
- Game speed gradually increases
- Obstacles spawn at random intervals
- Maximum speed cap prevents impossibility

### Scoring
- Score increases with distance traveled
- High score saved in browser LocalStorage
- Sound plays at every 100-point milestone

### Collision
- Precise hitbox detection
- Small margin for fairness (5px buffer)
- Instant game over on collision

---

## 📱 Responsive Design

The game automatically adapts to different screen sizes:

- **Desktop**: Full-size canvas, keyboard controls
- **Tablet**: Medium canvas, touch controls
- **Mobile**: Compact canvas, touch button

---

## 🌐 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements:**
- HTML5 Canvas support
- JavaScript enabled
- LocalStorage (for high score saving)

---

## 🚀 Deployment

### Option 1: Local
Just open `index.html` in a browser!

### Option 2: Web Server
Upload all files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

### Option 3: Share
Zip the entire folder and share with friends!

---

## 🎓 Learning Resources

This project demonstrates:
- HTML5 Canvas API
- CSS3 animations and gradients
- JavaScript game loops
- Object-oriented programming
- Event handling
- LocalStorage API
- Responsive web design

---

## 📝 Credits

**Made with HTML, CSS & JS**

Created following modern web development best practices with:
- Pure vanilla JavaScript (no frameworks)
- Semantic HTML5
- Modern CSS3
- Canvas 2D rendering
- RequestAnimationFrame for smooth animations

---

## 🐛 Troubleshooting

**Game not starting?**
- Make sure JavaScript is enabled in your browser
- Check browser console for errors (F12)

**High score not saving?**
- Ensure LocalStorage is enabled
- Check if browser is in private/incognito mode

**Sounds not playing?**
- Add .mp3 files to the `sounds/` folder
- Check browser console for audio errors
- Some browsers require user interaction before playing audio

**Game running slow?**
- Close other browser tabs
- Try a different browser
- Reduce browser zoom level

---

## 📄 License

Free to use, modify, and distribute. No attribution required.

---

**Enjoy the game! 🎮🦖**