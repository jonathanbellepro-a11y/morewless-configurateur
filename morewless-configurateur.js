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
      .mwl-services-grid { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 900px) {
      .mwl-intro-grid { flex-direction: column; gap: 24px; }
      .mwl-intro-left { flex: none; max-width: 100%; }
      .mwl-intro-left h2 { font-size: 32px; }
      .mwl-answers-grid { grid-template-columns: repeat(2, 1fr); }
      .mwl-services-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      :host { padding: 16px 12px; }
      .mwl-intro-left h2,
      .mwl-question-text,
      .mwl-services-header h2,
      .mwl-price-header h2 { font-size: 24px; }
      .mwl-answers-grid { grid-template-columns: 1fr; }
      .mwl-services-grid { grid-template-columns: 1fr; }
      .mwl-question-card,
      .mwl-recommendation-card,
      .mwl-price-card { padding: 20px; }
      .mwl-recommendation-actions,
      .mwl-services-actions { flex-direction: column; }
      .mwl-price-actions { flex-direction: column; }
      .mwl-price-grid { grid-template-columns: 1fr; }
      .mwl-price-total {
        flex-direction: column;
        gap: 12px;
        text-align: center;
      }
      .mwl-price-total-left { text-align: center; }
      .mwl-contact-form { grid-template-columns: 1fr; }
      .mwl-contact-card { padding: 24px 20px; }
    }
    `;
  }

  // ============================================
  // HTML TEMPLATE
  // ============================================
  getTemplate() {
    return `
    <div class="mwl-container">
      <div class="mwl-progress-container">
        <div class="mwl-progress-bar">
          <div class="mwl-progress-fill" id="progressFill" style="width: 0%"></div>
        </div>
      </div>

      <div class="mwl-screen active" id="screen-intro">
        <div class="mwl-intro-grid">
          <div class="mwl-intro-left">
            <h2>Decrivez-moi votre projet en quelques lignes.</h2>
            <p>Plus vous detaillez, plus mes recommandations seront precises.</p>
          </div>
          <div class="mwl-intro-right">
            <div class="mwl-textarea-wrapper">
              <textarea class="mwl-textarea" id="projectDescription"
                placeholder="Ex: Je lance un food truck de burgers a Bruxelles. J'ai besoin de visibilite pour attirer de nouveaux clients."></textarea>
            </div>
            <button class="mwl-btn mwl-btn-primary" id="btnStart">Suivant</button>
          </div>
        </div>
      </div>

      <div class="mwl-screen" id="screen-loading">
        <div class="mwl-loading">
          <div class="mwl-spinner"></div>
          <p>Analyse de votre projet...</p>
        </div>
      </div>

      <div class="mwl-screen" id="screen-questions">
        <div class="mwl-question-card" id="questionCard">
          <div class="mwl-question-number" id="questionNumber">Question 1 / 4</div>
          <div class="mwl-question-text" id="questionText">Chargement...</div>
          <div class="mwl-answers-grid" id="answersContainer"></div>
          <div class="mwl-question-nav">
            <button class="mwl-btn mwl-btn-back" id="btnBack">Retour</button>
          </div>
        </div>
      </div>

      <div class="mwl-screen" id="screen-recommendation">
        <div class="mwl-recommendation-card">
          <div class="mwl-recommendation-label">Recommandation personnalisee</div>
          <div class="mwl-recommendation-text" id="recommendationText">Chargement...</div>
          <div class="mwl-recommendation-actions">
            <button class="mwl-btn mwl-btn-primary" id="btnGoToServices">Voir les services recommandes</button>
            <button class="mwl-btn mwl-btn-outline" id="btnBackToQuestions">Modifier mes reponses</button>
          </div>
        </div>
      </div>

      <div class="mwl-screen" id="screen-services">
        <div class="mwl-services-header">
          <h2>Services recommandes pour votre projet</h2>
          <p>Cochez ou decochez les services qui vous interessent</p>
        </div>
        <div class="mwl-services-grid" id="servicesGrid"></div>
        <div class="mwl-services-actions">
          <button class="mwl-btn mwl-btn-primary" id="btnGoToPrice">Voir mon estimation</button>
          <button class="mwl-btn mwl-btn-outline" id="btnBackToRec">Retour</button>
        </div>
      </div>

      <div class="mwl-screen" id="screen-price">
        <div class="mwl-price-card">
          <div class="mwl-price-header">
            <h2>Votre estimation</h2>
            <p>Voici ce qui est prioritaire pour votre projet</p>
          </div>
          <div class="mwl-price-grid">
            <div class="mwl-price-section priority-high">
              <div class="mwl-price-section-header">
                <span class="mwl-price-section-label">Prioritaire</span>
                <span class="mwl-price-section-badge">Essentiel</span>
              </div>
              <div class="mwl-price-section-amount" id="pricePriority">-</div>
              <div class="mwl-price-section-detail" id="pricePriorityDetail">-</div>
            </div>
            <div class="mwl-price-section priority-medium">
              <div class="mwl-price-section-header">
                <span class="mwl-price-section-label">Secondaire</span>
                <span class="mwl-price-section-badge">Optionnel</span>
              </div>
              <div class="mwl-price-section-amount" id="priceSecondary">-</div>
              <div class="mwl-price-section-detail" id="priceSecondaryDetail">-</div>
            </div>
            <div class="mwl-price-section priority-low">
              <div class="mwl-price-section-header">
                <span class="mwl-price-section-label">Chaque mois</span>
                <span class="mwl-price-section-badge">Abonnement</span>
              </div>
              <div class="mwl-price-section-amount" id="priceMonthly">-</div>
              <div class="mwl-price-section-detail" id="priceMonthlyDetail">-</div>
            </div>
          </div>
          <div class="mwl-price-total">
            <div class="mwl-price-total-left">
              <div class="mwl-price-total-label">Investissement total</div>
              <div class="mwl-price-total-amount" id="priceTotal">-</div>
              <div class="mwl-price-total-detail" id="priceTotalDetail">-</div>
            </div>
            <button class="mwl-price-total-btn" id="btnGoToContact">Demander mon pre-devis</button>
          </div>
          <p class="mwl-price-disclaimer">
            Cette estimation est indicative. Le prix final est confirme apres verification des besoins, contenus disponibles et contraintes techniques.
          </p>
          <div class="mwl-price-actions">
            <button class="mwl-btn mwl-btn-outline" id="btnBackToServices">Modifier mes choix</button>
          </div>
        </div>
      </div>

      <div class="mwl-screen" id="screen-contact">
        <div class="mwl-contact-card">
          <div class="mwl-contact-header">
            <h2>Demander mon pre-devis</h2>
            <p>Laissez-nous vos coordonnees, nous vous recontactons sous 24h</p>
          </div>
          <form class="mwl-contact-form" id="contactForm">
            <div class="mwl-form-group">
              <label class="mwl-form-label">Prenom et nom <span class="required">*</span></label>
              <input type="text" class="mwl-form-input" id="contactName" placeholder="Saisissez votre prenom" required>
            </div>
            <div class="mwl-form-group">
              <label class="mwl-form-label">E-mail <span class="required">*</span></label>
              <input type="email" class="mwl-form-input" id="contactEmail" placeholder="Saisissez votre e-mail" required>
            </div>
            <div class="mwl-form-group">
              <label class="mwl-form-label">Telephone <span class="required">*</span></label>
              <input type="tel" class="mwl-form-input" id="contactPhone" placeholder="Saisissez votre numero de telephone" required>
            </div>
            <div class="mwl-form-group">
              <label class="mwl-form-label">Votre site / reseaux sociaux <span class="required">*</span></label>
              <input type="text" class="mwl-form-input" id="contactSite" placeholder="Repondez en quelques mots" required>
            </div>
            <div class="mwl-contact-actions">
              <button type="submit" class="mwl-btn mwl-btn-primary" id="btnSubmitContact">Envoyer</button>
            </div>
          </form>
          <div class="mwl-contact-back">
            <button class="mwl-btn-back" id="btnBackToPrice">Retour a l'estimation</button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `<style>${this.getStyles()}</style>${this.getTemplate()}`;
  }

  // ============================================
  // DONNEES
  // ============================================
  get SERVICES() {
    return {
      landingPage: { id: 'landingPage', title: 'Landing page', description: 'Page unique optimisee pour convertir vos visiteurs en clients.', prixMin: 800, prixMax: 2500, type: 'one-shot', recommended: true, priority: 'high' },
      reseauxSociaux: { id: 'reseauxSociaux', title: 'Reseaux sociaux', description: 'Gestion complete de vos comptes sociaux et community management.', prixMin: 400, prixMax: 1200, type: 'monthly', recommended: true, priority: 'low' },
      contenu: { id: 'contenu', title: 'Creation de contenu', description: 'Posts, carrousels, stories et visuels sur-mesure pour vos reseaux.', prixMin: 300, prixMax: 900, type: 'monthly', recommended: true, priority: 'low' },
      video: { id: 'video', title: 'Video courte', description: 'Reels, TikTok, Shorts et videos promotionnelles impactantes.', prixMin: 500, prixMax: 1500, type: 'one-shot', recommended: true, priority: 'high' },
      metaAds: { id: 'metaAds', title: 'Campagne Meta Ads', description: 'Publicite ciblee sur Facebook et Instagram pour toucher vos clients.', prixMin: 300, prixMax: 800, type: 'monthly', recommended: true, priority: 'low' },
      siteWeb: { id: 'siteWeb', title: 'Site web', description: 'Site vitrine ou e-commerce complet, responsive et optimise SEO.', prixMin: 2000, prixMax: 8000, type: 'one-shot', recommended: false, priority: 'medium' },
      automatisation: { id: 'automatisation', title: 'Automatisation', description: 'Workflows automatises pour gagner du temps au quotidien.', prixMin: 500, prixMax: 2000, type: 'one-shot', recommended: false, priority: 'medium' },
      iaWhatsapp: { id: 'iaWhatsapp', title: 'Assistant IA / WhatsApp', description: 'Chatbot intelligent pour repondre a vos clients 24/7.', prixMin: 300, prixMax: 1000, type: 'monthly', recommended: false, priority: 'low' },
      imprimes: { id: 'imprimes', title: 'Supports imprimes', description: 'Flyers, cartes de visite, menus et tout support papier.', prixMin: 150, prixMax: 600, type: 'one-shot', recommended: false, priority: 'medium' },
      identite: { id: 'identite', title: 'Identite visuelle', description: 'Logo, charte graphique et elements de base de votre marque.', prixMin: 600, prixMax: 1800, type: 'one-shot', recommended: false, priority: 'high' }
    };
  }

  get simulatedQuestions() {
    return [
      { id: 'q1', text: 'Votre projet est-il deja lance ?', answers: ['Deja actif', 'Lancement prochain', 'En preparation'] },
      { id: 'q2', text: 'Avez-vous deja une presence en ligne ?', answers: ['Site web + reseaux', 'Pas structure', 'Je pars de zero'] },
      { id: 'q3', text: 'Quel est votre objectif principal ?', answers: ['Visibilite', 'Plus de demandes', 'Vendre plus', 'Gagner du temps', 'Moderniser'] },
      { id: 'q4', text: 'Besoin de contenus visuels ?', answers: ['Photos', 'Videos', 'Reels / Shorts', 'Visuels reseaux', 'Pas encore'] }
    ];
  }

  get simulatedRecommendation() {
    return "Super projet. Pour un food truck de burgers a Bruxelles, la visibilite locale est essentielle. Instagram peut aider a donner envie avec de belles photos, une landing page peut presenter vos emplacements et une campagne Meta Ads peut toucher les bonnes personnes autour de vos zones de passage.";
  }

  // ============================================
  // LOGIQUE
  // ============================================
  initLogic() {
    const root = this.shadowRoot;

    // Bouton Start
    root.getElementById('btnStart').addEventListener('click', () => this.startAnalysis());

    // Boutons navigation
    root.getElementById('btnBack').addEventListener('click', () => this.goBack());
    root.getElementById('btnGoToServices').addEventListener('click', () => this.goToServices());
    root.getElementById('btnBackToQuestions').addEventListener('click', () => this.goBackToQuestions());
    root.getElementById('btnGoToPrice').addEventListener('click', () => this.goToPrice());
    root.getElementById('btnBackToRec').addEventListener('click', () => this.goBackToRecommendation());
    root.getElementById('btnBackToServices').addEventListener('click', () => this.goBackToServices());
    root.getElementById('btnGoToContact').addEventListener('click', () => this.goToContact());
    root.getElementById('btnBackToPrice').addEventListener('click', () => this.goBackToPrice());

    // Formulaire
    root.getElementById('contactForm').addEventListener('submit', (e) => this.submitContact(e));

    this.updateProgress();
  }

  async sendToN8n(payload) {
    console.log('[SIMULATION] Donnees envoyees a n8n:', payload);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, message: 'Recu par n8n (simulation)' }), 500));
  }

  showScreen(screenId) {
    const screens = this.shadowRoot.querySelectorAll('.mwl-screen');
    screens.forEach(s => s.classList.remove('active'));
    const screen = this.shadowRoot.getElementById(screenId);
    if (screen) screen.classList.add('active');
    this.updateProgress();
  }

  updateProgress() {
    const fill = this.shadowRoot.getElementById('progressFill');
    const percentage = ((this.state.currentStep + 1) / this.state.totalSteps) * 100;
    fill.style.width = percentage + '%';
  }

  startAnalysis() {
    const desc = this.shadowRoot.getElementById('projectDescription').value.trim();
    if (!desc) {
      this.shadowRoot.getElementById('projectDescription').focus();
      const wrapper = this.shadowRoot.querySelector('.mwl-textarea-wrapper');
      wrapper.style.borderColor = '#dc2626';
      setTimeout(() => wrapper.style.borderColor = '', 2000);
      return;
    }
    this.state.projectDescription = desc;
    this.state.currentStep = 1;
    this.sendToN8n({ projectDescription: this.state.projectDescription, answers: this.state.answers, selectedServices: this.state.selectedServices, currentStep: this.state.currentStep });
    this.showScreen('screen-loading');
    setTimeout(() => {
      this.state.currentStep = 2;
      this.state.currentQuestionIndex = 0;
      this.showScreen('screen-questions');
      this.renderQuestion();
    }, 1500);
  }

  renderQuestion() {
    const q = this.simulatedQuestions[this.state.currentQuestionIndex];
    const total = this.simulatedQuestions.length;
    this.shadowRoot.getElementById('questionNumber').textContent = 'Question ' + (this.state.currentQuestionIndex + 1) + ' / ' + total;
    this.shadowRoot.getElementById('questionText').textContent = q.text;

    const container = this.shadowRoot.getElementById('answersContainer');
    container.innerHTML = '';

    q.answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.className = 'mwl-answer-btn';
      btn.innerHTML = '<span class="mwl-answer-indicator"></span><span>' + answer + '</span>';
      btn.addEventListener('click', () => this.selectAnswer(q.id, q.text, answer));
      container.appendChild(btn);
    });

    const btnBack = this.shadowRoot.getElementById('btnBack');
    btnBack.style.visibility = this.state.currentQuestionIndex === 0 ? 'hidden' : 'visible';
  }

  selectAnswer(qid, qtext, answer) {
    const existing = this.state.answers.findIndex(a => a.questionId === qid);
    if (existing >= 0) {
      this.state.answers[existing] = { questionId: qid, questionText: qtext, answer: answer };
    } else {
      this.state.answers.push({ questionId: qid, questionText: qtext, answer: answer });
    }
    this.sendToN8n({ projectDescription: this.state.projectDescription, answers: this.state.answers, selectedServices: this.state.selectedServices, currentStep: this.state.currentStep });
    if (this.state.currentQuestionIndex < this.simulatedQuestions.length - 1) {
      this.state.currentQuestionIndex++;
      this.renderQuestion();
    } else {
      this.state.currentStep = 3;
      this.showScreen('screen-recommendation');
      this.shadowRoot.getElementById('recommendationText').textContent = this.simulatedRecommendation;
    }
  }

  goBack() {
    if (this.state.currentQuestionIndex > 0) {
      this.state.currentQuestionIndex--;
      this.state.answers.pop();
      this.renderQuestion();
    } else {
      this.state.currentStep = 0;
      this.showScreen('screen-intro');
    }
  }

  goBackToQuestions() {
    this.state.currentStep = 2;
    this.showScreen('screen-questions');
    this.renderQuestion();
  }

  goToServices() {
    this.state.currentStep = 4;
    this.showScreen('screen-services');
    this.renderServices();
  }

  goBackToRecommendation() {
    this.state.currentStep = 3;
    this.showScreen('screen-recommendation');
  }

  renderServices() {
    const grid = this.shadowRoot.getElementById('servicesGrid');
    grid.innerHTML = '';
    const services = this.SERVICES;

    Object.keys(services).forEach(key => {
      const service = services[key];
      const card = document.createElement('div');
      card.className = 'mwl-service-card' + (service.recommended ? ' selected' : '');
      card.dataset.serviceId = service.id;

      const isChecked = service.recommended ? 'checked' : '';
      const priceText = service.type === 'monthly'
        ? 'A partir de ' + service.prixMin + ' /mois'
        : 'Entre ' + service.prixMin + ' et ' + service.prixMax + '';

      const badgeHtml = service.recommended ? '<div class="mwl-service-badge">Recommande</div>' : '';

      card.innerHTML = badgeHtml +
        '<input type="checkbox" ' + isChecked + '>' +
        '<div class="mwl-service-title">' + service.title + '</div>' +
        '<div class="mwl-service-desc">' + service.description + '</div>' +
        '<div class="mwl-service-price">' + priceText + '</div>';

      card.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox' && !e.target.classList.contains('mwl-service-badge')) {
          const cb = card.querySelector('input[type="checkbox"]');
          cb.checked = !cb.checked;
          this.toggleService(service.id);
        }
      });

      const cb = card.querySelector('input[type="checkbox"]');
      cb.addEventListener('change', () => this.toggleService(service.id));

      grid.appendChild(card);
    });

    this.state.selectedServices = Object.keys(services).filter(k => services[k].recommended).map(k => services[k].id);
  }

  toggleService(serviceId) {
    const idx = this.state.selectedServices.indexOf(serviceId);
    const card = this.shadowRoot.querySelector('[data-service-id="' + serviceId + '"]');
    if (idx >= 0) {
      this.state.selectedServices.splice(idx, 1);
      if (card) card.classList.remove('selected');
    } else {
      this.state.selectedServices.push(serviceId);
      if (card) card.classList.add('selected');
    }
  }

  goToPrice() {
    if (this.state.selectedServices.length === 0) {
      alert('Veuillez selectionner au moins un service.');
      return;
    }
    this.state.currentStep = 5;
    this.showScreen('screen-price');
    this.renderPrice();
  }

  goBackToServices() {
    this.state.currentStep = 4;
    this.showScreen('screen-services');
  }

  renderPrice() {
    const prices = this.calculatePricesByPriority();
    const services = this.SERVICES;

    // Prioritaire
    let pServices = [], pMin = 0, pMax = 0;
    this.state.selectedServices.forEach(sid => {
      const s = services[sid];
      if (s && s.priority === 'high' && s.type === 'one-shot') {
        pServices.push(s.title);
        pMin += s.prixMin;
        pMax += s.prixMax;
      }
    });
    this.shadowRoot.getElementById('pricePriority').textContent = pMax > 0 ? 'Entre ' + pMin + ' et ' + pMax + '' : '0 ';
    this.shadowRoot.getElementById('pricePriorityDetail').textContent = pServices.length > 0 ? pServices.join(', ') : 'Aucun service prioritaire selectionne';

    // Secondaire
    let sServices = [], sMin = 0, sMax = 0;
    this.state.selectedServices.forEach(sid => {
      const s = services[sid];
      if (s && s.priority === 'medium' && s.type === 'one-shot') {
        sServices.push(s.title);
        sMin += s.prixMin;
        sMax += s.prixMax;
      }
    });
    this.shadowRoot.getElementById('priceSecondary').textContent = sMax > 0 ? 'Entre ' + sMin + ' et ' + sMax + '' : '0 ';
    this.shadowRoot.getElementById('priceSecondaryDetail').textContent = sServices.length > 0 ? sServices.join(', ') : 'Aucun service secondaire selectionne';

    // Mensuel
    let mServices = [], mMin = 0, mMax = 0;
    this.state.selectedServices.forEach(sid => {
      const s = services[sid];
      if (s && s.type === 'monthly') {
        mServices.push(s.title);
        mMin += s.prixMin;
        mMax += s.prixMax;
      }
    });
    this.shadowRoot.getElementById('priceMonthly').textContent = mMax > 0 ? 'Entre ' + mMin + ' et ' + mMax + ' /mois' : '0 /mois';
    this.shadowRoot.getElementById('priceMonthlyDetail').textContent = mServices.length > 0 ? mServices.join(', ') : 'Aucun service mensuel selectionne';

    // Total
    const totalMin = pMin + sMin;
    const totalMax = pMax + sMax;
    this.shadowRoot.getElementById('priceTotal').textContent = totalMax > 0 ? 'Entre ' + totalMin + ' et ' + totalMax + '' : '0 ';
    this.shadowRoot.getElementById('priceTotalDetail').textContent = mMax > 0 ? '+ ' + mMin + ' a ' + mMax + ' /mois d'accompagnement' : 'Sans accompagnement mensuel';

    this.sendToN8n({ projectDescription: this.state.projectDescription, answers: this.state.answers, selectedServices: this.state.selectedServices, currentStep: this.state.currentStep });
  }

  calculatePricesByPriority() {
    const result = { high: { min: 0, max: 0 }, medium: { min: 0, max: 0 }, low: { min: 0, max: 0 } };
    const services = this.SERVICES;
    this.state.selectedServices.forEach(sid => {
      const s = services[sid];
      if (s && s.type === 'one-shot') {
        result[s.priority].min += s.prixMin;
        result[s.priority].max += s.prixMax;
      }
    });
    return result;
  }

  goToContact() {
    this.state.currentStep = 6;
    this.state.totalSteps = 7;
    this.showScreen('screen-contact');
  }

  goBackToPrice() {
    this.state.currentStep = 5;
    this.state.totalSteps = 6;
    this.showScreen('screen-price');
  }

  submitContact(event) {
    event.preventDefault();
    const name = this.shadowRoot.getElementById('contactName').value.trim();
    const email = this.shadowRoot.getElementById('contactEmail').value.trim();
    const phone = this.shadowRoot.getElementById('contactPhone').value.trim();
    const site = this.shadowRoot.getElementById('contactSite').value.trim();

    if (!name || !email || !phone || !site) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const prices = this.calculatePricesByPriority();
    const monthly = { min: 0, max: 0 };
    const services = this.SERVICES;
    this.state.selectedServices.forEach(sid => {
      const s = services[sid];
      if (s && s.type === 'monthly') {
        monthly.min += s.prixMin;
        monthly.max += s.prixMax;
      }
    });

    const payload = {
      projectDescription: this.state.projectDescription,
      answers: this.state.answers,
      selectedServices: this.state.selectedServices,
      priceEstimate: { priority: prices.high, secondary: prices.medium, monthly: monthly },
      contact: { name, email, phone, site },
      currentStep: this.state.currentStep
    };

    this.sendToN8n(payload);
    alert('Votre demande de pre-devis a ete envoyee ! Nous vous recontacterons sous 24h.\n\n(Simulation — en production, cela enverrait les donnees a n8n)');
  }
}

customElements.define('morewless-configurateur', MorewlessConfigurator);
