// Initialisation de la carte
let map;
let marker;

function initMap() {
    // Coordonnées de Casablanca, Maroc
    const casablancaCoords = [33.62301351088492, -7.4969011863540524];
    
    // Création de la carte
    map = L.map('map').setView(casablancaCoords, 14);
    
    // Ajout des tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Personnalisation du marqueur
    const goldIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #c9a24d; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;"><i class="fas fa-car" style="color: white; font-size: 14px;"></i></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    // Ajout du marqueur
    marker = L.marker(casablancaCoords, {icon: goldIcon}).addTo(map);
    
    // Contenu du popup
    const popupContent = `
        <div style="text-align: center; padding: 10px;">
            <h4 style="color: #c9a24d; margin-bottom: 8px;">CLIGNANCAR</h4>
            <p style="margin: 5px 0;"><i class="fas fa-map-marker-alt" style="color: #c9a24d;"></i>MIXTE MASKANE AL ALIA ZN INDUS ETAGE MG GH3 IMM 25 MG87</p>
            <p style="margin: 5px 0;">Sidi Bernoussi, Casablanca, Maroc</p>
            <p style="margin: 5px 0;"><i class="fas fa-phone" style="color: #c9a24d;"></i> +212 6 XX XX XX XX</p>
            <a href="https://maps.google.com/?q=33.62301351088492,-7.4969011863540524" target="_blank" style="display: inline-block; background: #c9a24d; color: black; padding: 5px 10px; text-decoration: none; border-radius: 3px; margin-top: 10px; font-size: 12px;">
                <i class="fas fa-directions"></i> Itinéraire
            </a>
        </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // Ajout d'un cercle pour indiquer la zone
    L.circle(casablancaCoords, {
        color: '#c9a24d',
        fillColor: '#c9a24d',
        fillOpacity: 0.1,
        radius: 500
    }).addTo(map);
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    
    // Animation de chargement de la carte
    setTimeout(() => {
        map.invalidateSize();
    }, 300);
});

// Current language
let currentLang = 'fr';

// DOM elements
const langButtons = document.querySelectorAll('.lang-float-btn');
const body = document.body;

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Créer les tooltips pour les boutons de langue
langButtons.forEach(btn => {
    const lang = btn.dataset.lang;
    const tooltip = document.createElement('div');
    tooltip.className = 'lang-float-tooltip';
    tooltip.textContent = languageTooltips[lang];
    btn.appendChild(tooltip);
});

// Language switching function
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update body direction for Arabic
    if (lang === 'ar') {
        body.classList.add('rtl');
        body.classList.remove('ltr');
    } else {
        body.classList.remove('rtl');
        body.classList.add('ltr');
    }
    
    // Update all translatable elements
    Object.keys(translations[lang]).forEach(key => {
        const elements = document.querySelectorAll(`[data-key="${key}"]`);
        elements.forEach(element => {
            element.textContent = translations[lang][key];
        });
        
        // Also update elements with specific IDs
        const elementById = document.getElementById(key);
        if (elementById) {
            if (elementById.tagName === 'INPUT' || elementById.tagName === 'TEXTAREA' || elementById.tagName === 'SELECT') {
                elementById.placeholder = translations[lang][key];
            } else if (elementById.tagName === 'OPTION') {
                elementById.textContent = translations[lang][key];
            } else {
                elementById.innerHTML = translations[lang][key];
            }
        }
    });
    
    // Update WhatsApp link
    const whatsappLink = document.getElementById('whatsappLink');
    whatsappLink.href = `https://wa.me/212637441273?text=${whatsappMessages[lang]}`;
    
    // Update WhatsApp tooltip and bubble
    document.getElementById('whatsappTooltip').textContent = translations[lang].whatsappTooltip;
    document.getElementById('bubbleTitle').textContent = translations[lang].bubbleTitle;
    document.getElementById('bubbleMessage').textContent = translations[lang].bubbleMessage;
    
    // Save language preference
    localStorage.setItem('clignancar_lang', lang);
    
    // Redimensionner la carte après changement de langue
    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }
    }, 300);
    
    // Show language change notification
    showNotification(translations[lang].languageChanged);
}

// Language button click events
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchLanguage(btn.dataset.lang);
    });
});

// Check saved language preference
const savedLang = localStorage.getItem('clignacar_lang') || localStorage.getItem('clignacar_lang');
if (savedLang && (savedLang === 'fr' || savedLang === 'ar' || savedLang === 'en')) {
    switchLanguage(savedLang);
} else {
    // Set default language based on browser
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang === 'ar') {
        switchLanguage('ar');
    } else if (browserLang === 'en') {
        switchLanguage('en');
    }
}

