import fetch from 'node-fetch';
import Cookies from 'js-cookie';


export interface LanguagePickerConfig {
    apiUrl?: string;
    apiLocationExtractKey?: string;
    cookieKey?: string;
    supportLanguages?: any
}

export class LanguagePicker {
    private _apiUrl: string;
    private _cookieKey: string;
    private _apiLocationExtractKey: string;
    private _supportLanguages: any;

    constructor(config: LanguagePickerConfig = {}) {
        this._apiUrl = config.apiUrl || 'http://ip-api.com/json';
        this._cookieKey = config.cookieKey || 'language';
        this._apiLocationExtractKey = config.apiLocationExtractKey || 'countryCode';
        this._supportLanguages = config.supportLanguages || { 'VN': 'vi' }
    }

    public async getLanguage(): Promise<any> {
        let language: any = Cookies.get(this._cookieKey);
        if (language) return language;

        language = navigator.language || window.navigator.language || 'en';

        try {
            const response: any = await (await fetch(this._apiUrl)).json();
            const countryCode = response[this._apiLocationExtractKey];
            if (this._supportLanguages[countryCode]) {
                language = this._supportLanguages[countryCode];
            }
        } catch (error) {
            console.error(error);
        } finally {
            Cookies.set(this._cookieKey, language);
            return language;
        }
    }

    public setLanguage(language: string) {
        try {
            Cookies.set(this._cookieKey, language);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}