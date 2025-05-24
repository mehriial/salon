import React, { createContext, useContext, useState, useEffect } from 'react';
import { translationsAz } from './az';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
	const languageMap = {
		1: 'en',
		2: 'az',
		3: 'ru'
	};

	const translations = {
		az: translationsAz,
	};

	const [language, setLanguage] = useState('en');

	useEffect(() => {
		const storedLanguageID = localStorage.getItem('languageId');
		if (storedLanguageID && languageMap[storedLanguageID]) {
			setLanguage(languageMap[storedLanguageID]);
		} else {
			localStorage.setItem('languageId', '1'); 
			setLanguage('en');
		}
	}, []);

	const translate = (key) => {
		if (language === 'az') {
			return translations.az?.[key] || key;
		}
		return key; 
	};

	const switchLanguage = (languageID) => {
		if (languageMap[languageID]) {
			const newLanguage = languageMap[languageID];
			setLanguage(newLanguage);
			localStorage.setItem('languageId', languageID);
		} else {
			console.error(`Language ID ${languageID} is not supported.`);
		}
	};

	return (
		<TranslationContext.Provider value={{ translate, switchLanguage, setLanguage }}>
			{children}
		</TranslationContext.Provider>
	);
};

export const useTranslation = () => {
	const context = useContext(TranslationContext);
	if (!context) {
		throw new Error("useTranslation must be used within a TranslationProvider");
	}
	return context;
};
