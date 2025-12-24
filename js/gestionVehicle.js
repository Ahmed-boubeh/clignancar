// Configuration des véhicules
const vehicles = [
    {
        id: 1,
        name: "BMW Série 7",
        category: "Luxe",
        price: "450",
        image: "images/cupra_leon.png",
        features: ["Climatisation", "GPS", "Cuir premium", "Toit panoramique"]
    },
    {
        id: 2,
        name: "Mercedes Classe S",
        category: "Luxe",
        price: "500",
        image: "images/cupra_leon.png",
        features: ["Climatisation", "GPS", "Cuir nappa", "Toit ouvrant"]
    },
    {
        id: 3,
        name: "Porsche 911",
        category: "Sport",
        price: "600",
        image: "images/cupra_leon.png",
        features: ["Climatisation", "GPS", "Cuir sportif", "Toit ouvrant"]
    },
    {
        id: 4,
        name: "Audi A8",
        category: "Luxe",
        price: "480",
        image: "images/cupra_leon.png",
        features: ["Climatisation", "GPS", "Cuir premium", "Quattro"]
    },
    {
        id: 5,
        name: "Tesla Model S",
        category: "Électrique",
        price: "550",
        image: "images/208.png",
        features: ["Autonomie 600km", "Supercharger", "Pilotage automatique", "Écologique"]
    },
    {
        id: 6,
        name: "Lamborghini Huracán",
        category: "Sport",
        price: "750",
        image: "images/cupra_leon.png",
        features: ["Climatisation", "GPS", "Cuir sportif", "V10"]
    }
];

// Générer les cartes véhicules
function renderVehicles() {
    const carsList = document.getElementById('carsList');
    
    if (!carsList) return;
    
    carsList.innerHTML = vehicles.map(vehicle => `
        <div class="car-card">
            <div class="car-image">
                <img src="${vehicle.image}" 
                     alt="${vehicle.name}" 
                     class="car-img"
                     data-vehicle-name="${vehicle.name}">
                <span class="car-category">${vehicle.category}</span>
            </div>
            <div class="car-content">
                <h3>${vehicle.name}</h3>
                <div class="car-features">
                    ${vehicle.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="car-footer">
                    <div class="car-price">
                        <span class="price-label">À partir de</span>
                        <span class="price-value">${vehicle.price}€/jour</span>
                    </div>
                    <button class="btn btn-small" data-vehicle="${vehicle.name}">Réserver</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Gérer les images manquantes
    handleMissingImages();
    
    // Ajouter les événements aux boutons de réservation
    attachReservationButtons();
}

// Gérer les images manquantes sans boucle
function handleMissingImages() {
    document.querySelectorAll('.car-img').forEach(img => {
        img.addEventListener('error', function() {
            // Utiliser une couleur de fond au lieu d'une image
            this.style.display = 'none';
            this.parentElement.style.backgroundColor = '#e0e0e0';
            
            // Ajouter un texte de secours
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `<i class="fas fa-car"></i><p>${this.getAttribute('data-vehicle-name')}</p>`;
            this.parentElement.appendChild(fallback);
            
            // Important : remove l'écouteur pour éviter la boucle
            this.removeEventListener('error', arguments.callee);
        }, { once: true });
    });
}

// Gérer les clics sur les boutons de réservation
function attachReservationButtons() {
    document.querySelectorAll('.car-card .btn-small').forEach(button => {
        button.addEventListener('click', function() {
            const vehicleName = this.getAttribute('data-vehicle');
            const carSelect = document.getElementById('carSelect');
            const contactSection = document.getElementById('contact');
            
            if (carSelect) {
                carSelect.value = vehicleName;
            }
            
            // Scroll vers la section contact
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialiser au chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    renderVehicles();
});