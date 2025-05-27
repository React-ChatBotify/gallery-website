import i18next from 'i18next'; // Changed import
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const i18n = i18next.createInstance(); // Create an instance

async function initializeI18n() {
  // Simplified language detection
  const detectedLng = localStorage.getItem('RCBG_SELECTED_LANGUAGE') || 'en';
  let fetchedNamespaces: string[] = [];

  try {
    const response = await fetch(`/locales/${detectedLng}/index.json`);
    if (response.ok) {
      fetchedNamespaces = await response.json();
    } else {
      console.error(
        `Failed to fetch index.json for language ${detectedLng}. Status: ${response.status}. Using empty namespaces.`
      );
      // Potentially fetch fallbackLng's index.json here if desired
      // For now, fetchedNamespaces remains [] as per instruction
    }
  } catch (error) {
    console.error(`Error fetching index.json for language ${detectedLng}:`, error, '. Using empty namespaces.');
    // fetchedNamespaces remains []
  }

  // If no namespaces were loaded (e.g. index.json missing or empty),
  // it might be good to load at least a 'common' or default namespace if your app has one.
  // For now, we proceed with potentially empty `fetchedNamespaces` as per current logic.

  await i18n
    .use(HttpApi)
    .use(LanguageDetector) // LanguageDetector will override 'lng' if it runs after and detects a different language.
                          // However, we are setting 'lng' explicitly based on our logic.
                          // If LanguageDetector should be the source of truth after initial load,
                          // the 'lng' option might not be needed or its value considered an initial hint.
                          // For this setup, explicit 'lng' is used as per instructions.
    .use(initReactI18next)
    .init({
      lng: detectedLng, // Set the initial language explicitly
      ns: fetchedNamespaces, // Use dynamically fetched namespaces
      fallbackLng: 'en',
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      react: {
        useSuspense: false,
      },
      debug: true, // Or process.env.NODE_ENV === 'development'
    });

  return i18n; // Return the initialized instance
}

export default initializeI18n;
export { i18n }; // Export the instance for use elsewhere
