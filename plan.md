Card időzités tervezése:
    0. Amikor hozzá adod az új kártyát meg kell nézni hogy az adott naptól számitva azon 
    időtartam után amely a státuszhoz tartozik, van -e már kártya és mennyi.
    Csak Annyi kártyát engedhet hozzá adni amennyi nem több mint a regisztrációkor megadott.

    1. A program minden nap megnézi hogy milyen kártyák vannak az adott dátummal ellátva
    2. A kártyának státuszai vannak pl [1,2,3,4,5].
    3. Minden státuszhoz tartozik egy mától való időtartománya, mondjuk mától 1 hét, 2hét, 1 hónap , 3 hónap
    4. Minden státusz a lejárat végén ha lejárt feldobja az adott szavad,
        => ha tudtad, akkor előre lép egyet a státusz új időtartománnyal;
        => ha nem akkor vissza lép egyet és újra feldobja a szavakat az előző időtartomány után
    5. Ha eléri az 5. státuszkódot akkor
        opt1 => Töröljük,
        opt2 => Bele helyezzük egy táblába ahol a lejárt szavakat tartjuk későbbi   ismétlés gyanánt.
    6. A program nem engedheti tovább az adott usert amig minden szót le nem kezelt aznapra
    7. Ha az user mégsem kezeli le aznapra egyáltalán az aznapi szavakat, akkor újra kell inditani ugyanazt a státuszt. 


 