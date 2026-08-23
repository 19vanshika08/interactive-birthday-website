// =========================================================
// BIRTHDAY COUNTDOWN
// =========================================================


// TEST MODE
// Birthday happens 10 seconds after page loads.
//
// When everything is finished testing,
// replace this with:
//
// const birthday =
//     new Date("August 19, 2026 00:00:00").getTime();


const birthday =
    new Date(Date.now() + 10000).getTime();// this is a demo so countdown is set to 10s you can replace it with your birthday countdown,format mentioned in the comment above this line

let birthdayStarted = false;

let candlesBlown = 0;

const totalCandles = 5;


// =========================================================
// ELEMENTS
// =========================================================

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


const birthdayContainer =
    document.querySelector(
        ".birthday-container"
    );


const celebrationScreen =
    document.getElementById(
        "celebration-screen"
    );


const birthdayScreen =
    document.getElementById(
        "birthday-screen"
    );


const surpriseScreen =
    document.getElementById(
        "surprise-screen"
    );


const memoriesScreen =
    document.getElementById(
        "memories-screen"
    );


const enterButton =
    document.getElementById(
        "enter-button"
    );


const surpriseButton =
    document.getElementById(
        "surprise-button"
    );


const continueButton =
    document.getElementById(
        "continue-button"
    );


const music =
    document.getElementById(
        "birthday-music"
    );


const particleContainer =
    document.getElementById(
        "particles"
    );


const confettiContainer =
    document.getElementById(
        "confetti-container"
    );


const candleInstruction =
    document.getElementById(
        "candle-instruction"
    );


const candles =
    document.querySelectorAll(
        ".candle"
    );


// =========================================================
// COUNTDOWN
// =========================================================

function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        birthday - now;


    // =====================================================
    // BIRTHDAY START
    // =====================================================

    if (
        difference <= 0 &&
        !birthdayStarted
    ) {

        birthdayStarted = true;


        daysElement.textContent = "00";

        hoursElement.textContent = "00";

        minutesElement.textContent = "00";

        secondsElement.textContent = "00";


        // Hide countdown

        birthdayContainer.classList.add(
            "hidden"
        );


        // Show celebration

        celebrationScreen.classList.add(
            "active"
        );


        // Start celebration effects

        createConfetti();

        createCelebrationParticles();


        return;
    }


    // =====================================================
    // CALCULATE TIME
    // =====================================================

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    // =====================================================
    // DISPLAY
    // =====================================================

    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


// Start immediately

updateCountdown();


// Update every second

setInterval(
    updateCountdown,
    1000
);


// =========================================================
// CANDLE INTERACTION
// =========================================================

candles.forEach(
    function(candle) {

        candle.addEventListener(
            "click",
            function() {


                // Already blown?

                if (
                    candle.classList.contains(
                        "blown"
                    )
                ) {

                    return;

                }


                // Blow candle

                candle.classList.add(
                    "blown"
                );


                candlesBlown++;


                // Small burst at candle

                createCandleSpark(
                    candle
                );


                // =================================================
                // ALL CANDLES BLOWN
                // =================================================

                if (
                    candlesBlown === totalCandles
                ) {

                    allCandlesBlown();

                }

            }
        );

    }
);


// =========================================================
// ALL CANDLES BLOWN
// =========================================================

function allCandlesBlown() {


    // Change instruction

    candleInstruction.textContent =
        "✦ WISH GRANTED ✦";


    candleInstruction.classList.add(
        "completed"
    );


    // Bigger confetti burst

    createConfetti();


    // Create magical particles

    createCelebrationParticles();


    // Show enter button

    setTimeout(
        function() {

            enterButton.classList.add(
                "visible"
            );

        },
        700
    );
}


// =========================================================
// ENTER BUTTON
// =========================================================

enterButton.addEventListener(
    "click",
    function() {


        // Prevent multiple clicks

        enterButton.disabled = true;


        // =================================================
        // MUSIC
        // =================================================

        if (music) {

            music.volume = 0.75;


            // Start from beginning only once

            if (
                music.paused
            ) {

                music.currentTime = 0;

                music.play()
                    .catch(
                        function(error) {

                            console.log(
                                "Music error:",
                                error
                            );

                        }
                    );

            }

        }


        // =================================================
        // EXTRA CELEBRATION
        // =================================================

        createConfetti();


        createCelebrationParticles();


        // =================================================
        // TRANSITION
        // =================================================

        setTimeout(
            function() {

                celebrationScreen.classList.remove(
                    "active"
                );


                birthdayScreen.classList.add(
                    "active"
                );


                enterButton.disabled = false;

            },
            3500
        );

    }
);


