class CookieBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cookieConsent = localStorage.getItem('cookie_consent');
  }

  connectedCallback() {
    // If user already made a selection, don't show the banner
    if (this.cookieConsent) {
      return;
    }

    this.render();
    this.setupEventListeners();
  }

  getLanguage() {
    // First check if there's a language preference in localStorage
    const storedLanguage = localStorage.getItem('language_preference');
    if (storedLanguage && ['en', 'es', 'de'].includes(storedLanguage)) {
      return storedLanguage;
    }

    // Check the current URL for language indicators
    const path = window.location.pathname;
    if (path.includes('.es.html')) {
      return 'es';
    } else if (path.includes('.de.html')) {
      return 'de';
    }

    // Default to browser language or English
    const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    return ['es', 'de'].includes(browserLang) ? browserLang : 'en';
  }

  getTranslations() {
    const translations = {
      en: {
        message: 'This website uses cookies to enhance the user experience.',
        accept: 'Accept',
        reject: 'Reject'
      },
      es: {
        message: 'Este sitio web utiliza cookies para mejorar la experiencia del usuario.',
        accept: 'Aceptar',
        reject: 'Rechazar'
      },
      de: {
        message: 'Diese Website verwendet Cookies, um das Benutzererlebnis zu verbessern.',
        accept: 'Akzeptieren',
        reject: 'Ablehnen'
      }
    };

    const language = this.getLanguage();
    return translations[language] || translations.en;
  }

  render() {
    const texts = this.getTranslations();
    
    this.shadowRoot.innerHTML = `
 <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css" />
  <link rel="stylesheet" href="./style.css">
  <style>
    .cookie-banner {
      font-family: Arial, sans-serif;
      max-width: 1300px;
    }
      </style>
      <div class="cookie-banner w3-content w3-deep-purple w3-text-white w3-padding w3-center w3-fixed w3-bottom">
        <p>${texts.message}</p>
        <button id="accept-cookies" class="w3-button w3-green w3-margin-right">${texts.accept}</button>
        <button id="reject-cookies" class="w3-button w3-light-grey">${texts.reject}</button>
      </div>
    `;
  }

  setupEventListeners() {
    const acceptButton = this.shadowRoot.getElementById('accept-cookies');
    const rejectButton = this.shadowRoot.getElementById('reject-cookies');

    acceptButton.addEventListener('click', () => {
      this.saveConsent('accepted');
      this.remove();
    });

    rejectButton.addEventListener('click', () => {
      this.saveConsent('rejected');
      this.remove();
    });
  }

  saveConsent(consent) {
    localStorage.setItem('cookie_consent', consent);
    
    // Custom event to notify the application about the cookie consent change
    const event = new CustomEvent('cookie-consent-changed', {
      detail: { consent }
    });
    document.dispatchEvent(event);
  }
}

// Define the custom element
customElements.define('cookie-banner', CookieBanner);
window.onload = () => {
  if (!document.querySelector('cookie-banner')) {
    const banner = document.createElement('cookie-banner');
    document.body.appendChild(banner);
  }
};