// WhatsApp Bubble Animation
const whatsappBubble = document.getElementById('whatsappBubble');
let bubbleShown = false;

// Afficher la bulle après 3 secondes
setTimeout(() => {
    if (!bubbleShown) {
        whatsappBubble.classList.add('show');
        bubbleShown = true;
        
        // Masquer la bulle après 10 secondes
        setTimeout(() => {
            whatsappBubble.classList.remove('show');
        }, 10000);
    }
}, 3000);

// Réafficher la bulle quand on clique sur le bouton WhatsApp
document.querySelector('.whatsapp-button').addEventListener('mouseenter', () => {
    whatsappBubble.classList.add('show');
});

document.querySelector('.whatsapp-button').addEventListener('mouseleave', () => {
    setTimeout(() => {
        whatsappBubble.classList.remove('show');
    }, 2000);
});

// Réafficher la bulle quand on fait défiler vers le bas
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si on descend et qu'on a défilé plus de 300px
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        whatsappBubble.classList.add('show');
        
        // Masquer après 5 secondes
        setTimeout(() => {
            whatsappBubble.classList.remove('show');
        }, 5000);
    }
    
    lastScrollTop = scrollTop;
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = currentLang === 'ar' ? 'slideOutLeft 0.5s ease' : 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

// Animation du bouton WhatsApp au clic
document.querySelector('.whatsapp-button').addEventListener('click', function(e) {
    // Animation de clic
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = '';
    }, 300);
    
    // Petite notification visuelle
    showNotification(translations[currentLang].notificationSending);
});

// Gestion du formulaire de réservation
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animation de soumission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 
                           currentLang === 'ar' ? 'جاري الإرسال...' : 
                           'Sending...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi
    setTimeout(() => {
        // Notification de succès
        showNotification(translations[currentLang].notificationSuccess);
        
        // Réinitialiser le bouton
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Réinitialiser le formulaire
        this.reset();
    }, 1500);
});

// Add animation styles if not present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    document.head.appendChild(style);
}

// Animation for language buttons on load
document.addEventListener('DOMContentLoaded', () => {
    // Animate language buttons one by one
    const buttons = document.querySelectorAll('.lang-float-btn');
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.transform = 'translateX(0)';
            btn.style.opacity = '1';
        }, index * 100);
    });
});

// CONFIGURATION SEO

// Données des véhicules avec optimisation SEO
const vehicles = [
    {
        id: 1,
        name: "BMW Série 7",
        category: "Luxe",
        price: "450",
        image: "images/bmw-7.jpg",
        imageWebp: "images/bmw-7.webp",
        altText: "BMW Série 7 premium noire - Location voiture de luxe Casablanca",
        description: "Louer une BMW Série 7 à Casablanca. Confort maximal, technologie avancée, service VIP inclus.",
        features: ["Climatisation automatique", "GPS navigation", "Cuir premium nappa", "Toit panoramique", "Sièges chauffants"]
    },
    {
        id: 2,
        name: "Mercedes Classe S",
        category: "Luxe",
        price: "500",
        image: "images/mercedes-s.jpg",
        imageWebp: "images/mercedes-s.webp",
        altText: "Mercedes Classe S argentée - Location Mercedes premium Casablanca",
        description: "Location Mercedes Classe S à Casablanca. Élégance allemande, confort incomparable, livraison aéroport gratuite.",
        features: ["Climatisation tri-zone", "GPS Burmester audio", "Cuir Nappa chauffant", "Toit ouvrant panoramique", "Système AIRMATIC"]
    },
    {
        id: 3,
        name: "Porsche 911",
        category: "Sport",
        price: "600",
        image: "images/porsche-911.jpg",
        imageWebp: "images/porsche-911.webp",
        altText: "Porsche 911 rouge carmin - Location Porsche sport Casablanca",
        description: "Location Porsche 911 à Casablanca. Performance sportive, design emblématique, assurance tous risques incluse.",
        features: ["Moteur Turbo 3.0L", "Boîte PDK 8 vitesses", "Climatisation", "Cuir sportif", "Système Bose premium"]
    },
    {
        id: 4,
        name: "Audi A8",
        category: "Luxe",
        price: "480",
        image: "images/audi-a8.jpg",
        imageWebp: "images/audi-a8.webp",
        altText: "Audi A8 grise métallisée - Location Audi premium Casablanca",
        description: "Location Audi A8 à Casablanca. Technologie Quattro, confort exceptionnel, service premium 24/7.",
        features: ["Transmission Quattro", "Climatisation tri-zone", "Cuir Nappa premium", "Bang & Olufsen audio", "Sièges massants"]
    },
    {
        id: 5,
        name: "Tesla Model S",
        category: "Électrique",
        price: "550",
        image: "images/tesla-model-s.jpg",
        imageWebp: "images/tesla-model-s.webp",
        altText: "Tesla Model S blanche - Location voiture électrique écologique Casablanca",
        description: "Location Tesla Model S à Casablanca. Véhicule électrique écologique, autonomie 600km, technologie Autopilot.",
        features: ["Autonomie 600km", "Supercharger access", "Autopilot avancé", "Écran 17 pouces", "Climatisation auto"]
    },
    {
        id: 6,
        name: "Lamborghini Huracán",
        category: "Sport",
        price: "750",
        image: "images/lamborghini-huracan.jpg",
        imageWebp: "images/lamborghini-huracan.webp",
        altText: "Lamborghini Huracán jaune fluo - Location Lamborghini sport Casablanca",
        description: "Location Lamborghini Huracán à Casablanca. Supercars italiennes, performance extrême, expérience inoubliable.",
        features: ["Moteur V10 5.2L", "Accélération 0-100: 2.5s", "Vitesse max: 325 km/h", "Cuir Alcantara sportif", "GPS premium"]
    }
];

