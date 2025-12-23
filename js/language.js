// Gestion des langues
class LanguageManager {
    constructor(config) {
        this.config = config;
        this.currentLang = this.loadLanguage();
    }

    /**
     * Charger la langue sauvegardée
     */
    loadLanguage() {
        const saved = localStorage.getItem(this.config.LANGUAGE_KEY);
        if (saved && this.config.SUPPORTED_LANGUAGES.includes(saved)) {
            return saved;
        }
        return this.config.DEFAULT_LANGUAGE;
    }

    /**
     * Changer de langue
     */
    switchLanguage(lang) {
        if (!this.config.SUPPORTED_LANGUAGES.includes(lang)) return;

        currentLang = lang;
        this.currentLang = lang;
        localStorage.setItem(this.config.LANGUAGE_KEY, lang);

        // Mettre à jour le corps du document
        document.body.classList.toggle('rtl', lang === 'ar');
        document.documentElement.lang = lang;

        // Réinitialiser les éléments
        this.updateUI();
    }

    /**
     * Mettre à jour l'interface
     */
    updateUI() {
        whatsappManager.initFloatingWidget();
        reservationForm.init();
    }

    /**
     * Initialiser les boutons de langue
     */
    initLanguageButtons() {
        const langContainer = document.getElementById('langFloating');
        if (!langContainer) return;

        let buttonsHTML = '';
        this.config.SUPPORTED_LANGUAGES.forEach(lang => {
            const isActive = lang === this.currentLang ? 'active' : '';
            buttonsHTML += `
                <button class="lang-float-btn ${isActive}" data-lang="${lang}">
                    ${lang.toUpperCase()}
                </button>
            `;
        });

        langContainer.innerHTML = buttonsHTML;

        // Attacher les événements
        document.querySelectorAll('.lang-float-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
                this.updateLanguageButtons();
            });
        });
    }

    /**
     * Mettre à jour l'état des boutons
     */
    updateLanguageButtons() {
        document.querySelectorAll('.lang-float-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }
}

// Instance globale
const languageManager = new LanguageManager(CONFIG);