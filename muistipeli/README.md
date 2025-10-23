# 🧠 Muistipeli – JavaScript-projekti

Tämä on selainpohjainen muistipeli, jossa käyttäjä klikkaa kortteja ja yrittää löytää pareja. Projekti on toteutettu HTML:n, CSS:n ja JavaScriptin avulla, ja siihen on lisätty ominaisuuksia kuten pisteytys, ajastin, vaikeustason valinta ja ennätysten tallennus `localStorageen`.

---

## 🔧 Ominaisuudet

- 🎴 Korttien kääntäminen ja parien etsiminen
- 🏆 Pisteytys onnistuneista pareista
- ⏱️ Ajastin, joka käynnistyy pelin alussa
- 🎮 Vaikeustason valinta (helppo, keskitaso, vaikea)
- 💾 Paras tulos ja aika tallennetaan `localStorageen`
- 🔁 Uudelleenkäynnistys painikkeella

---

## 📁 Tiedostorakenne

```
muistipeli/ 
├── index.html 
├── style.css 
└── script.js
```


---

## 🚀 Käynnistys

1. Avaa projekti Visual Studio Codessa
2. Avaa `index.html` selaimessa
3. Valitse vaikeustaso ja paina **Aloita peli**

---

## 📄 HTML-rakenne

- `<select>` vaikeustason valintaan
- `<button>` pelin käynnistämiseen
- `<div id="game-board">` korttien näyttämiseen
- `<span id="score">`, `<span id="timer">`, `<span id="best-score">`, `<span id="best-time">` tulosten näyttämiseen

---

## 🎨 CSS-tyylit

- Flex- ja grid-asettelu pelilaudalle
- Korttien ulkoasu ja kääntymisanimaatio
- Responsiivinen ja selkeä ulkoasu

---

## 🧠 JavaScript-logiikka

- Korttien luonti ja sekoitus
- Klikkauslogiikka ja parien tarkistus
- Pisteiden ja ajan päivitys
- Pelin voiton tunnistus
- Tallennus `localStorageen`:
  - `bestScore`: paras pistemäärä
  - `bestTime`: nopein aika

---

## 📦 localStorage-avainet
```
| Avain        | Kuvaus               |
|--------------|----------------------|
| `bestScore`  | Paras pistemäärä     |
| `bestTime`   | Nopein aika sekunneissa |
```
---

## 🛠️ Kehitysehdotuksia

- ⏳ Aikaraja pelille
- 🔁 Resetointi ilman sivun latausta
- 📊 Pelihistorian tallennus
- 🎨 Korttien animaatiot ja ääniefektit
- 🧩 Lisää vaikeustasoja tai pelimuotoja

---

## 👨‍💻 Tekijä

Toteuttanut: **Antti**  
Tavoitteena oppia fullstack-kehitystä, dokumentointia ja jakaa osaamista GitHubissa.

---

## 📜 Lisenssi

Tämä projekti on avoimen lähdekoodin. Voit käyttää, muokata ja jakaa vapaasti oppimiskäyttöön.

