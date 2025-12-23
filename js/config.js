// Configuration globale de l'application
const CONFIG = {
    WHATSAPP_NUMBER: '33612345678', // Remplacer par votre numéro
    LANGUAGE_KEY: 'clignancar_lang',
    DEFAULT_LANGUAGE: 'fr',
    SUPPORTED_LANGUAGES: ['fr', 'ar', 'en'],
    BUBBLE_DELAY: 3000, // en millisecondes
    NOTIFICATION_TIMEOUT: 5000
};// Traductions multilingues
const translations = {
    fr: {
        // Header
        services: 'Services',
        vehicles: 'Véhicules',
        contact: 'Contact',
        
        // Form
        fullName: 'Nom complet',
        phone: 'Téléphone',
        email: 'Email',
        vehicle: 'Véhicule',
        desiredDate: 'Date souhaitée',
        message: 'Message / détails',
        sendViaWhatsapp: 'Envoyer via WhatsApp',
        
        // Notifications
        notificationSending: 'Envoi de votre demande...',
        notificationSuccess: 'Demande envoyée avec succès !',
        
        // WhatsApp
        whatsappHello: 'Bonjour,\n\nJe souhaite réserver un véhicule chez ClignanCar.',
        whatsappName: 'Nom',
        whatsappPhone: 'Téléphone',
        whatsappEmail: 'Email',
        whatsappVehicle: 'Véhicule',
        whatsappDate: 'Date souhaitée',
        whatsappInfo: 'Informations supplémentaires'
    },
    ar: {
        // Header
        services: 'الخدمات',
        vehicles: 'المركبات',
        contact: 'اتصل بنا',
        
        // Form
        fullName: 'الاسم الكامل',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        vehicle: 'المركبة',
        desiredDate: 'التاريخ المطلوب',
        message: 'الرسالة / التفاصيل',
        sendViaWhatsapp: 'إرسال عبر WhatsApp',
        
        // Notifications
        notificationSending: 'جاري إرسال طلبك...',
        notificationSuccess: 'تم إرسال الطلب بنجاح!',
        
        // WhatsApp
        whatsappHello: 'مرحبا،\n\nأرغب في حجز مركبة من ClignanCar.',
        whatsappName: 'الاسم',
        whatsappPhone: 'الهاتف',
        whatsappEmail: 'البريد الإلكتروني',
        whatsappVehicle: 'المركبة',
        whatsappDate: 'التاريخ المطلوب',
        whatsappInfo: 'معلومات إضافية'
    },
    en: {
        // Header
        services: 'Services',
        vehicles: 'Vehicles',
        contact: 'Contact',
        
        // Form
        fullName: 'Full Name',
        phone: 'Phone',
        email: 'Email',
        vehicle: 'Vehicle',
        desiredDate: 'Desired Date',
        message: 'Message / Details',
        sendViaWhatsapp: 'Send via WhatsApp',
        
        // Notifications
        notificationSending: 'Sending your request...',
        notificationSuccess: 'Request sent successfully!',
        
        // WhatsApp
        whatsappHello: 'Hello,\n\nI would like to book a vehicle from ClignanCar.',
        whatsappName: 'Name',
        whatsappPhone: 'Phone',
        whatsappEmail: 'Email',
        whatsappVehicle: 'Vehicle',
        whatsappDate: 'Desired Date',
        whatsappInfo: 'Additional Information'
    }
};

let currentLang = CONFIG.DEFAULT_LANGUAGE;