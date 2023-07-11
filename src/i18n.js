import { createI18n } from 'vue-i18n'

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};

  locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 2) {
          const locale = matched[1];
          const fileType = matched[2];
          if (!messages[locale]) messages[locale] = {}
          messages[locale][fileType] = locales(key);
      }
  });

  return messages;
}


const i18n = createI18n({
    locale: 'bg',
    fallbackLocale: 'bg',
    messages: loadLocaleMessages(),
})

export default i18n
