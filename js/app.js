document.addEventListener('DOMContentLoaded', () => {

    // State
    let currentExhibit = exhibits['default'];
    let infoIndex = 0;
    let isMarkerVisible = false;

    // DOM Elements
    const scanPrompt = document.getElementById('scan-prompt');
    const guideCard = document.getElementById('guide-card');
    const exhibitTitle = document.getElementById('exhibit-title');
    const exhibitText = document.getElementById('exhibit-text');
    const nextBtn = document.getElementById('next-btn');
    const marker = document.getElementById('exhibit-marker');
    const guideContainer = document.getElementById('guide-container');
    const speechBubble3D = document.getElementById('speech-bubble-3d');

    // AR Marker Events
    marker.addEventListener('markerFound', () => {
        isMarkerVisible = true;
        scanPrompt.classList.add('hidden');
        guideCard.classList.remove('hidden');
        showWelcome();
        // Animate Shiba "Appearance"
        guideContainer.setAttribute('animation', 'property: scale; from: 0 0 0; to: 1 1 1; dur: 1000; easing: easeOutElastic');
    });

    marker.addEventListener('markerLost', () => {
        isMarkerVisible = false;
        scanPrompt.classList.remove('hidden');
        guideCard.classList.add('hidden');
    });

    // UI Interaction
    nextBtn.addEventListener('click', () => {
        advanceInfo();
    });

    // Logic
    function showWelcome() {
        exhibitTitle.textContent = currentExhibit.title;
        exhibitText.textContent = currentExhibit.intro;
        infoIndex = -1; // -1 indicates intro state
        nextBtn.textContent = "Tell me more!";

        // Update 3D Speech Bubble
        update3DBubble(currentExhibit.intro);
    }

    function advanceInfo() {
        infoIndex++;
        if (infoIndex >= currentExhibit.details.length) {
            infoIndex = 0; // Loop back
        }

        const text = currentExhibit.details[infoIndex];
        exhibitText.textContent = text;
        nextBtn.textContent = "Next Fact >";

        // Animation logic removed

        update3DBubble(text);
    }
}


    function update3DBubble(text) {
        // Simple scale pop-in
        speechBubble3D.setAttribute('scale', '0 0 0');
        setTimeout(() => {
            speechBubble3D.querySelector('a-text').setAttribute('value', text);
            speechBubble3D.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 500; easing: easeOutBack');
        }, 100);
    }

    // Init check for URL params to switch exhibits (Simulating NFC tag diffs)
    const urlParams = new URLSearchParams(window.location.search);
const exhibitId = urlParams.get('id');
if (exhibitId && exhibits[exhibitId]) {
    currentExhibit = exhibits[exhibitId];
}

});