// =========================================================
// CONFETTI
// =========================================================

function createConfetti() {

    if (!confettiContainer) {

        return;

    }


    for (
        let i = 0;
        i < 100;
        i++
    ) {


        const piece =
            document.createElement(
                "div"
            );


        piece.classList.add(
            "confetti"
        );


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDuration =
            2.5 +
            Math.random() * 4 +
            "s";


        piece.style.animationDelay =
            Math.random() * 0.8 +
            "s";


        piece.style.transform =
            `rotate(
                ${Math.random() * 360}deg
            )`;


        // Slightly different sizes

        piece.style.width =
            5 +
            Math.random() * 7 +
            "px";


        piece.style.height =
            8 +
            Math.random() * 10 +
            "px";


        confettiContainer.appendChild(
            piece
        );


        // Remove later

        setTimeout(
            function() {

                piece.remove();

            },
            7000
        );

    }

}


// =========================================================
// CANDLE SPARKS
// =========================================================

function createCandleSpark(
    candle
) {


    const rect =
        candle.getBoundingClientRect();


    for (
        let i = 0;
        i < 8;
        i++
    ) {


        const spark =
            document.createElement(
                "div"
            );


        spark.style.position =
            "fixed";


        spark.style.left =
            rect.left +
            rect.width / 2 +
            "px";


        spark.style.top =
            rect.top +
            "px";


        spark.style.width =
            "4px";


        spark.style.height =
            "4px";


        spark.style.borderRadius =
            "50%";


        spark.style.background =
            "#ffd166";


        spark.style.pointerEvents =
            "none";


        spark.style.zIndex =
            "20000";


        document.body.appendChild(
            spark
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            20 +
            Math.random() * 35;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        spark.animate(
            [
                {
                    transform:
                        "translate(0,0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px,${y}px)`,
                    opacity: 0
                }
            ],
            {
                duration: 700,

                easing:
                    "ease-out"
            }
        );


        setTimeout(
            function() {

                spark.remove();

            },
            700
        );

    }

}


// =========================================================
// CELEBRATION PARTICLES
// =========================================================

function createCelebrationParticles() {


    for (
        let i = 0;
        i < 35;
        i++
    ) {


        const particle =
            document.createElement(
                "div"
            );


        particle.style.position =
            "fixed";


        particle.style.left =
            "50%";


        particle.style.top =
            "50%";


        particle.style.width =
            "4px";


        particle.style.height =
            "4px";


        particle.style.borderRadius =
            "50%";


        particle.style.background =
            "white";


        particle.style.boxShadow =
            "0 0 10px #c9a7ff";


        particle.style.pointerEvents =
            "none";


        particle.style.zIndex =
            "15000";


        document.body.appendChild(
            particle
        );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            100 +
            Math.random() * 300;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%,-50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    1200 +
                    Math.random() * 1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );


        setTimeout(
            function() {

                particle.remove();

            },
            2500
        );

    }

}


// =========================================================
// TYPING ANIMATION
// =========================================================

const typingText =
    "A little something is coming...";


const typingElement =
    document.getElementById(
        "typing-text"
    );


let textIndex = 0;


function typeText() {


    if (
        typingElement &&
        textIndex < typingText.length
    ) {


        typingElement.textContent +=
            typingText.charAt(
                textIndex
            );


        textIndex++;


        setTimeout(
            typeText,
            80
        );

    }

}


typeText();


// =========================================================
// BACKGROUND PARTICLES
// =========================================================

if (particleContainer) {


    for (
        let i = 0;
        i < 40;
        i++
    ) {


        const particle =
            document.createElement(
                "div"
            );


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            Math.random() * 100 +
            "%";


        particle.style.animationDuration =
            5 +
            Math.random() * 10 +
            "s";


        particle.style.animationDelay =
            Math.random() * 10 +
            "s";


        particleContainer.appendChild(
            particle
        );

    }

}


// =========================================================
// SURPRISE BUTTON
// =========================================================

if (
    surpriseButton &&
    surpriseScreen
) {


    surpriseButton.addEventListener(
        "click",
        function() {


            birthdayScreen.classList.remove(
                "active"
            );


            surpriseScreen.classList.add(
                "active"
            );

        }
    );

}


// =========================================================
// CONTINUE BUTTON
// =========================================================

if (
    continueButton &&
    memoriesScreen
) {


    continueButton.addEventListener(
        "click",
        function() {


            surpriseScreen.classList.remove(
                "active"
            );


            memoriesScreen.classList.add(
                "active"
            );

        }
    );

}
