const ASCII_OF_A = "A".charCodeAt();        //return ascii code of A 65
const NO_OF_ALPHABETS = 26;

function initFullpage(){
    animateElements();      //function init (second slide only)
    new fullpage('#fullpage', {
        autoScrolling:true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        credits: { enabled: false, label: 'Made with fullPage.js', position: 'right'},
    });
}

function animateElement(element, originalText, options) {
    let iteration = 0;
    if (options.interval) return;
    options.interval = setInterval(() => {
        const newWord = originalText
            .split("")
            .map((_, idx) => {
                if (idx < iteration) {
                    return originalText[idx];
                }
                return String.fromCharCode(
                    Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A
                );
            })
            .join("");
        element.innerText = newWord;
        iteration++;
        if (iteration > originalText.length) {
            clearInterval(options.interval);
            options.interval = null;
        }
    }, 30);
    setTimeout(function(){
        animateElement(element, originalText, options)
    }, 4800);
}

function animateElements() {
    const elements = document.getElementsByClassName("animate");
    for (const element of elements) {
        const originalText = element.innerText;
        const options = {
            interval: null
        };
        animateElement(element, originalText, options);
        element.addEventListener("mouseover", (event) => {
            animateElement(event.target, originalText, options);
        });
    }
}
