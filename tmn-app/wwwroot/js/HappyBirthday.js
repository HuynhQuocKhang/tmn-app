const panel = document.querySelector('.panel-hpbd');
// Variables to track the state
let isDragging = false;
let startX = 0;
let showBalloon = 0;
let distanceMoved = 0;

// Function to handle mousedown (start dragging)
panel.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;  // Store the initial X position
    panel.style.cursor = 'grabbing';  // Change cursor style
});

// Add touchstart event for mobile devices
panel.addEventListener('touchstart', (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;  // Store the initial X position for touch
    panel.style.cursor = 'grabbing';  // Change cursor style
});

// Function to handle mousemove (dragging)
document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;  // Only run when dragging
    var deltaX = event.movementX;
    const currentX = deltaX;
    if (currentX > 0 && distanceMoved <= 0) {
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved >= 0 ? 0 : distanceMoved;
    }
    else if (currentX < 0 && currentX > -170 && distanceMoved > -170) {
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved <= -170 ? -170 : distanceMoved;
    }

    // Apply the rotation to the panel
    panel.querySelector('.front').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;
    panel.querySelector('.back').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;

    // Apply the additional style while dragging
    panel.querySelector('.back').style.backgroundColor = 'red';
    panel.querySelector('.back').style.boxShadow = '7px 0px 5px 0px rgba(0,0,0,0.3), inset 2px 0px 15px 0px rgba(0,0,0,0.1)';
   
});

// Add touchmove event for mobile devices
document.addEventListener('touchmove', (event) => {
    if (!isDragging) return;  // Only run when dragging
    const currentX = event.touches[0].clientX - startX;
    startX = event.touches[0].clientX;  // Update startX

    if (currentX > 0 && distanceMoved <= 0) {
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved >= 0 ? 0 : distanceMoved;
    }
    else if (currentX < 0 && currentX > -170 && distanceMoved > -170) {
        distanceMoved = distanceMoved + currentX;

        distanceMoved = distanceMoved <= -170 ? -170 : distanceMoved;
    }


    // Apply the rotation to the panel
    panel.querySelector('.front').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;
    panel.querySelector('.back').style.transform = `perspective(550px) rotateY(${distanceMoved}deg)`;

    // Apply the additional style while dragging
    panel.querySelector('.back').style.backgroundColor = 'red';
    panel.querySelector('.back').style.boxShadow = '7px 0px 5px 0px rgba(0,0,0,0.3), inset 2px 0px 15px 0px rgba(0,0,0,0.1)';
});

// Function to handle mouseup (stop dragging)
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        panel.style.cursor = 'grab';  // Reset cursor
        if (distanceMoved == 0) {
            panel.querySelector('.back').style.backgroundColor = '';
            panel.querySelector('.back').style.boxShadow = '';
        }
    }
});

// Add touchend event for mobile devices
document.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        panel.style.cursor = 'grab';  // Reset cursor
        if (distanceMoved == 0) {
            showBalloon = 0;
            panel.querySelector('.back').style.backgroundColor = '';
            panel.querySelector('.back').style.boxShadow = '';
        } else if (distanceMoved == -170) {
            showBalloon++;

        }

        if (showBalloon==1) {
            createBalloons(7);
        }
    }
});
