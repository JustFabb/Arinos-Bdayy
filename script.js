const heartContainer = document.getElementById('heart-container');
const mainHeart = document.getElementById('main-heart');
const fallingHeartsContainer = document.getElementById('falling-hearts-container');
const lettersContainer = document.getElementById('letters-container');
const letterPopup = document.getElementById('letter-popup');
const closePopupBtn = document.getElementById('close-popup');
const popupMessage = document.getElementById('popup-message');
const popupSignature = document.getElementById('popup-signature');
const heartCanvas = document.getElementById('heartCanvas'); // The HeartyHeart background

// ... (skip variables to function) ...

let tapCount = 0;
const MAX_TAPS = 10;
let currentActiveLetter = null;

// The SVG string for hearts
const heartSVG = `<svg viewBox="-2 -2 36 34" style="width:100%; height:100%; overflow:visible;">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
    c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" fill="#ff2a2a" stroke="#a30000" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;

// Specific birthday messages
const messages = [
    { 
        name: "Archer", 
        text: "hi arino, happy birthday. I know you are secretly a boy but dont worry your secret is safe with me" 
    },
    { 
        name: "VS", 
        text: "Happy birthday arino💙 Even tho it's fun to annoy to you. you're pretty chill, nice and friendly Hopefully you'll have an amazing day celebrating you bday (I'm still waiting for the art session btw)" 
    },
    { 
        name: "Ehan", 
        text: "Arino, I love how optimistic you are about everything you do." 
    },
    { 
        name: "Tuti", 
        text: "if im being honest arino, u are one of my best friends even though it looks like u scare me, are like a sister to me, these 2 years have been great with you and i could not be more thankful for a friend like you because u js have been there yk. Your character is honestly really amazing if im being honest. Ur 19 now damn fucking aunty crazy shit. I am lowkey so happy seeing u js being yourself these 2 years and you've honestly just been such a great friend to me. I understand how life is allat but ur birthday is the day i hope i forget everything and just enjoy yourself. I hope your birthday goes honestly just perfectly because that's what u deserve. These years are the best time of your life, dont waste them, live your life because u can. I really just wish u the warmest regards for your birthday have fun gng, not only on this day but everyday. you have a great life to live. Happy Birthday lavu didi (soon aunty).<br><br><i>[Fab's Note: aunty soon nhi tu abhi hi aunty ho gyi hai lmao]</i>" 
    },
    { 
        name: "Neil", 
        text: "hiiiii Arino happy birthday nice things i like about you is you are supportive nd kind to mee🥺 🥺" 
    },
    { 
        name: "Hoshi", 
        text: "Happy birthday Arino. I honestly hope this year brings you nothing but happiness, good health and everything you've been wishing for. Thank you for always being there, for making me laugh. and for being such an amazing friend. U deserve so much love and success because u're genuinely one of the kindest soul i know. I hope today is filled with people who love u, lots of laughter and memories you'll never forget. No matter what happens, I'll always be cheering u on. Enjoy every second of ur day u deserve the absolute best. Happy birthday again. 🤍" 
    },
    { 
        name: "Oti", 
        text: "Arino you have a nice voice<br><br><i>[Fab's note: this nigga lmao]</i>" 
    },
    { 
        name: "Fawn", 
        text: "Arino is a wholesome person and her cosplays r great too and maahir, arino and fab make a great trio. Happy birthday to her." 
    },
    { 
        name: "Luceyy", 
        text: "HAPPIEST BIRTHDAY AWINOOO<br>I have known u for only a few months and yet we have become such a good friends. I still remember that one time u had me call ur mom so u can go out with fab and maahir as i pretended to be aachal lmfao 💀<br><br><i>[FAB'S NOTE: SON SHE PRETENDED TO BE AANCHAL???]</i><br><br>We played ghost games in robloc and so much brawl and vc and i love all our fun moments together. Happiest Birthday to you queen, I hope you enjoy to the fullest and have a great day with all the love you deserve 💙" 
    },
    { 
        name: "Rikki", 
        text: "I'm very bad at these. Happy Birthday Arino. May God give you all the happiness you deserve and get 3x of the kindness you show to others.<br><br>Happy birthday and this is for u:<br>Another year older, still no clue,<br>But hey -- at least you're not turning 42.<br>So blow those candles, try not to choke,<br>Even your cake thinks you're a joke." 
    },
    {
        name: "Bhindi",
        text: "Happy Birthday to my lovely wifey. I hope you always stay this sweet, happy and adorable. you deserve all the love, happiness and beautiful moments in the world mah bbg. Happie Happie birthday dumbah"
    },
    {
        name: "Arc",
        text: "No matter how dumb u are its sometimes cute and you'lll always be my sweet Daughter"
    },
    {
        name: "Div",
        text: "HAPPIE BIRTHDAY ARINOOOOOO. We havent actually met and no doubt id love to but youre one of the most understanding and sweet people ive met. youre autistic(like ur dad reaper) and chaotic like the fheuirhferrmr u usually send when frustrated or the completely misspeled things like dauture that makes no sense. Therefore as your unofficial dauture(who ran away) i hope you have a greatttttttttt day today. ILYYYY"
    },
    {
        name: "Penguin",
        text: "Hiiii Happy Birthday Arinoo. I like your personality. You have passion, you take initiative in things. and also your heels and scooty, I'm stealing them next time we meet. Enjoyyyyyyy your day"
    },
    {
        name: "Talyy",
        text: "mmm arino is pookie tho acts monke manier times. arino being excited for tech related stuff lowkey feels so nice. her spamming my name when i join vc is cute and funny ngl (ok yeah i've no idea what to say without sounding like arino's my crush) well happy bday aeiouu (also maahirino)"
    },
    {
        name: "Flamigo",
        text: "I really like how she is really nice even when she is down she's also really adorable"
    },
    {
        name: "Vill",
        text: "I like how she yells at us in hindi even tho we dont understand her"
    },
    {
        name: "Flick",
        text: "Happy bday sister arinomoto. 19 already amd still managing to goon on robloc, yap about anime n cosplaying and get bullied in brawl stars all at once 💀 kinda impressive ngl. somehow ur still one of the nicest and kindest people ever tho, alaways around for ur friends. Never lose ur wholesome n gooft side lmao, hope u have the best birthday, professional groomer 🫡 💙"
    },
    {
        name: "Damner",
        text: "HAPPY BIRTHDAY ARINOOOOO! I hope you have a great day today. you're one of the realest person I've ever met, well didnt expect it from reapers dauture. You're really friendly and all your cosplays and artworks look gorgeour. Have funnn todayyy Happy Bdayyy"
    },
    {
        name: "READ ME",
        text: "Sorry, I couldn't do anything better. I was very busy the past few days and very tired as well, I somehow came up with this with maahir's help. Trusttt I am gonna keep improving this site as my personal hobby and make this most perfect shit everrr.",
        special: true
    }
];

// 1. Heart Tapping Logic
heartContainer.addEventListener('click', () => {
    if (tapCount >= MAX_TAPS) return;

    tapCount++;
    
    // Scale up the heart
    const scaleValue = 1 + (tapCount * 0.5);
    mainHeart.style.transform = `scale(${scaleValue})`;

    // Add shake animation
    heartContainer.classList.remove('shake');
    // Trigger reflow to restart animation
    void heartContainer.offsetWidth; 
    heartContainer.classList.add('shake');

    if (tapCount === MAX_TAPS) {
        triggerExplosion();
    }
});

function triggerExplosion() {
    // Hide main heart
    heartContainer.style.display = 'none';

    // Hide the start text
    const startText = document.getElementById('start-screen-text');
    if (startText) {
        startText.style.opacity = '0';
        setTimeout(() => startText.style.display = 'none', 500);
    }

    // Create explosion particles
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 30; i++) {
        createParticle(centerX, centerY);
    }

    // Start the massive wipe sequence
    startWipeSequence();
}

function createParticle(x, y) {
    const el = document.createElement('div');
    el.classList.add('particle-heart');
    el.innerHTML = heartSVG;
    
    // Random size between 10px and 30px
    const size = Math.random() * 20 + 10;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    
    el.style.left = `${x - size/2}px`;
    el.style.top = `${y - size/2}px`;

    // Random destination for explosion
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 200 + 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--ty', `${ty}px`);
    
    // Animation
    el.style.animation = `explode 1s ease-out forwards`;
    
    document.body.appendChild(el);

    // Cleanup
    setTimeout(() => {
        el.remove();
    }, 1000);
}

function startWipeSequence() {
    // We create a dense band of MANY small hearts to wipe the screen
    const wipeDuration = 3; // seconds
    const heartCount = 1200; // INSANELY THICK density!
    
    for (let i = 0; i < heartCount; i++) {
        const el = document.createElement('div');
        el.classList.add('falling-heart');
        el.innerHTML = heartSVG;
        
        // Small sizes so they look like a shower
        const size = Math.random() * 30 + 20; 
        el.style.width = `${size}px`; 
        el.style.height = `${size}px`;
        
        // Distribute randomly across the width
        el.style.left = `${Math.random() * 105 - 2.5}vw`; // allow slightly off-screen to cover edges
        
        // Give them a staggered start so they form a thick band
        // Max delay 0.3s to make the band vertically THINNER but extremely dense
        const delay = Math.random() * 0.3; 
        el.style.animationDelay = `${delay}s`;
        
        // Different random orientations and spinning
        const startRot = Math.random() * 360;
        const endRot = startRot + (Math.random() * 360 - 180); 
        
        el.style.setProperty('--rot-start', `${startRot}deg`);
        el.style.setProperty('--rot-end', `${endRot}deg`);
        
        // Changed ease-in to linear so it tracks the linear clip-path perfectly!
        el.style.animation = `wipeFall ${wipeDuration}s linear ${delay}s both`;
        
        fallingHeartsContainer.appendChild(el);
        
        // Cleanup
        setTimeout(() => {
            el.remove();
        }, (wipeDuration + delay) * 1000);
    }
    
    // Trigger the canvas background animation immediately.
    // The CSS animation has a perfectly calculated 0.9s delay and 1.5s duration 
    // built-in so it tracks exactly in the middle of our new 0.3s band!
    heartCanvas.classList.remove('hidden');
    heartCanvas.classList.add('reveal');
    initHeartyHeart();

    // Call showLetters immediately so they can drop in sync with the curtain
    showLetters();

    // After wipe finishes, start random falling hearts
    setTimeout(() => {
        startFallingHearts();
    }, (wipeDuration + 0.5) * 1000);
}

function startFallingHearts() {
    setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('falling-heart');
        el.innerHTML = heartSVG;

        const size = Math.random() * 25 + 15;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;

        // Random horizontal position
        el.style.left = `${Math.random() * 100}vw`;
        
        // Random rotations
        el.style.setProperty('--rot-start', `${Math.random() * 360}deg`);
        el.style.setProperty('--rot-end', `${Math.random() * 360 + 360}deg`);

        // Random duration between 3s and 6s
        const duration = Math.random() * 3 + 3;
        el.style.animation = `fall ${duration}s linear forwards`;

        fallingHeartsContainer.appendChild(el);

        // Cleanup
        setTimeout(() => {
            el.remove();
        }, duration * 1000);
    }, 300); // New heart every 300ms
}

function showLetters() {
    lettersContainer.classList.remove('hidden');

    messages.forEach((msg, index) => {
        const letterWrap = document.createElement('div');
        letterWrap.classList.add('letter-wrapper');
        
        if (msg.special) {
            // Position special READ ME letter at the bottom center of the screen
            letterWrap.style.left = `0px`; // Center horizontally
            
            // window.innerHeight / 2 is the bottom edge since the container is at 50%
            // We subtract roughly 100px to keep it above the very bottom edge
            letterWrap.style.top = `${(window.innerHeight / 2) - 100}px`; 
            
            // Give it a fixed straight rotation and super high z-index
            letterWrap.style.zIndex = 1000;
            
            const envelope = document.createElement('div');
            envelope.classList.add('envelope');
            envelope.style.transform = `rotate(0deg)`; // Straight
            
            // Make the READ ME letter stand out a bit
            envelope.style.border = '2px solid #ff2a2a';
            envelope.style.boxShadow = '0 0 15px rgba(255, 42, 42, 0.6)';
            
            // ... (we'll append content below)
            var envRef = envelope; // Keep reference
        } else {
            // Position them in a dense circular cluster
            const angle = Math.random() * Math.PI * 2;
            const maxRadius = Math.min(window.innerWidth * 0.4, 350);
            const radius = Math.sqrt(Math.random()) * maxRadius; 
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;
            
            letterWrap.style.left = `${offsetX}px`;
            letterWrap.style.top = `${offsetY}px`;
            
            // Give each letter a random Z-index so they overlap naturally in a pile
            letterWrap.style.zIndex = Math.floor(Math.random() * 50);
            
            const envelope = document.createElement('div');
            envelope.classList.add('envelope');
            
            // Randomly rotate each envelope to make the pile look messy!
            const rot = (Math.random() - 0.5) * 60; // between -30 and 30 degrees
            envelope.style.transform = `rotate(${rot}deg)`;
            
            var envRef = envelope;
        }
        
        const content = document.createElement('div');
        content.classList.add('envelope-content');
        
        const heart = document.createElement('div');
        heart.classList.add('envelope-heart');
        heart.innerHTML = '❤️';
        
        const nameLabel = document.createElement('div');
        nameLabel.classList.add('envelope-name');
        nameLabel.textContent = msg.name;
        
        content.appendChild(heart);
        content.appendChild(nameLabel);
        envRef.appendChild(content);
        
        letterWrap.appendChild(envRef);
        
        lettersContainer.appendChild(letterWrap);

        // They drop in when the curtain reaches the middle of the screen
        // The thick curtain crosses 0vh to 100vh between 0.9s and 2.4s. 
        // 1.4s is roughly in the middle!
        const dropDelay = 1.2 + (Math.random() * 0.4); 
        letterWrap.style.animation = `dropIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${dropDelay}s backwards`;

        // Click event to open
        letterWrap.addEventListener('click', () => {
            openLetter(letterWrap, msg);
        });
    });
}

function openLetter(letterElement, msgObj) {
    currentActiveLetter = letterElement;
    popupMessage.innerHTML = msgObj.text;
    popupSignature.textContent = `- ${msgObj.name}`;
    letterPopup.classList.remove('hidden'); // Force remove hidden in case index.html is cached
    letterPopup.classList.add('show');
}

closePopupBtn.addEventListener('click', () => {
    letterPopup.classList.remove('show');
    currentActiveLetter = null;
});


// --- HEARTY HEART BACKGROUND CODE ---
let heartyInitialized = false;

function initHeartyHeart() {
    if (heartyInitialized) return;
    heartyInitialized = true;

    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    
    const shapeCount = 4; 
    const speed = 0.5;   
    const colWhite = "#000000"; // Black
    
    // Changing palette to strictly Red
    const palette = [
        "#ff0000" // Red
    ];
    
    let width, height;
    let shapeInstances = [];
    
    const preRenderedHearts = []; 
    const framesCount = 60; 
    const cacheSize = 250;  
    
    function initCache() {
        const baseHeartPath = new Path2D();
        const radius = cacheSize * 0.48; 
        const scaleFactor = radius / 18; 
        
        for (let t = 0; t <= Math.PI * 2; t += 0.05) {
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            baseHeartPath.lineTo(x * scaleFactor, -y * scaleFactor);
        }
        baseHeartPath.closePath();

        for (let c = 0; c < palette.length; c++) {
            preRenderedHearts[c] = [];
            for (let f = 0; f < framesCount; f++) {
                const offCanvas = document.createElement('canvas');
                offCanvas.width = cacheSize;
                offCanvas.height = cacheSize;
                const oCtx = offCanvas.getContext('2d');
                
                oCtx.translate(cacheSize / 2, cacheSize / 2);
                
                oCtx.clip(baseHeartPath); 
                oCtx.fillStyle = colWhite;
                oCtx.fill(baseHeartPath);

                let progress = f / framesCount;
                const totalBands = shapeCount * 2;
                const currentOffset = 2.0 * progress - 1.0;
                let bandsToDraw = [];

                for (let i = 0; i < totalBands; i++) {
                    let delta = i - currentOffset;
                    let radiusRatio = 1.0 - (delta / totalBands);
                    if (radiusRatio > 0) {
                        let bandColor = (i % 2 === 0) ? palette[c] : colWhite; 
                        bandsToDraw.push({ radius: radiusRatio, color: bandColor });
                    }
                }

                let innerRadius = currentOffset / totalBands;
                if (innerRadius > 0) {
                    bandsToDraw.push({ radius: innerRadius, color: palette[c] });
                }

                bandsToDraw.sort((a, b) => b.radius - a.radius);

                bandsToDraw.forEach(band => {
                    oCtx.save();
                    oCtx.scale(band.radius, band.radius);
                    oCtx.fillStyle = band.color;
                    oCtx.fill(baseHeartPath);
                    oCtx.restore();
                });

                preRenderedHearts[c].push(offCanvas);
            }
        }
    }

    function generateShapes() {
        shapeInstances = [];
        const maxDim = Math.max(width, height); 
        const spacing = maxDim * 0.07; 
        
        for (let x = -spacing * 2; x < width + spacing * 2; x += spacing) {
            for (let y = -spacing * 2; y < height + spacing * 2; y += spacing) {
                const jitterX = (Math.random() - 0.5) * spacing * 1.2;
                const jitterY = (Math.random() - 0.5) * spacing * 1.2;
                
                shapeInstances.push({
                    x: x + jitterX,
                    y: y + jitterY,
                    scale: maxDim * (Math.random() * 0.15 + 0.08),
                    rotation: (Math.random() - 0.5) * (Math.PI / 2), 
                    timeOffset: Math.random(),
                    colorIndex: Math.floor(Math.random() * palette.length)
                });
            }
        }
        shapeInstances.sort((a, b) => b.scale - a.scale);
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        generateShapes();
    }
    window.addEventListener('resize', resize);

    function render(timeMs) {
        const globalTime = timeMs / 1000;
        
        ctx.fillStyle = colWhite;
        ctx.fillRect(0, 0, width, height);
        
        shapeInstances.forEach(instance => {
            let fractTimeSpeed = ((globalTime + instance.timeOffset) * speed) % 1.0;
            if (fractTimeSpeed < 0) fractTimeSpeed += 1.0; 
            
            let frameIndex = Math.floor(fractTimeSpeed * framesCount);
            if (frameIndex >= framesCount) frameIndex = framesCount - 1; 

            let heartImage = preRenderedHearts[instance.colorIndex][frameIndex];

            ctx.save();
            ctx.translate(instance.x, instance.y);
            ctx.rotate(instance.rotation);
            
            let drawSize = instance.scale * 2; 
            ctx.drawImage(heartImage, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
            
            ctx.restore();
        });

        requestAnimationFrame(render);
    }

    initCache();
    resize();
    requestAnimationFrame(render);
}
