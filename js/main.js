// Point d'entrée principal
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser la langue
    currentLang = languageManager.currentLang;
    document.body.classList.toggle('rtl', currentLang === 'ar');
    
    // Initialiser les composants
    languageManager.initLanguageButtons();
    whatsappManager.initFloatingWidget();
    reservationForm.init();
    
    console.log('✓ Application initialisée');
});

/**
 * Afficher une notification
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, CONFIG.NOTIFICATION_TIMEOUT);
}