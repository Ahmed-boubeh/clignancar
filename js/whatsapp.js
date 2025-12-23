// Gestion WhatsApp
class WhatsAppManager {
    constructor(config) {
        this.config = config;
        this.whatsappNumber = config.WHATSAPP_NUMBER;
    }

    /**
     * Générer le message de réservation
     */
    generateReservationMessage(formData) {
        const lines = [
            translations[currentLang].whatsappHello,
            '',
            `${translations[currentLang].whatsappName}: ${formData.name}`,
            `${translations[currentLang].whatsappPhone}: ${formData.phone}`,
            `${translations[currentLang].whatsappEmail}: ${formData.email}`,
            `${translations[currentLang].whatsappVehicle}: ${formData.vehicle}`,
            `${translations[currentLang].whatsappDate}: ${formData.date}`,
            `${translations[currentLang].whatsappInfo}: ${formData.message}`
        ];
        
        return lines.join('\n');
    }

    /**
     * Ouvrir WhatsApp avec le message pré-rempli
     */
    openChat(formData) {
        const message = this.generateReservationMessage(formData);
        const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(url, '_blank');
    }

    /**
     * Initialiser le widget flottant
     */
    initFloatingWidget() {
        const widget = document.getElementById('whatsappWidget');
        if (!widget) return;

        widget.innerHTML = `
            <div class="whatsapp-button-container">
                <a href="https://wa.me/${this.whatsappNumber}" target="_blank" class="whatsapp-button" aria-label="WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <div class="whatsapp-tooltip">${translations[currentLang].contact}</div>
            </div>
        `;
    }
}

// Instance globale
const whatsappManager = new WhatsAppManager(CONFIG);