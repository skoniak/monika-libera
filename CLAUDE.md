# Monika Libera — portfolio fotografki

## Stos
Next.js 15 (App Router, TypeScript, Tailwind CSS) + Sanity CMS + Cloudflare Pages

## Referencja wizualna
latoyarubyfrazier.com/artworks/ — biały czysty layout, grid kolekcji z tytułami, minimalna nawigacja.

## Różnice vs referencja
- Hover na kolekcji: mleczny biały overlay (opacity ~70%) + tekst opisu wjeżdżający z dołu z opóźnieniem (staggered fade-in, linia po linii)
- Przełącznik trybu pozytyw/negatyw: CSS variables --bg i --text się odwracają, zdjęcia BEZ ZMIAN
- Przełącznik PL/EN
- Panel admina: /studio (Sanity Studio embedded)

## Struktura stron
- / — nazwa + nawigacja + grid kolekcji (główna strona = artworks)
- /bio — rich text z Sanity
- /achievements — rich text z Sanity
- /contact — dane kontaktowe
- /[slug] — galeria kolekcji (PÓŹNIEJ)
- /studio — Sanity Studio

## Kolorystyka
- Tryb pozytyw: tło #FFFFFF, tekst #000000
- Tryb negatyw: tło #000000, tekst #FFFFFF
- Bez dodatkowych kolorów akcentowych — czysty b&w

## Typografia
- Nagłówki: serif (np. Playfair Display lub Cormorant Garamond)
- Body: sans-serif (np. Inter lub system font)
- Nazwa "Monika Libera": duża, serif, uppercase, letter-spacing

## Ważne
- Zdjęcia NIGDY nie odwracają kolorów przy przełączniku trybu
- Grid kolekcji: responsywny, 2 kolumny na mobile, 3 na desktop
- Całość musi działać na Cloudflare Pages (static export lub edge)
- Sanity projectId i dataset podawane przez env variables
- SITE_PASSWORD w env — jeśli ustawiony, middleware wymusza basic auth na wszystkich stronach POZA /studio
- Analytics: Cloudflare Web Analytics (włączane w dashboardzie Cloudflare, zero kodu, zero cookies)
