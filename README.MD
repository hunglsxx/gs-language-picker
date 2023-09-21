### INSTALL
```npm install gs-language-picker```

### EXAMPLES
```
import { LanguagePicker } from '../dist';

const options = {
    apiUrl: 'http://ip-api.com/json', // API URI to get location info, json response
    cookieKey: 'language', // Cookie key
    apiLocationExtractKey: 'countryCode', // Key to extract country code from api
    supportLanguages: { 'VN': 'vi' } // Supported languages you set, with key is country code, value is language
}

let language = new LanguagePicker(options)

// Get language and set it to your cookie
language.getLanguage().then((lang) => {
    console.log(lang);
});

// Set language to your cookie
language.setLanguage('en');
```