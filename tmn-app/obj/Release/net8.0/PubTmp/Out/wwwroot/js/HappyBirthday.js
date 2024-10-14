const panel = document.querySelector('.panel');
let isOpened = false;
// Variables to track the state
let isDragging = false;
let startX = 0;
let rotateYValue = -170;

// Define the range of rotation
const minRotateY = -170;
const maxRotateY = 0;
const maxMoveDistance = 300;  // The max distance in pixels that corresponds to full rotation
let distanceMoved = 0;

// Function to handle mousedown (start dragging)
panel.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;  // Store the initial X position
    panel.style.cursor = 'grabbing';  // Change cursor style
    console.log("mousedown");
});

// Add touchstart event for mobile devices
panel.addEventListener('touchstart', (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;  // Store the initial X position for touch
    panel.style.cursor = 'grabbing';  // Change cursor style
    console.log("touchstart");
});

// Function to handle mousemove (dragging)
document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;  // Only run when dragging
    var deltaX = event.movementX;
    const currentX = deltaX;
    if (currentX > 0 && distanceMoved <= 0) {
        console.log("right")
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved >= 0 ? 0 : distanceMoved;
    }
    else if (currentX < 0 && currentX > -170 && distanceMoved > -170) {
        console.log("left")
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved <= -170 ? -170 : distanceMoved;
    }

    // Apply the rotation to the panel
    panel.querySelector('.front').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;
    panel.querySelector('.back').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;

    // Apply the additional style while dragging
    panel.querySelector('.back').style.boxShadow = '7px 0px 5px 0px rgba(0,0,0,0.3), inset 2px 0px 15px 0px rgba(0,0,0,0.1)';
});

// Add touchmove event for mobile devices
document.addEventListener('touchmove', (event) => {
    if (!isDragging) return;  // Only run when dragging
    const currentX = event.touches[0].clientX - startX;
    startX = event.touches[0].clientX;  // Update startX

    if (currentX > 0 && distanceMoved <= 0) {
        console.log("right")
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved >= 0 ? 0 : distanceMoved;
    }
    else if (currentX < 0 && currentX > -170 && distanceMoved > -170) {
        console.log("left")
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved <= -170 ? -170 : distanceMoved;
    }

    // Apply the rotation to the panel
    panel.querySelector('.front').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;
    panel.querySelector('.back').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;

    // Apply the additional style while dragging
    panel.querySelector('.back').style.boxShadow = '7px 0px 5px 0px rgba(0,0,0,0.3), inset 2px 0px 15px 0px rgba(0,0,0,0.1)';
});

// Function to handle mouseup (stop dragging)
document.addEventListener('mouseup', () => {
    endOfTouch();
});

// Add touchend event for mobile devices
document.addEventListener('touchend', () => {
    endOfTouch();
});

function endOfTouch() {
    if (isDragging) {
        isDragging = false;
        panel.style.cursor = 'grab';  // Reset cursor
        if (distanceMoved == 0) {
            //isOpened = false;
            panel.querySelector('.back').style.backgroundColor = '';
            panel.querySelector('.back').style.boxShadow = '';
        }
        else {
            createBalloons(6);

            setTimeout(() => {
                //removeBalloons();
            },10000)
            //isOpened = true;
        }
    }
}
