/* ============================================
   MOREWLESS CONFIGURATEUR — CUSTOM ELEMENT
   Compatible Wix Studio (sans iframe interne)
   ============================================ */

class MorewlessConfigurator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {
      currentStep: 0,
      totalSteps: 6,
      projectDescription: '',
      answers: [],
      selectedServices: [],
      currentQuestionIndex: 0
    };
    this.N8N_WEBHOOK_URL = 'https://votre-webhook-n8n.ici';
  }

  connectedCallback() {
    this.render();
    this.initLogic();
  }

  // ============================================
  // STYLES (identiques au design original)
  // ============================================
  getStyles() {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      --color-bg: #ffffff;
      --color-text: #1a1a2e;
      --color-text-muted: #6b7280;
      --color-text-light: #9ca3af;
      --color-border: #e2e4e9;
      --color-card-bg: #ffffff;
      --color-btn-primary: #1e3a8a;
      --color-btn-primary-hover: #c41e5c;
      --color-btn-secondary: #f3f4f6;
      --color-progress-track: #e2e4e9;
      --color-progress-start: #c41e5c;
      --color-progress-end: #1e3a8a;
      --color-badge: #7c2d6e;
      --color-priority-high: #1e3a8a;
      --color-priority-medium: #7c2d6e;
      --color-priority-low: #6b7280;
      --color-price-bg: #f0f4ff;
      --radius-sm: 10px;
      --radius-md: 16px;
      --radius-lg: 18px;
      --radius-xl: 22px;
      --shadow-sm: 0 1px 4px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
      --transition-fast: 0.2s ease;
      --transition-medium: 0.3s ease;

      display: block;
      width: 100%;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--color-bg);
      color: var(--color-text);
      line-height: 1.5;
      padding: 24px 32px;
    }

    .mwl-container {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }

    /* BARRE DE PROGRESSION */
    .mwl-progress-container {
      display: flex;
      justify-content: center;
      margin-bottom: 28px;
    }
    .mwl-progress-bar {
      width: 100%;
      max-width: 600px;
      height: 8px;
      background: var(--color-progress-track);
      border-radius: 4px;
      overflow: hidden;
    }
    .mwl-progress-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--color-progress-start), var(--color-progress-end));
      transition: width var(--transition-medium);
    }

    /* ECRANS */
    .mwl-screen {
      display: none;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .mwl-screen.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    /* ECRAN 1 — INTRODUCTION */
    .mwl-intro-grid {
      display: flex;
      gap: 48px;
      align-items: flex-start;
      max-width: 1100px;
      margin: 0 auto;
    }
    .mwl-intro-left {
      flex: 0 0 40%;
      max-width: 420px;
    }
    .mwl-intro-left h2 {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 42px;
      font-weight: 700;
      line-height: 0.95em;
      color: var(--color-text);
      margin-bottom: 16px;
    }
    .mwl-intro-left p {
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: var(--color-text-muted);
      line-height: 1.4em;
    }
    .mwl-intro-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .mwl-textarea-wrapper {
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 20px;
      background: var(--color-card-bg);
      transition: border-color var(--transition-fast);
    }
    .mwl-textarea-wrapper:focus-within {
      border-color: var(--color-btn-primary);
    }
    .mwl-textarea {
      width: 100%;
      min-height: 120px;
      border: none;
      outline: none;
      font-family: 'Poppins', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.6;
      color: var(--color-text);
      resize: vertical;
      background: transparent;
    }
    .mwl-textarea::placeholder {
      color: var(--color-text-light);
    }
    .mwl-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 28px;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
      text-decoration: none;
    }
    .mwl-btn-primary {
      background: var(--color-btn-primary);
      color: #ffffff;
      align-self: flex-end;
    }
    .mwl-btn-primary:hover {
      background: var(--color-btn-primary-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    .mwl-btn-outline {
      background: transparent;
      color: var(--color-btn-primary);
      border: 1.5px solid var(--color-btn-primary);
    }
    .mwl-btn-outline:hover {
      background: var(--color-btn-primary);
      color: #ffffff;
    }

    /* ECRAN 2 — LOADING */
    .mwl-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      gap: 16px;
    }
    .mwl-spinner {
      width: 36px;
      height: 36px;
      border: 3px solid var(--color-border);
      border-top-color: var(--color-btn-primary);
      border-radius: 50%;
      animation: spin 0.9s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .mwl-loading p {
      font-family: 'Poppins', sans-serif;
      font-size: 15px;
      color: var(--color-text-muted);
      font-weight: 500;
    }

    /* ECRAN 3 — QUESTIONS */
    .mwl-question-card {
      max-width: 900px;
      margin: 0 auto;
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 28px;
      box-shadow: var(--shadow-sm);
    }
    .mwl-question-number {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #A9A9A9;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .mwl-question-text {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 32px;
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 20px;
      line-height: 1.1em;
    }
    .mwl-answers-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }
    .mwl-answer-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 12px 14px;
      background: var(--color-card-bg);
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-md);
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text);
      cursor: pointer;
      transition: all var(--transition-fast);
      text-align: left;
      min-height: 44px;
    }
    .mwl-answer-btn:hover {
      border-color: var(--color-btn-primary);
      background: #faf5ff;
      transform: translateY(-1px);
      box-shadow: var(--shadow-sm);
    }
    .mwl-answer-indicator {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      flex-shrink: 0;
      position: relative;
      background: linear-gradient(135deg, var(--color-progress-start), var(--color-progress-end));
      padding: 2px;
    }
    .mwl-answer-indicator::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #ffffff;
    }
    .mwl-answer-btn.selected .mwl-answer-indicator::before {
      background: linear-gradient(135deg, var(--color-progress-start), var(--color-progress-end));
    }
    .mwl-question-nav {
      display: flex;
      justify-content: center;
    }
    .mwl-btn-back {
      background: transparent;
      color: var(--color-text-muted);
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
    }
    .mwl-btn-back:hover {
      color: var(--color-text);
      background: var(--color-btn-secondary);
      border-radius: var(--radius-md);
    }

    /* ECRAN 4 — RECOMMANDATION */
    .mwl-recommendation-card {
      max-width: 900px;
      margin: 0 auto;
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 28px;
      box-shadow: var(--shadow-sm);
    }
    .mwl-recommendation-label {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 18px;
    }
    .mwl-recommendation-text {
      font-family: 'Poppins', sans-serif;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.7;
      color: var(--color-text);
      margin-bottom: 20px;
    }
    .mwl-recommendation-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    /* ECRAN 5 — SERVICES */
    .mwl-services-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .mwl-services-header h2 {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 4px;
      line-height: 1.1em;
    }
    .mwl-services-header p {
      font-family: 'Poppins', sans-serif;
      color: var(--color-text-muted);
      font-size: 16px;
      font-weight: 400;
      margin-top: 8px;
      margin-bottom: 30px;
    }
    .mwl-services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    .mwl-service-card {
      background: var(--color-card-bg);
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 20px;
      cursor: pointer;
      transition: all var(--transition-fast);
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-height: 140px;
    }
    .mwl-service-card:hover {
      border-color: var(--color-btn-primary);
      box-shadow: var(--shadow-sm);
      transform: translateY(-2px);
    }
    .mwl-service-card.selected {
      border-color: var(--color-btn-primary);
      background: #ffffff;
    }
    .mwl-service-badge {
      position: absolute;
      top: -1px;
      left: 70%;
      transform: translateX(-50%);
      background: #CE005B;
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      font-size: 11px;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 0 0 10px 10px;
    }
    .mwl-service-card input[type="checkbox"] {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 18px;
      height: 18px;
      appearance: none;
      -webkit-appearance: none;
      border: 2px solid #a9adb8;
      border-radius: 6px;
      background-color: #ffffff;
      cursor: pointer;
    }
    .mwl-service-card.selected input[type="checkbox"] {
      background-color: var(--color-btn-primary);
      border-color: var(--color-btn-primary);
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 12.5L10 17.5L19 7' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 13px 13px;
      background-position: center;
      background-repeat: no-repeat;
    }
    .mwl-service-title {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--color-text);
      padding-right: 28px;
      line-height: 1.2em;
    }
    .mwl-service-desc {
      font-family: 'Poppins', sans-serif;
      font-size: 12px;
      font-weight: 400;
      color: var(--color-text);
      line-height: 1.4;
      flex: 1;
    }
    .mwl-service-price {
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-light);
      margin-top: 2px;
    }
    .mwl-services-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 16px;
    }

    /* ECRAN 6 — PRIX FINAL */
    .mwl-price-card {
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 20px 28px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .mwl-price-header {
      text-align: center;
      margin-bottom: 4px;
    }
    .mwl-price-header h2 {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 50px;
      font-weight: 700;
      margin-bottom: 2px;
      line-height: 1.1em;
    }
    .mwl-price-header p {
      font-family: 'Poppins', sans-serif;
      color: var(--color-text-muted);
      font-size: 16px;
    }
    .mwl-price-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .mwl-price-section {
      padding: 14px 16px;
      border-radius: var(--radius-md);
      background: #ffffff;
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .mwl-price-section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .mwl-price-section-label {
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 500;
    }
    .priority-high .mwl-price-section-label { color: var(--color-priority-high); }
    .priority-medium .mwl-price-section-label { color: var(--color-priority-medium); }
    .priority-low .mwl-price-section-label { color: var(--color-priority-low); }
    .mwl-price-section-badge {
      font-family: 'Poppins', sans-serif;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 10px;
      background: rgba(30, 58, 138, 0.1);
      color: var(--color-priority-high);
    }
    .priority-medium .mwl-price-section-badge {
      background: rgba(124, 45, 110, 0.1);
      color: var(--color-priority-medium);
    }
    .priority-low .mwl-price-section-badge {
      background: rgba(107, 114, 128, 0.1);
      color: var(--color-priority-low);
    }
    .mwl-price-section-amount {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #1e1e20;
      margin-top: 12px;
    }
    .mwl-price-section-detail {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      color: var(--color-text-muted);
      margin-top: 4px;
      line-height: 1.4;
    }
    .mwl-price-total {
      background: linear-gradient(135deg, #E2002F 0%, #0046A8 100%);
      border-radius: var(--radius-md);
      padding: 14px 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .mwl-price-total-left {
      text-align: left;
    }
    .mwl-price-total-label {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255,255,255,0.8);
      margin-bottom: 2px;
    }
    .mwl-price-total-amount {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
    }
    .mwl-price-total-detail {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      color: rgba(255,255,255,0.7);
      margin-top: 6px;
      margin-bottom: 10px;
    }
    .mwl-price-total-btn {
      background: #ffffff;
      color: var(--color-btn-primary);
      border: none;
      padding: 10px 24px;
      font-family: 'Poppins', sans-serif;
      font-size: 13px;
      font-weight: 600;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;
    }
    .mwl-price-total-btn:hover {
      background: var(--color-btn-primary-hover);
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }
    .mwl-price-disclaimer {
      font-family: 'Poppins', sans-serif;
      font-size: 12px;
      color: #9c9ea3;
      text-align: center;
      line-height: 1.4;
      margin-top: 2px;
    }
    .mwl-price-actions {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
    .mwl-price-actions .mwl-btn {
      padding: 10px 24px;
      font-size: 13px;
      border-radius: var(--radius-md);
    }

    /* ECRAN 7 — FORMULAIRE CONTACT */
    .mwl-contact-card {
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: 32px 40px;
      box-shadow: var(--shadow-sm);
    }
    .mwl-contact-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .mwl-contact-header h2 {
      font-family: 'Afacad Flux', sans-serif;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
      line-height: 1.1em;
    }
    .mwl-contact-header p {
      font-family: 'Poppins', sans-serif;
      color: var(--color-text-muted);
      font-size: 14px;
    }
    .mwl-contact-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px 20px;
    }
    .mwl-form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .mwl-form-group.full-width {
      grid-column: 1 / -1;
    }
    .mwl-form-label {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text);
    }
    .mwl-form-label .required {
      color: #dc2626;
    }
    .mwl-form-input {
      width: 100%;
      padding: 12px 16px;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: var(--color-text);
      background: #fafafa;
      border: 1.5px solid var(--color-border);
      border-radius: var(--radius-md);
      outline: none;
      transition: border-color var(--transition-fast), background var(--transition-fast);
    }
    .mwl-form-input:focus {
      border-color: var(--color-btn-primary);
      background: #ffffff;
    }
    .mwl-form-input::placeholder {
      color: var(--color-text-light);
    }
    .mwl-contact-actions {
      grid-column: 1 / -1;
      display: flex;
      justify-content: center;
      margin-top: 8px;
    }
    .mwl-contact-actions .mwl-btn {
      padding: 12px 48px;
      font-size: 15px;
      border-radius: var(--radius-md);
      min-width: 120px;
    }
    .mwl-contact-back {
      display: flex;
      justify-content: center;
      margin-top: 12px;
    }
    .mwl-contact-back .mwl-btn-back {
      background: transparent;
      color: var(--color-text-muted);
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      transition: color var(--transition-fast);
    }
    .mwl-contact-back .mwl-btn-back:hover {
      color: var(--color-text);
    }

    /* RESPONSIVE */
    @media (max-width: 1200px) {
      .mwl-services-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (max-width: 992px) {
      .mwl-intro-grid {
        flex-direction: column;
        gap: 24px;
      }
      .mwl-intro-left {
        flex: 1;
        max-width: 100%;
      }
      .mwl-intro-left h2 {
        font-size: 32px;
      }
      .mwl-answers-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .mwl-services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .mwl-price-grid {
        grid-template-columns: 1fr;
      }
      .mwl-contact-form {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 576px) {
      :host {
        padding: 16px;
      }
      .mwl-intro-left h2 {
        font-size: 28px;
      }
      .mwl-question-text {
        font-size: 24px;
      }
      .mwl-answers-grid {
        grid-template-columns: 1fr;
      }
      .mwl-services-grid {
        grid-template-columns: 1fr;
      }
      .mwl-price-header h2 {
        font-size: 36px;
      }
      .mwl-price-total {
        flex-direction: column;
        gap: 12px;
      }
      .mwl-price-total-left {
        text-align: center;
      }
    }
    `;
  }

  // ============================================
  // DONNEES
  // ============================================
  getQuestions() {
    return [
      {
        question: "Quel est votre objectif principal ?",
        answers: [
          "Augmenter mes ventes en ligne",
          "Ameliorer ma visibilite sur internet",
          "Automatiser mes processus internes",
          "Lancer un nouveau produit ou service",
          "Fideliser ma clientele existante",
          "Je ne sais pas encore, j'ai besoin de conseils"
        ]
      },
      {
        question: "Quel est votre budget approximatif ?",
        answers: [
          "Moins de 2 000 EUR",
          "Entre 2 000 et 5 000 EUR",
          "Entre 5 000 et 10 000 EUR",
          "Entre 10 000 et 25 000 EUR",
          "Plus de 25 000 EUR",
          "Je prefere en discuter"
        ]
      },
      {
        question: "Quel est votre delai souhaite ?",
        answers: [
          "Urgent (moins d'1 mois)",
          "Rapide (1 a 3 mois)",
          "Standard (3 a 6 mois)",
          "Sans pression (plus de 6 mois)",
          "Je ne sais pas encore"
        ]
      },
      {
        question: "Avez-vous deja une presence en ligne ?",
        answers: [
          "Oui, un site web existant",
          "Oui, des reseaux sociaux actifs",
          "Non, je pars de zero",
          "J'ai un peu de tout mais c'est desordonne"
        ]
      },
      {
        question: "Quel type de contenu souhaitez-vous produire ?",
        answers: [
          "Videos promotionnelles",
          "Photos professionnelles",
          "Contenu pour reseaux sociaux",
          "Site web complet",
          "Publicites en ligne",
          "Tout ce qui est necessaire"
        ]
      }
    ];
  }

  getServices() {
    return [
      {
        id: "site-vitrine",
        title: "Site Vitrine",
        description: "Presentation elegante de votre activite avec design sur mesure.",
        price: "A partir de 1 490 EUR",
        badge: "Populaire",
        priority: "high"
      },
      {
        id: "site-ecommerce",
        title: "Site E-commerce",
        description: "Boutique en ligne complete avec paiement securise.",
        price: "A partir de 2 990 EUR",
        badge: "",
        priority: "high"
      },
      {
        id: "site-sur-mesure",
        title: "Site Sur Mesure",
        description: "Solution web entierement personnalisee selon vos besoins.",
        price: "Sur devis",
        badge: "",
        priority: "medium"
      },
      {
        id: "seo-referencement",
        title: "SEO & Referencement",
        description: "Optimisation pour les moteurs de recherche et visibilite.",
        price: "A partir de 490 EUR/mois",
        badge: "",
        priority: "medium"
      },
      {
        id: "reseaux-sociaux",
        title: "Reseaux Sociaux",
        description: "Gestion et animation de vos comptes sociaux.",
        price: "A partir de 390 EUR/mois",
        badge: "",
        priority: "medium"
      },
      {
        id: "publicites-en-ligne",
        title: "Publicites en Ligne",
        description: "Campagnes Google Ads et Meta Ads optimisees.",
        price: "A partir de 490 EUR/mois",
        badge: "",
        priority: "medium"
      },
      {
        id: "video-promotionnelle",
        title: "Video Promotionnelle",
        description: "Tournage et montage professionnel pour votre marque.",
        price: "A partir de 990 EUR",
        badge: "",
        priority: "high"
      },
      {
        id: "photos-pro",
        title: "Photos Professionnelles",
        description: "Shooting photo pour produits, equipe et locaux.",
        price: "A partir de 490 EUR",
        badge: "",
        priority: "low"
      },
      {
        id: "newsletter",
        title: "Newsletter & Email",
        description: "Campagnes d'emailing et newsletters automatisees.",
        price: "A partir de 290 EUR/mois",
        badge: "",
        priority: "low"
      },
      {
        id: "chatbot",
        title: "Chatbot & Automatisation",
        description: "Assistant virtuel et automatisation des conversations.",
        price: "A partir de 590 EUR",
        badge: "Nouveau",
        priority: "medium"
      },
      {
        id: "branding",
        title: "Branding & Identite",
        description: "Logo, charte graphique et identite visuelle complete.",
        price: "A partir de 1 290 EUR",
        badge: "",
        priority: "high"
      },
      {
        id: "accompagnement",
        title: "Accompagnement Strategique",
        description: "Conseil et strategie digitale personnalisee mensuelle.",
        price: "A partir de 790 EUR/mois",
        badge: "",
        priority: "high"
      }
    ];
  }

  // ============================================
  // RENDU HTML
  // ============================================
  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="mwl-container">
        <!-- Barre de progression -->
        <div class="mwl-progress-container">
          <div class="mwl-progress-bar">
            <div class="mwl-progress-fill" id="progressFill" style="width: 0%"></div>
          </div>
        </div>

        <!-- Ecran 1: Introduction -->
        <div class="mwl-screen active" id="screen-intro">
          <div class="mwl-intro-grid">
            <div class="mwl-intro-left">
              <h2>Decrivez votre projet en quelques mots</h2>
              <p>Plus vous etes precis, plus je peux vous proposer une solution adaptee a vos besoins reels.</p>
            </div>
            <div class="mwl-intro-right">
              <div class="mwl-textarea-wrapper">
                <textarea class="mwl-textarea" id="projectDesc" placeholder="Ex: Je souhaite creer un site e-commerce pour vendre des produits artisanaux..."></textarea>
              </div>
              <button class="mwl-btn mwl-btn-primary" id="btn-start">
                Continuer
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Ecran 2: Loading -->
        <div class="mwl-screen" id="screen-loading">
          <div class="mwl-loading">
            <div class="mwl-spinner"></div>
            <p>Analyse de votre projet en cours...</p>
          </div>
        </div>

        <!-- Ecran 3: Questions -->
        <div class="mwl-screen" id="screen-questions">
          <div class="mwl-question-card">
            <div class="mwl-question-number" id="questionNumber">QUESTION 1/5</div>
            <div class="mwl-question-text" id="questionText">Question en cours de chargement...</div>
            <div class="mwl-answers-grid" id="answersGrid"></div>
            <div class="mwl-question-nav">
              <button class="mwl-btn-back" id="btn-question-back">Retour</button>
            </div>
          </div>
        </div>

        <!-- Ecran 4: Recommandation -->
        <div class="mwl-screen" id="screen-recommendation">
          <div class="mwl-recommendation-card">
            <div class="mwl-recommendation-label">Recommandation personnalisee</div>
            <div class="mwl-recommendation-text" id="recommendationText">
              Base sur vos reponses, je vous recommande une approche complete incluant un site web optimise, une strategie de contenu video et une presence renforcee sur les reseaux sociaux.
            </div>
            <div class="mwl-recommendation-actions">
              <button class="mwl-btn mwl-btn-primary" id="btn-continue-services">Voir les services recommandes</button>
              <button class="mwl-btn mwl-btn-outline" id="btn-skip-recommendation">Voir tous les services</button>
            </div>
          </div>
        </div>

        <!-- Ecran 5: Services -->
        <div class="mwl-screen" id="screen-services">
          <div class="mwl-services-header">
            <h2>Selectionnez vos services</h2>
            <p>Cochez les services qui correspondent a vos besoins. Vous pourrez ajuster votre selection a tout moment.</p>
          </div>
          <div class="mwl-services-grid" id="servicesGrid"></div>
          <div class="mwl-services-actions">
            <button class="mwl-btn mwl-btn-outline" id="btn-services-back">Retour</button>
            <button class="mwl-btn mwl-btn-primary" id="btn-continue-price">Voir le devis</button>
          </div>
        </div>

        <!-- Ecran 6: Prix -->
        <div class="mwl-screen" id="screen-price">
          <div class="mwl-price-card">
            <div class="mwl-price-header">
              <h2>Votre estimation</h2>
              <p>Base sur les services selectionnes</p>
            </div>
            <div class="mwl-price-grid" id="priceGrid"></div>
            <div class="mwl-price-total">
              <div class="mwl-price-total-left">
                <div class="mwl-price-total-label">Investissement total estime</div>
                <div class="mwl-price-total-amount" id="totalPrice">0 EUR</div>
                <div class="mwl-price-total-detail" id="totalDetail">Selectionnez des services pour voir l'estimation</div>
              </div>
              <button class="mwl-price-total-btn" id="btn-contact">Demander un devis</button>
            </div>
            <div class="mwl-price-disclaimer">
              Cette estimation est indicative. Un devis detaille vous sera envoye apres analyse complete de votre projet.
            </div>
            <div class="mwl-price-actions">
              <button class="mwl-btn mwl-btn-outline" id="btn-price-back">Modifier ma selection</button>
            </div>
          </div>
        </div>

        <!-- Ecran 7: Formulaire Contact -->
        <div class="mwl-screen" id="screen-contact">
          <div class="mwl-contact-card">
            <div class="mwl-contact-header">
              <h2>Finalisez votre demande</h2>
              <p>Remplissez le formulaire ci-dessous pour recevoir votre devis personnalise</p>
            </div>
            <form class="mwl-contact-form" id="contactForm">
              <div class="mwl-form-group">
                <label class="mwl-form-label">Prenom <span class="required">*</span></label>
                <input type="text" class="mwl-form-input" id="firstName" placeholder="Votre prenom" required>
              </div>
              <div class="mwl-form-group">
                <label class="mwl-form-label">Nom <span class="required">*</span></label>
                <input type="text" class="mwl-form-input" id="lastName" placeholder="Votre nom" required>
              </div>
              <div class="mwl-form-group">
                <label class="mwl-form-label">Email <span class="required">*</span></label>
                <input type="email" class="mwl-form-input" id="email" placeholder="votre@email.com" required>
              </div>
              <div class="mwl-form-group">
                <label class="mwl-form-label">Telephone</label>
                <input type="tel" class="mwl-form-input" id="phone" placeholder="+32 ...">
              </div>
              <div class="mwl-form-group full-width">
                <label class="mwl-form-label">Nom de votre entreprise</label>
                <input type="text" class="mwl-form-input" id="company" placeholder="Votre entreprise">
              </div>
              <div class="mwl-form-group full-width">
                <label class="mwl-form-label">Message complementaire</label>
                <textarea class="mwl-form-input" id="message" rows="3" placeholder="Des precisions sur votre projet..."></textarea>
              </div>
              <div class="mwl-contact-actions">
                <button type="submit" class="mwl-btn mwl-btn-primary" id="btn-submit">Envoyer ma demande</button>
              </div>
            </form>
            <div class="mwl-contact-back">
              <button class="mwl-btn-back" id="btn-contact-back">Retour au devis</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // LOGIQUE
  // ============================================
  initLogic() {
    this.questions = this.getQuestions();
    this.services = this.getServices();

    // Ecran 1: Introduction
    this.shadowRoot.getElementById('btn-start').addEventListener('click', () => {
      this.state.projectDescription = this.shadowRoot.getElementById('projectDesc').value;
      this.goToScreen('loading');
      setTimeout(() => {
        this.goToScreen('questions');
        this.renderQuestion();
      }, 1500);
    });

    // Ecran 3: Questions
    this.shadowRoot.getElementById('btn-question-back').addEventListener('click', () => {
      if (this.state.currentQuestionIndex > 0) {
        this.state.currentQuestionIndex--;
        this.renderQuestion();
      } else {
        this.goToScreen('intro');
      }
    });

    // Ecran 4: Recommandation
    this.shadowRoot.getElementById('btn-continue-services').addEventListener('click', () => {
      this.goToScreen('services');
      this.renderServices();
    });
    this.shadowRoot.getElementById('btn-skip-recommendation').addEventListener('click', () => {
      this.goToScreen('services');
      this.renderServices();
    });

    // Ecran 5: Services
    this.shadowRoot.getElementById('btn-services-back').addEventListener('click', () => {
      this.goToScreen('recommendation');
    });
    this.shadowRoot.getElementById('btn-continue-price').addEventListener('click', () => {
      this.goToScreen('price');
      this.renderPrice();
    });

    // Ecran 6: Prix
    this.shadowRoot.getElementById('btn-price-back').addEventListener('click', () => {
      this.goToScreen('services');
    });
    this.shadowRoot.getElementById('btn-contact').addEventListener('click', () => {
      this.goToScreen('contact');
    });

    // Ecran 7: Contact
    this.shadowRoot.getElementById('btn-contact-back').addEventListener('click', () => {
      this.goToScreen('price');
    });
    this.shadowRoot.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  goToScreen(screenName) {
    const screens = ['intro', 'loading', 'questions', 'recommendation', 'services', 'price', 'contact'];
    screens.forEach(s => {
      const el = this.shadowRoot.getElementById('screen-' + s);
      if (el) el.classList.remove('active');
    });
    const target = this.shadowRoot.getElementById('screen-' + screenName);
    if (target) target.classList.add('active');

    // Mettre a jour la barre de progression
    const progressMap = {
      'intro': 0,
      'loading': 10,
      'questions': 20,
      'recommendation': 60,
      'services': 70,
      'price': 85,
      'contact': 95
    };
    const fill = this.shadowRoot.getElementById('progressFill');
    if (fill) fill.style.width = (progressMap[screenName] || 0) + '%';
  }

  renderQuestion() {
    const q = this.questions[this.state.currentQuestionIndex];
    if (!q) {
      this.goToScreen('recommendation');
      return;
    }

    this.shadowRoot.getElementById('questionNumber').textContent =
      'QUESTION ' + (this.state.currentQuestionIndex + 1) + '/' + this.questions.length;
    this.shadowRoot.getElementById('questionText').textContent = q.question;

    const grid = this.shadowRoot.getElementById('answersGrid');
    grid.innerHTML = '';

    q.answers.forEach((answer, idx) => {
      const btn = document.createElement('button');
      btn.className = 'mwl-answer-btn';
      btn.innerHTML = '<span class="mwl-answer-indicator"></span><span>' + answer + '</span>';
      btn.addEventListener('click', () => {
        this.state.answers[this.state.currentQuestionIndex] = answer;
        if (this.state.currentQuestionIndex < this.questions.length - 1) {
          this.state.currentQuestionIndex++;
          this.renderQuestion();
        } else {
          this.goToScreen('recommendation');
        }
      });
      grid.appendChild(btn);
    });
  }

  renderServices() {
    const grid = this.shadowRoot.getElementById('servicesGrid');
    grid.innerHTML = '';

    this.services.forEach(service => {
      const card = document.createElement('div');
      card.className = 'mwl-service-card' + (this.state.selectedServices.includes(service.id) ? ' selected' : '');
      card.dataset.id = service.id;

      let badgeHtml = '';
      if (service.badge) {
        badgeHtml = '<div class="mwl-service-badge">' + service.badge + '</div>';
      }

      card.innerHTML = badgeHtml +
        '<input type="checkbox"' + (this.state.selectedServices.includes(service.id) ? ' checked' : '') + '>' +
        '<div class="mwl-service-title">' + service.title + '</div>' +
        '<div class="mwl-service-desc">' + service.description + '</div>' +
        '<div class="mwl-service-price">' + service.price + '</div>';

      card.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT') {
          e.stopPropagation();
        }
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;

        if (checkbox.checked) {
          if (!this.state.selectedServices.includes(service.id)) {
            this.state.selectedServices.push(service.id);
          }
          card.classList.add('selected');
        } else {
          this.state.selectedServices = this.state.selectedServices.filter(id => id !== service.id);
          card.classList.remove('selected');
        }
      });

      grid.appendChild(card);
    });
  }

  renderPrice() {
    const priceGrid = this.shadowRoot.getElementById('priceGrid');
    priceGrid.innerHTML = '';

    const selected = this.services.filter(s => this.state.selectedServices.includes(s.id));

    if (selected.length === 0) {
      this.shadowRoot.getElementById('totalPrice').textContent = '0 EUR';
      this.shadowRoot.getElementById('totalDetail').textContent = 'Aucun service selectionne';
      return;
    }

    const priorities = { high: [], medium: [], low: [] };
    selected.forEach(s => {
      if (priorities[s.priority]) priorities[s.priority].push(s);
    });

    const priorityLabels = {
      high: { label: 'Prioritaires', badge: 'Essentiel', class: 'priority-high' },
      medium: { label: 'Recommandes', badge: 'Conseille', class: 'priority-medium' },
      low: { label: 'Optionnels', badge: 'Bonus', class: 'priority-low' }
    };

    Object.keys(priorities).forEach(p => {
      const items = priorities[p];
      if (items.length === 0) return;

      const section = document.createElement('div');
      section.className = 'mwl-price-section ' + priorityLabels[p].class;

      const itemNames = items.map(i => i.title).join(', ');
      section.innerHTML =
        '<div class="mwl-price-section-header">' +
        '<span class="mwl-price-section-label">' + priorityLabels[p].label + '</span>' +
        '<span class="mwl-price-section-badge">' + priorityLabels[p].badge + '</span>' +
        '</div>' +
        '<div class="mwl-price-section-detail">' + itemNames + '</div>';

      priceGrid.appendChild(section);
    });

    this.shadowRoot.getElementById('totalPrice').textContent = selected.length + ' service' + (selected.length > 1 ? 's' : '') + ' selectionne' + (selected.length > 1 ? 's' : '');
    this.shadowRoot.getElementById('totalDetail').textContent = 'Devis personnalise sur demande';
  }

  async handleSubmit() {
    const formData = {
      projectDescription: this.state.projectDescription,
      answers: this.state.answers,
      selectedServices: this.state.selectedServices.map(id => {
        const s = this.services.find(sv => sv.id === id);
        return s ? s.title : id;
      }),
      firstName: this.shadowRoot.getElementById('firstName').value,
      lastName: this.shadowRoot.getElementById('lastName').value,
      email: this.shadowRoot.getElementById('email').value,
      phone: this.shadowRoot.getElementById('phone').value,
      company: this.shadowRoot.getElementById('company').value,
      message: this.shadowRoot.getElementById('message').value,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(this.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Votre demande a ete envoyee avec succes ! Je vous recontacte dans les 24h.');
        this.resetConfigurator();
      } else {
        alert('Erreur lors de l\'envoi. Veuillez reessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion. Veuillez verifier votre connexion internet et reessayer.');
    }
  }

  resetConfigurator() {
    this.state = {
      currentStep: 0,
      totalSteps: 6,
      projectDescription: '',
      answers: [],
      selectedServices: [],
      currentQuestionIndex: 0
    };
    this.shadowRoot.getElementById('projectDesc').value = '';
    this.shadowRoot.getElementById('contactForm').reset();
    this.goToScreen('intro');
  }
}

customElements.define('morewless-configurateur', MorewlessConfigurator);
