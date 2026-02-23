class TranslationEntry {
  #lang;
  #text;
  constructor(lang, text) {
    this.#lang = lang;
    this.#text = text;
  }
  get lang() {
    return this.#lang;
  }
  get text() {
    return this.#text;
  }
}

class Translation {
  #key;
  #entries;
  constructor(key, entries) {
    this.#key = key;
    this.#entries = entries.map((e) =>
      new TranslationEntry(e.lang, e.text));
  }
  get key() {
    return this.#key;
  }
  get entries() {
    return this.#entries;
  }
  getText(lang) {
    return this.#entries.find((e) => e.lang === lang).text;
  }
  getTranslation(text) {
    return this.#entries.find((e) => e.text !== text).text;
  }
}

class Translator {
  #translations;
  #translationKeys;
  constructor(data = undefined) {
    if (!data) return;
    this.#translations = data.map((t) =>
      new Translation(t.key, t.entries));
    this.#translationKeys = this.#translations.map((t) => t.key);
  }
  applyData(data) {
    if (!data || this.#translations) return;
    this.#translations = data.map((t) => new Translation(t.key, t.entries));
    this.#translationKeys = this.#translations.map((t) => t.key);
  }
  getText(key, lang) {
    if (!key || !lang) return;
    if (this.#translationKeys && this.#translationKeys.includes(key))
      return this.#getTranslation(key).getText(lang);
  }
  getTranslation(key, text) {
    if (!key || !text) return;
    if (this.#translationKeys && this.#translationKeys.includes(key)) {
      return this.#getTranslation(key).getTranslation(text);
    }
  }
  #getTranslation(key) {
    if (key && this.#translationKeys && this.#translationKeys.includes(key)) {
      return this.#translations.find((t) => t.key === key);
    }
  }
}


const uiLanguages = [];
const uiTranslator = new Translator();

function fetchUiTranslations(data) {
  uiTranslator.applyData(data.translations);
  for (var l in data.languages)
    uiLanguages.push(l);
  console.log("UI translations loaded!");
}
function getUiTranslation(key, lang = undefined) {
  if (!lang) lang = uiLanguages[0];
  return uiTranslator.getText(key, lang);
}
function translateUiText(key, text) {
  return uiTranslator.getTranslation(key, text);
}
