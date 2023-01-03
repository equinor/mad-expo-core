import { Settings } from "luxon";
import en from "./en.json";
import no from "./no.json";

export type DictionaryObject = typeof en;

const dictionaries: Record<string, DictionaryObject> = {
  en,
  no,
};

let language = "";
export function setLanguage(languageCode : string){
  Settings.defaultLocale = languageCode;
  language = languageCode;
}

export function getLanguage(){
  return language;
}

export function dictionary(key: keyof DictionaryObject) {
  if(!language){
    console.error("Language not set");
    return dictionaries.en[key] || key;
  }

  const str = dictionaries[language][key];
  if (!str) {
    console.error(`"${key}" for language "${language}" is not defined`);
      return dictionaries.en[key] || key;
    } 
  
  return str;

}
