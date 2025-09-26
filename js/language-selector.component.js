class LanguageSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Get current page path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // Extract base filename and current language
    let baseName, currentLanguage;
    
    if (currentPage.includes('.de.html')) {
      baseName = currentPage.replace('.de.html', '');
      currentLanguage = 'de';
    } else if (currentPage.includes('.es.html')) {
      baseName = currentPage.replace('.es.html', '');
      currentLanguage = 'es';
    } else {
      // Default to English
      baseName = currentPage.replace('.html', '');
      currentLanguage = 'en';
    }
    
    // For root pages, handle special case
    if (currentPage === '' || currentPage === 'index.html' || currentPage === 'index.de.html' || currentPage === 'index.es.html') {
      baseName = 'index';
    }
    
    // Create links based on detected info
    const enLink = `${baseName}.html`;
    const esLink = `${baseName}.es.html`;
    const deLink = `${baseName}.de.html`;
    
    this.render(enLink, esLink, deLink, currentLanguage);
  }
  
  render(enLink, esLink, deLink, currentLanguage) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: inherit;
        }
        .language-selector {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
          background-color: rgba(255, 255, 255, 0.7);
          padding: 5px 10px;
          border-radius: 4px;
        }
        a {
          color: inherit;
          text-decoration: none;
          margin: 0 3px;
        }
        .active {
          font-weight: bold;
        }
      </style>
      
      <div class="language-selector">
        <a href="${enLink}" hreflang="en" class="${currentLanguage === 'en' ? 'active' : ''}">EN</a> |
        <a href="${esLink}" hreflang="es" class="${currentLanguage === 'es' ? 'active' : ''}">ES</a> |
        <a href="${deLink}" hreflang="de" class="${currentLanguage === 'de' ? 'active' : ''}">DE</a>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('language-selector', LanguageSelector);