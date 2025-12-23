// Gestion du formulaire de réservation
class ReservationForm {
    constructor() {
        this.form = null;
    }

    /**
     * Initialiser le formulaire
     */
    init() {
        const contactSection = document.getElementById('contact');
        if (!contactSection) return;

        // Créer le formulaire
        const formHTML = `
            <div class="container">
                <div class="section-title">
                    <h2>Réservez votre véhicule</h2>
                    <span>Contactez-nous dès maintenant</span>
                </div>
                <div class="contact-form">
                    <form id="reservationForm">
                        <div class="form-group">
                            <label for="name">Nom complet</label>
                            <input class="form-control" type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input class="form-control" type="tel" id="phone" name="phone" placeholder="06XXXXXXXX" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input class="form-control" type="email" id="email" name="email">
                        </div>
                        <div class="form-group">
                            <label for="vehicle">Véhicule</label>
                            <select class="form-control" id="vehicle" name="vehicle" required>
                                <option value="">Sélectionner un véhicule</option>
                                <option value="mercedes">Mercedes Classe S</option>
                                <option value="bmw">BMW Série 7</option>
                                <option value="audi">Audi A8</option>
                                <option value="porsche">Porsche 911</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="date">Date souhaitée</label>
                            <input class="form-control" type="date" id="date" name="date">
                        </div>
                        <div class="form-group">
                            <label for="message">Message / détails</label>
                            <textarea class="form-control" id="message" name="message" rows="3" placeholder="Détails supplémentaires..."></textarea>
                        </div>
                        <button type="submit" class="btn" style="width:100%;">Envoyer via WhatsApp</button>
                    </form>
                </div>
            </div>
        `;

        contactSection.innerHTML = formHTML;

        // Attacher les événements
        this.form = document.getElementById('reservationForm');
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    /**
     * Gérer la soumission du formulaire
     */
    handleSubmit(e) {
        e.preventDefault();

        // Récupérer les données
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            vehicle: document.getElementById('vehicle').options[document.getElementById('vehicle').selectedIndex].text,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value.trim()
        };

        // Valider les données
        if (!this.validateForm(formData)) return;

        // Afficher notification
        showNotification(translations[currentLang].notificationSending);

        // Ouvrir WhatsApp après une courte attente
        setTimeout(() => {
            whatsappManager.openChat(formData);
            this.form.reset();
        }, 500);
    }

    /**
     * Valider le formulaire
     */
    validateForm(data) {
        if (!data.name || data.name.length < 3) {
            showNotification('Veuillez entrer un nom valide', 'error');
            return false;
        }
        if (!data.phone || data.phone.length < 8) {
            showNotification('Veuillez entrer un numéro valide', 'error');
            return false;
        }
        if (!data.vehicle) {
            showNotification('Veuillez sélectionner un véhicule', 'error');
            return false;
        }
        return true;
    }
}

// Instance globale
const reservationForm = new ReservationForm();