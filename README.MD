# Dokumentacja Testów - Projekt Playwright dla [https://www.saucedemo.com/](https://www.saucedemo.com/)

## Spis treści

1. [Wprowadzenie](#wprowadzenie)
2. [Plan testów](#plan-testów)
   - [Cele testowania](#cele-testowania)
   - [Techniki testowe i ich znaczenie](#techniki-testowe-i-ich-znaczenie)
   - [Zakres testów](#zakres-testów)
   - [Środowisko testowe i dane testowe](#środowisko-testowe-i-dane-testowe)
   - [Potencjalne zagrożenia](#potencjalne-zagrożenia)
   - [Ramowy harmonogram testów](#ramowy-harmonogram-testów)
   - [Skład zespołu i odpowiedzialności](#skład-zespołu-i-odpowiedzialności)
3. [Techniki testowe - Implementacja](#techniki-testowe---implementacja)
4. [Metryki](#metryki)
5. [Raport z procesu testowego](#raport-z-procesu-testowego)
6. [Demonstracja projektu](#demonstracja-projektu)
7. [Instrukcja uruchomienia testów](#instrukcja-uruchomienia-testów)
8. [Autorzy](#autorzy)

---

## Wprowadzenie

Celem projektu jest automatyzacja testów wybranych funkcjonalności dostępnych na stronie [https://www.saucedemo.com/](https://www.saucedemo.com/). Jest to przykładowa aplikacja e-commerce, umożliwiająca logowanie, przeglądanie produktów, dodawanie ich do koszyka i przechodzenie do procesu zakupowego. Z punktu widzenia procesu testowego najważniejsze są funkcje logowania oraz operacje na koszyku (dodawanie, usuwanie produktów).

---

## Plan testów

### Cele testowania

1. **Cel 1**: Zweryfikować poprawne działanie mechanizmu logowania, w tym obsługę poprawnych i niepoprawnych danych uwierzytelniających.
2. **Cel 2**: Sprawdzić funkcjonalność dodawania, usuwania oraz wyświetlania produktów w koszyku, zapewniając poprawne działanie podstawowych operacji na zasobach.
3. **Cel 3**: Ocenić wydajność aplikacji podczas logowania i dodawania produktów, sprawdzając, czy strona działa w akceptowalnym czasie.

### Techniki testowe i ich znaczenie

1. **Testy ścieżek krytycznych (manualne + automatyczne)**:
   - Pozwalają sprawdzić główne scenariusze użytkownika (logowanie, przeglądanie produktów, dodawanie do koszyka), istotne dla Celów 1 i 2.
2. **Testy oparte na klasach równoważności i analizie wartości brzegowych (automatyczne)**:
   - Zapewniają pokrycie różnorodnych danych wejściowych dla procesu logowania, pomagając zweryfikować reakcję aplikacji na dane poprawne, niepoprawne i brzegowe (Cel 1).
3. **Testy eksploracyjne (manualne)**:
   - Pomagają wykryć nieoczywiste problemy i niestandardowe scenariusze, wpływając na ogólną jakość i stabilność aplikacji (Cele 2 i 3).

### Zakres testów

- **Testy ścieżek krytycznych**: Logowanie poprawne, dodanie produktu do koszyka, usunięcie produktu, weryfikacja ceny i nazwy w koszyku, przejście do checkout.
- **Testy klas równoważności i wartości brzegowych (logowanie)**: Logowanie z poprawnymi danymi, nieistniejącym użytkownikiem, pustym hasłem, pustymi polami, błędnym hasłem dla istniejącego konta.
- **Testy eksploracyjne**: Nietypowe rozmiary okna, sprawdzanie szybkości reakcji pod obciążeniem, zachowanie interfejsu przy próbie szybkiego dodania wielu produktów.

### Środowisko testowe i dane testowe

- **Środowisko**:

  - Node.js, npm zainstalowane lokalnie.
  - Playwright jako narzędzie do testów automatycznych.
  - Publicznie dostępna strona [https://www.saucedemo.com/](https://www.saucedemo.com/).

- **Dane testowe**:
  - Logowanie poprawne: `standard_user / secret_sauce`
  - Logowanie niepoprawne: `invalid_user / wrong_password`
  - Puste pola: brak wprowadzonych danych
  - Produkty: używamy dostępnych produktów na stronie, np. „Sauce Labs Backpack”.

### Potencjalne zagrożenia

1. Zmiany w interfejsie strony (np. zmiana selektorów), utrudniające utrzymanie testów automatycznych.
2. Spadek wydajności lub opóźnienia w ładowaniu strony, wpływające na stabilność testów.

### Ramowy harmonogram testów

- **Tydzień 1**: Przygotowanie środowiska, implementacja testów logowania (testy wartości brzegowych, ścieżki krytyczne).
- **Tydzień 2**: Implementacja testów koszyka (CRUD), testy eksploracyjne, wstępna ocena metryk wydajności.

### Skład zespołu i odpowiedzialności

- **Analityk Testowy (Jan Kowalski)**: Odpowiedzialny za przygotowanie planu testów, wybór technik i metryk oraz analizę wyników.
- **Tester Automatyczny (Anna Nowak)**: Implementacja testów automatycznych w Playwright, utrzymanie kodu testowego.
- **Tester Manualny (Piotr Wiśniewski)**: Testy eksploracyjne, ręczna weryfikacja scenariuszy nieobjętych testami automatycznymi.

---

## Techniki testowe – Implementacja

Zrealizowano dwie spośród zaplanowanych technik w postaci testów automatycznych:

1. **Testy ścieżek krytycznych (critical-path.spec.ts)**:  
   5 testów obejmujących:

   - Poprawne logowanie i weryfikacja listy produktów
   - Dodanie produktu do koszyka
   - Usunięcie produktu z koszyka
   - Weryfikacja ceny i nazwy produktu w koszyku
   - Przejście do checkout i weryfikacja dostępności pól formularza

2. **Testy klas równoważności i wartości brzegowych (equivalence.spec.ts)**:  
   5 testów obejmujących:
   - Logowanie poprawnymi danymi
   - Logowanie z nieistniejącym użytkownikiem
   - Logowanie bez hasła
   - Logowanie bez loginu i hasła
   - Logowanie z poprawnym loginem i błędnym hasłem

Kod testów znajduje się w katalogu `tests/`.

---

## Metryki

- **Metryka aplikacji**: Średni czas renderowania listy produktów po zalogowaniu.

  - Uzasadnienie: Pozwala ocenić wydajność (Cel 3). Jeśli czas jest zbyt długi, użytkownicy doświadczą problemów.

- **Metryka procesu testowego**: Pokrycie testami kluczowych ścieżek funkcjonalnych (np. 100% testów logowania i koszyka zostało zrealizowanych).
  - Uzasadnienie: Pozwala sprawdzić, czy proces testowy skupia się na najważniejszych elementach i czy osiągamy zaplanowaną jakość (Cele 1 i 2).

---

## Raport z procesu testowego

Wyniki testów (po uruchomieniu `npx playwright test`):

- Wszystkie testy klas równoważności i wartości brzegowych dla logowania zakończone sukcesem. Błędy logowania są komunikowane poprawnie.
- Testy ścieżek krytycznych również przebiegły pomyślnie: dodawanie, usuwanie produktów oraz przejście do checkout działa zgodnie z oczekiwaniami.
- Przy wstępnych pomiarach czas ładowania listy produktów po zalogowaniu wynosi ~1 s, co jest akceptowalne.
- Nie wykryto krytycznych defektów.
- Pokrycie krytycznych ścieżek testami automatycznymi wynosi 100% planowanego zakresu.

Podsumowanie: Cele testów zostały osiągnięte, aplikacja działa poprawnie w testowanych obszarach, a proces testowy skoncentrowany był na kluczowych funkcjonalnościach.

---

## Demonstracja projektu

W ramach demonstracji można:

1. Uruchomić testy komendą: `npx playwright test`
2. Obejrzeć raport HTML: `npx playwright show-report` - pojawi się interaktywny raport, w którym można przejrzeć wyniki, screenshoty i nagrania wideo w razie niepowodzeń.
3. Omówić w zespole wyniki testów, metryki oraz wskazać, że kluczowe cele zostały spełnione.

---

## Instrukcja uruchomienia testów

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/UFEQ1337/Testowanie-oprogramowania---K.Paisert.git
   ```

2. Zainstaluj zależności:

   ```bash
   npm install
   npx playwright install
   ```

3. Uruchom testy:

   ```bash
   npx playwright test
   ```

4. Wyświetl raport:
   ```bash
   npx playwright show-report
   ```

Raport zostanie otwarty w przeglądarce, umożliwiając wgląd w szczegółowe wyniki testów.

---

##Autorzy