// Tracker les événements SEO
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Tracker réservation
function trackReservation(vehicleName) {
    trackEvent('Engagement', 'begin_checkout', vehicleName);
    gtag('event', 'view_item', {
        items: [{
            item_id: vehicleName.toLowerCase().replace(/\s/g, '-'),
            item_name: vehicleName,
            item_category: 'Voiture Premium',
            price: '450',
            currency: 'EUR'
        }]
    });
}

// Tracker clics sur les véhicules
function trackVehicleClick(vehicleName) {
    trackEvent('Vehicle', 'view_details', vehicleName);
}

// Gérer les images manquantes
function handleMissingImages() {
    document.querySelectorAll('.car-img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            this.parentElement.style.backgroundColor = '#e0e0e0';
            
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `<i class="fas fa-car"></i><p>${this.getAttribute('data-vehicle-name')}</p>`;
            this.parentElement.appendChild(fallback);
            
            this.removeEventListener('error', arguments.callee);
        }, { once: true });
    });
}

// Générer les cartes véhicules avec SEO
function renderVehicles() {
    const carsList = document.getElementById('carsList');
    
    if (!carsList) return;
    
    carsList.innerHTML = vehicles.map(vehicle => `
        <div class="car-card" itemscope itemtype="https://schema.org/Product">
            <meta itemprop="name" content="${vehicle.name}">
            <meta itemprop="description" content="${vehicle.description}">
            <meta itemprop="price" content="${vehicle.price}">
            <meta itemprop="priceCurrency" content="EUR">
            
            <div class="car-image">
                <img src="${vehicle.image}" 
                     srcset="${vehicle.imageWebp} 1x, ${vehicle.image} 2x"
                     alt="${vehicle.altText}"
                     loading="lazy"
                     class="car-img"
                     data-vehicle-name="${vehicle.name}"
                     itemprop="image">
                <span class="car-category">${vehicle.category}</span>
            </div>
            <div class="car-content">
                <h3 itemprop="name">${vehicle.name}</h3>
                <p itemprop="description" style="display:none;">${vehicle.description}</p>
                <div class="car-features">
                    ${vehicle.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="car-footer">
                    <div class="car-price">
                        <span class="price-label">À partir de</span>
                        <span class="price-value" itemprop="price">${vehicle.price}€</span>
                        <span itemprop="priceCurrency" content="EUR" style="display:none;"></span>/jour
                    </div>
                    <button class="btn btn-small" 
                            data-vehicle="${vehicle.name}"
                            onclick="trackReservation('${vehicle.name}')">Réserver</button>
                </div>
            </div>
        </div>
    `).join('');
    
    handleMissingImages();
    attachReservationButtons();
}

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
    renderVehicles();
    
    // Tracker page view
    trackEvent('Page', 'view', 'Home');
});

// Attacher les événements réservation
function attachReservationButtons() {
    document.querySelectorAll('.car-card .btn-small').forEach(button => {
        button.addEventListener('click', function() {
            const vehicleName = this.getAttribute('data-vehicle');
            const carSelect = document.getElementById('carSelect');
            const contactSection = document.getElementById('contact');
            
            if (carSelect) {
                carSelect.value = vehicleName;
            }
            
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            trackReservation(vehicleName);
        });
    });
}