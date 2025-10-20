// Language toggle functionality
let isEnglish = true;

const translations = {
    en: {
        navTitle: "Chennai WaterLogging Platform",
        langToggle: "தமிழ்",
        modalTitle: "Chennai WaterLogging Platform",
        modalBody: "This website allows users to submit the water logging level in their area. The entered water level is updated on the map with the image that the user uploads as a reference. Users will also be able to have knowledge about the water logging level of Chennai city on the map.",
        footerQuote: "You must be the change you wish to see in the world",
        footerCopyright: "CFI 2022 © All Rights Reserved",
        footerCredit: "WebOps and Blockchain Club, CFI, IIT Madras"
    },
    ta: {
        navTitle: "சென்னை மழைநீர் தேக்கப் பதிவுத் தளம்",
        langToggle: "English",
        modalTitle: "சென்னை மழைநீர் தேக்கப் பதிவுத் தளம்",
        modalBody: "இந்தத் தளம், உங்கள் பகுதியில் மழைநீர் தேக்க நிலையைச் சமர்ப்பிக்க பயனரை அனுமதிக்கிறது. உள்ளிடப்பட்ட மழைநீர் நிலை வரைபடத்தில் பயனர் பதிவேற்றும் புகைப்படத்துடன் புதுப்பிக்கப்படுகிறது. சென்னை மாநகரின் மழைநீர் தேக்க நிலை குறித்த விவரங்களையும் பயனர்கள் வரைபடத்தில் அறிந்து கொள்ளலாம்.",
        footerQuote: "உலகில் நீங்கள் காண விரும்பும் மாற்றமாக நீங்கள் இருக்க வேண்டும்",
        footerCopyright: "CFI 2022 © அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை",
        footerCredit: "வெப் ஆபரேஷன்ஸ் & பிளாக்செயின் கிளப் மூலம் வடிவமைக்கப்பட்டது | புதுமைக்கான மையம்"
    }
};

function toggleLanguage() {
    isEnglish = !isEnglish;
    const lang = isEnglish ? 'en' : 'ta';
    
    // Update navigation
    const navTitle = document.getElementById('nav-title');
    const langToggle = document.getElementById('lang-toggle');
    
    if (navTitle) navTitle.textContent = translations[lang].navTitle;
    if (langToggle) langToggle.textContent = translations[lang].langToggle;
    
    // Update modal
    const modalTitle = document.getElementById('whatsapp-modal-title');
    const modalBody = document.getElementById('whatsapp-modal-body');
    
    if (modalTitle) modalTitle.textContent = translations[lang].modalTitle;
    if (modalBody) modalBody.textContent = translations[lang].modalBody;
    
    // Update footer elements
    const footerQuote = document.getElementById('footer-quote');
    const footerCopyright = document.getElementById('footer-copyright');
    const footerCredit = document.getElementById('footer-credit');
    
    if (footerQuote) footerQuote.textContent = translations[lang].footerQuote;
    if (footerCopyright) footerCopyright.textContent = translations[lang].footerCopyright;
    if (footerCredit) footerCredit.textContent = translations[lang].footerCredit;
}

function showWhatsAppModal() {
    const modal = new bootstrap.Modal(document.getElementById('whatsappModal'));
    modal.show();
}

// Mapbox functionality
let map;
let currentCoords = { lat: 13.0827, lng: 80.2707 }; // Chennai coordinates

function initializeMap(containerId = 'map') {
    if (typeof mapboxgl !== 'undefined') {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdHlhcmFqMjAwMiIsImEiOiJja3p6dGNxZGcwMGNzMm9xbzVqZGNqZGNsIn0.VrKGhzXWNOqrCKnqNhKGhQ';
        
        map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [currentCoords.lng, currentCoords.lat],
            zoom: 10
        });

        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());

        // Add click handler for map
        map.on('click', function(e) {
            currentCoords = {
                lat: e.lngLat.lat,
                lng: e.lngLat.lng
            };
            
            // Update coordinate display if exists
            const coordDisplay = document.getElementById('coord-display');
            if (coordDisplay) {
                coordDisplay.textContent = `Lat: ${currentCoords.lat.toFixed(6)}, Lng: ${currentCoords.lng.toFixed(6)}`;
            }
            
            // Add marker
            new mapboxgl.Marker()
                .setLngLat([currentCoords.lng, currentCoords.lat])
                .addTo(map);
        });
    }
}

// Form submission helpers
function submitComplaint(formData) {
    fetch('/Home/SubmitComplaint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Complaint submitted successfully!');
            // Reset form or redirect
        } else {
            alert('Failed to submit complaint: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the complaint.');
    });
}

function submitVolunteerRegistration(formData) {
    fetch('/Volunteer/Register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Volunteer registration successful!');
            // Reset form or redirect
        } else {
            alert('Failed to register: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if container exists
    if (document.getElementById('map')) {
        initializeMap();
    }
});