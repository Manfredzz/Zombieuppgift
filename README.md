# Zombieuppgift - JavaScript Challenge
Ett kodtest med inriktning på JavaScript

## Uppgiften

En zombie kommer till en by. 
Zombien väljer ett slumpmässigt hus att infektera.
När alla zombies har valt ett hus avslutas rundan. 

Om en zombie valt ett hus som redan är infekterat, så ökas inte antalet zombies för nästa runda. 
Väljer zombien ett hus som inte är infekterat så ökas antalet zombies till nästa runda.

Uppgiften var att ta reda på hur många rundor i snitt som det tar för infektionen att sprida sig igenom hela byn.

Tidsramen för uppgiften är 4 timmar.

## Tankegångar under utvecklingen

Jag har försökt att göra beräkningarna så dynamiska som möjligt. 
Genom att deklarera antalet hus med en variabel och iterera igenom så finns möjligheten att välja 10st hus likväl som 10000st hus. 

