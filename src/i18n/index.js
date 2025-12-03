import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  nb: {
    translation: {
      // Common
      appName: 'Henteklar',
      login: 'Logg inn',
      logout: 'Logg ut',
      back: 'Tilbake',
      search: 'Søk',
      save: 'Lagre',
      cancel: 'Avbryt',
      edit: 'Rediger',
      
      // Landing
      landing: {
        tagline: 'For barnehager',
        title: 'Hent barnet ditt på',
        titleHighlight: '1-2-3',
        subtitle: 'Erstatt det gamle Excel-arket med en moderne, sikker løsning. Foreldre og ansatte får full oversikt – på sekunder.',
        getStarted: 'Kom i gang',
        seeFeatures: 'Se funksjoner',
        featuresTitle: 'Alt du trenger, ingenting du ikke trenger',
        featuresSubtitle: 'Designet for å være så enkelt at selv besteforeldre klarer det uten opplæring.',
        ctaTitle: 'Klar til å forenkle hverdagen?',
        ctaSubtitle: 'Kom i gang på minutter. Ingen installasjon, ingen komplisert oppsett.',
        loginNow: 'Logg inn nå',
        copyright: '© 2024 FrostByte AS. Alle rettigheter reservert.',
      },
      
      // Features
      features: {
        quickCheckIn: 'Rask inn/utsjekking',
        quickCheckInDesc: 'Kryss barn inn og ut med ett trykk. Enkelt for både foreldre og ansatte.',
        secure: 'Trygt og sikkert',
        secureDesc: 'GDPR-godkjent løsning med sikker lagring av all informasjon.',
        everywhere: 'Fungerer overalt',
        everywhereDesc: 'Bruk mobil, nettbrett eller PC. Alltid tilgjengelig når du trenger det.',
        overview: 'Full oversikt',
        overviewDesc: 'Se hvem som er i barnehagen, kontaktinfo og historikk på ett sted.',
      },
      
      // Login
      loginPage: {
        subtitle: 'Logg inn for å fortsette',
        email: 'E-post',
        emailPlaceholder: 'din@epost.no',
        password: 'Passord',
        passwordPlaceholder: '••••••••',
        rememberMe: 'Husk meg',
        forgotPassword: 'Glemt passord?',
        loggingIn: 'Logger inn...',
        loginError: 'Feil e-post eller passord',
        fillAllFields: 'Vennligst fyll ut alle feltene',
        loginProblems: 'Problemer med innlogging?',
        contactKindergarten: 'Kontakt barnehagen',
      },
      
      // Dashboard
      dashboard: {
        title: 'Oversikt',
        totalChildren: 'Totalt barn',
        checkedIn: 'Inne nå',
        checkedOut: 'Hentet',
        allChildren: 'Alle barn',
        searchChildren: 'Søk etter barn...',
        noChildrenFound: 'Ingen barn funnet',
        inSince: 'Inne siden',
        pickedUp: 'Hentet',
        years: 'år',
      },
      
      // Check in/out
      checkInOut: {
        title: 'Sjekk inn / ut',
        subtitle: 'Trykk på et barn for å endre status',
        all: 'Alle',
        in: 'Inne',
        out: 'Hentet',
        checkIn: 'Sjekk inn',
        checkOut: 'Sjekk ut',
        checkedIn: 'ble sjekket inn kl.',
        checkedOut: 'ble sjekket ut kl.',
        noChildrenFound: 'Ingen barn funnet',
      },
      
      // Child profile
      childProfile: {
        notFound: 'Barn ikke funnet',
        backToOverview: 'Tilbake til oversikt',
        inSince: 'Inne siden',
        contactInfo: 'Kontaktinformasjon',
        primary: 'Primær',
        sendEmail: 'Send e-post',
        quickActions: 'Hurtighandlinger',
        editProfile: 'Rediger profil',
        viewHistory: 'Se historikk',
      },
      
      // Settings
      settings: {
        title: 'Innstillinger',
        subtitle: 'Administrer konto og preferanser',
        account: 'Konto',
        profile: 'Profil',
        profileDesc: 'Rediger navn og kontaktinfo',
        security: 'Sikkerhet',
        securityDesc: 'Passord og to-faktor autentisering',
        preferences: 'Preferanser',
        notifications: 'Varsler',
        notificationsDesc: 'Administrer varsler og påminnelser',
        language: 'Språk',
        languageDesc: 'Norsk (Bokmål)',
        appearance: 'Utseende',
        appearanceDesc: 'Lyst tema',
        staff: 'Ansatt',
        parent: 'Forelder',
        version: 'v1.0.0',
      },
      
      // Navigation
      nav: {
        overview: 'Oversikt',
        checkInOut: 'Sjekk inn/ut',
        settings: 'Innstillinger',
      },
      
      // Relations
      relations: {
        mother: 'Mor',
        father: 'Far',
        guardian: 'Foresatt',
      },
    },
  },
  en: {
    translation: {
      // Common
      appName: 'Henteklar',
      login: 'Log in',
      logout: 'Log out',
      back: 'Back',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      
      // Landing
      landing: {
        tagline: 'For kindergartens',
        title: 'Pick up your child in',
        titleHighlight: '1-2-3',
        subtitle: 'Replace the old Excel sheet with a modern, secure solution. Parents and staff get a complete overview – in seconds.',
        getStarted: 'Get started',
        seeFeatures: 'See features',
        featuresTitle: 'Everything you need, nothing you don\'t',
        featuresSubtitle: 'Designed to be so simple that even grandparents can use it without training.',
        ctaTitle: 'Ready to simplify your day?',
        ctaSubtitle: 'Get started in minutes. No installation, no complicated setup.',
        loginNow: 'Log in now',
        copyright: '© 2024 FrostByte AS. All rights reserved.',
      },
      
      // Features
      features: {
        quickCheckIn: 'Quick check-in/out',
        quickCheckInDesc: 'Check children in and out with one tap. Simple for both parents and staff.',
        secure: 'Safe and secure',
        secureDesc: 'GDPR-compliant solution with secure storage of all information.',
        everywhere: 'Works everywhere',
        everywhereDesc: 'Use on mobile, tablet or PC. Always available when you need it.',
        overview: 'Full overview',
        overviewDesc: 'See who\'s in the kindergarten, contact info and history in one place.',
      },
      
      // Login
      loginPage: {
        subtitle: 'Log in to continue',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        password: 'Password',
        passwordPlaceholder: '••••••••',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        loggingIn: 'Logging in...',
        loginError: 'Wrong email or password',
        fillAllFields: 'Please fill in all fields',
        loginProblems: 'Problems logging in?',
        contactKindergarten: 'Contact the kindergarten',
      },
      
      // Dashboard
      dashboard: {
        title: 'Overview',
        totalChildren: 'Total children',
        checkedIn: 'Checked in',
        checkedOut: 'Picked up',
        allChildren: 'All children',
        searchChildren: 'Search for children...',
        noChildrenFound: 'No children found',
        inSince: 'In since',
        pickedUp: 'Picked up',
        years: 'years',
      },
      
      // Check in/out
      checkInOut: {
        title: 'Check in / out',
        subtitle: 'Tap on a child to change status',
        all: 'All',
        in: 'In',
        out: 'Out',
        checkIn: 'Check in',
        checkOut: 'Check out',
        checkedIn: 'was checked in at',
        checkedOut: 'was checked out at',
        noChildrenFound: 'No children found',
      },
      
      // Child profile
      childProfile: {
        notFound: 'Child not found',
        backToOverview: 'Back to overview',
        inSince: 'In since',
        contactInfo: 'Contact information',
        primary: 'Primary',
        sendEmail: 'Send email',
        quickActions: 'Quick actions',
        editProfile: 'Edit profile',
        viewHistory: 'View history',
      },
      
      // Settings
      settings: {
        title: 'Settings',
        subtitle: 'Manage account and preferences',
        account: 'Account',
        profile: 'Profile',
        profileDesc: 'Edit name and contact info',
        security: 'Security',
        securityDesc: 'Password and two-factor authentication',
        preferences: 'Preferences',
        notifications: 'Notifications',
        notificationsDesc: 'Manage notifications and reminders',
        language: 'Language',
        languageDesc: 'English',
        appearance: 'Appearance',
        appearanceDesc: 'Light theme',
        staff: 'Staff',
        parent: 'Parent',
        version: 'v1.0.0',
      },
      
      // Navigation
      nav: {
        overview: 'Overview',
        checkInOut: 'Check in/out',
        settings: 'Settings',
      },
      
      // Relations
      relations: {
        mother: 'Mother',
        father: 'Father',
        guardian: 'Guardian',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'nb', // Standard språk
    fallbackLng: 'nb',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
