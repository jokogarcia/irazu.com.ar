class LanguageSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Get flag emoji for a language
  getFlagEmoji(language) {
    const flags = {
      'en': '🇬🇧',
      'es': '🇪🇸',
      'de': '🇩🇪'
    };
    return flags[language] || '🌐';
  }
  
  // Get language name
  getLanguageName(language) {
    const names = {
      'en': 'English',
      'es': 'Español',
      'de': 'Deutsch'
    };
    return names[language] || 'Unknown';
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
    
    // Set up dropdown toggle after rendering
    setTimeout(() => {
      this.setupDropdownToggle();
    }, 0);
  }
  
  setupDropdownToggle() {
    const button = this.shadowRoot.getElementById('dropdown-btn');
    const dropdown = this.shadowRoot.getElementById('dropdown-content');
    
    if (button && dropdown) {
      // Toggle dropdown on button click
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.classList.remove('show');
      });
      
      // Prevent closing when clicking inside dropdown
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }
  
  render(enLink, esLink, deLink, currentLanguage) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: inherit;
        }
        .language-dropdown {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
        }
        .dropdown-button {
          display: flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.8);
          border: none;
          border-radius: 4px;
          padding: 6px 12px;
          cursor: pointer;
          font-size: 14px;
        }
        .dropdown-button:hover {
          background-color: rgba(255, 255, 255, 0.9);
        }
        .dropdown-content {
          display: none;
          position: absolute;
          right: 0;
          background-color: rgba(255, 255, 255, 0.9);
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
          border-radius: 4px;
          overflow: hidden;
        }
        .dropdown-content.show {
          display: block;
        }
        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .dropdown-content a:hover {
          background-color: #ddd;
        }
        .flag {
          width: 20px;
          height: 15px;
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
          object-fit: contain;
        }
        .current-flag {
          margin-right: 8px;
        }
        .language-name {
          margin-left: 5px;
          font-weight: normal;
        }
        .current-language {
          font-weight: bold;
        }
      </style>
      
      <div class="language-dropdown">
        <button class="dropdown-button" id="dropdown-btn">
          <span class="flag current-flag">
            ${this.getFlagEmoji(currentLanguage)}
          </span>
          <span class="current-language">${this.getLanguageName(currentLanguage)}</span>
          <span style="margin-left: 8px;">▼</span>
        </button>
        <div class="dropdown-content" id="dropdown-content">
          <a href="${enLink}" hreflang="en">
            <span class="flag">${this.getFlagEmoji('en')}</span>
            <span class="language-name">English</span>
          </a>
          <a href="${esLink}" hreflang="es">
            <span class="flag">${this.getFlagEmoji('es')}</span>
            <span class="language-name">Español</span>
          </a>
          <a href="${deLink}" hreflang="de">
            <span class="flag">${this.getFlagEmoji('de')}</span>
            <span class="language-name">Deutsch</span>
          </a>
        </div>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('language-selector', LanguageSelector);