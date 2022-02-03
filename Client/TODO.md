# 1. Aplikacja ma składać się z kilku ekranów (okien), za pomocą których użytkownik będzie mógł realizować operacje na danych tabel ze schematu relacyjnego, na którym działa aplikacja.
# 2. Uwaga! Aplikacja powinna obsługiwać cały schemat. Oznacza to, że nie jest dopuszczalna sytuacja, w której pewne operacje (np. dodanie danych do jakiejś relacji) musi zostać wykonane poza aplikacją (np. przez uruchomienie polecenia SQL w edytorze SQL). Mogą istnieć odstępstwa od tej reguły (np. tabela wypełniana automatycznie przez procedurę wyzwalaną), jednak wymagane jest przedstawienie uzasadnienia.
# 3. Ekran aplikacji ma zostać wyposażony w mechanizmy, pozwalające użytkownikowi ma wykonywanie operacji na danych, takie jak:
    + wyświetlanie i przeglądanie danych,
    + wyszukiwanie danych – możliwość wprowadzania wzorca poszukiwanej informacji,
    + dodawanie danych,
    + modyfikacja danych,
    + usuwanie danych.
# 4. Uwaga! Ekran nie musi oferować wszystkich operacji – np. ekran typu "raport" jedynie prezentuje dane, nie pozwalając na ich edycję, z kolei ekran typu "formularz" pozwala definiować nowe dane i edytować dane istniejące, itd.
# 5. Formularz (ekran pozwalający na definicję i modyfikację danych) ma wspomagać użytkownika w procesie definiowania czy modyfikowania danych, podpowiadając użytkownikowi wartości dostępne dla określonego pola. Np. przy edycji danych pracownika (relacja Pracownicy) dostarczenie listy zespołów (z relacji Zespoly), do których pracownik może zostać przypisany, listy etatów, na których pracownik może zostać zatrudniony, itd.
# 6. Formularz ma kontrolować poprawność edytowanych przez użytkownika danych z punktu widzenia ograniczeń integralnościowych, zdefiniowanych w bazie danych, takich jak:
    + kontrola obecności określonych danych (np. wymuszenie podania nazwiska przy definiowaniu danych nowego pracownika),
    + kontrola wartości wpisywanych w polach (np. sprawdzanie zgodności wpisanej do pola wartości z wartościami dopuszczalnymi dla kolumny relacji, z którą pole jest skojarzone),
    + kontrola unikalności rekordów (klucz podstawowy i klucz unikalny),
    + kontrola usuwania rekordów (klucz obcy),
    itd.
# 7. Uwaga! Należy unikać prezentowania użytkownikowi aplikacji komunikatów systemowych (np. "ORA-00001: naruszono więzy unikatowe" przy definiowaniu danych, naruszających klucz podstawowy). Zamiast tego, w sytuacji wystąpienia błędu, aplikacja powinna prezentować komunikat zrozumiały dla użytkownika "naiwnego" ("Próbujesz zdefiniować zespół, którego nazwa jest identyczna z nazwą już istniejącego zespołu").
# 8. Przy definiowaniu nowych danych formularz ma korzystać z mechanizmów systemu bazy danych, wspomagających generowanie wartości dla kolumn numerycznych będących kluczami podstawowymi (czyli np. z sekwencji w OracleDB, itd.).
# 9. Utworzone w bazie danych podprogramy składowane mają być wywoływane z chociaż jednego ekranu aplikacji (w przypadku funkcji jej wynik ma zostać zaprezentowany w ramach danych ekranu).
# 10. Nie ma żadnych ograniczeń jeśli chodzi o wykorzystywane przy budowaniu aplikacji technologie (może to być aplikacja webowa, mobilna, desktopowa, ...).
# 11. Zadania projektowe dotyczące aplikacji są następujące: