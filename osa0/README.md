osan 0 tehtävien vastaukset:

**0.4:**

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP 200 OK (uusi muistiinpano tallennettu)
    deactivate server

    Note right of browser: Käyttäjä kirjoittaa uuden muistiinpanon ja painaa Tallenna-nappia
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: Päivitetty HTML-dokumentti (sisältää uuden muistiinpanon)
    deactivate server

    Note right of browser: Sivu päivitetään ja näyttää nyt uuden muistiinpanon

--------------------------------------------------------------------------------------
**0.5:**

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: SPA-sovelluksen HTML-sivu
    deactivate server

    Note right of browser: Käyttäjä siirtyy osoitteeseen https://studies.cs.helsinki.fi/exampleapp/spa

    Note right of browser: SPA-sovellus alustetaan selaimessa ja hakee tarvittavat resurssit

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: SPA-sovelluksen JavaScript-koodi
    deactivate server

    Note right of browser: SPA-sovellus lataa JavaScript-koodin

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON-muotoiset muistiinpanot
    deactivate server

    Note right of browser: SPA-sovellus hakee muistiinpanot JSON-muodossa

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS-tyylitiedosto
    deactivate server

    Note right of browser: SPA-sovellus lataa CSS-tyylitiedoston

    Note right of browser: SPA-sovellus piirtää muistiinpanot käyttöliittymään




