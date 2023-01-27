/*Question 2- Créez la base de données TP4_Livraison en implémentant le schéma relationnel de la
Question 1 en utilisant le système de gestion de base de données PostgreSQL. Enregistrez votre code
SQL dans le fichier TP4_Livraison.sql. (6pts)*/

DROP SCHEMA IF EXISTS BD_TP4 CASCADE;
CREATE SCHEMA BD_TP4;

CREATE TABLE IF NOT EXISTS BD_TP4.Client (
    numeroclient        SERIAL          NOT NULL, 
    nomclient           VARCHAR(20),
    prenomclient        VARCHAR(20),
    adressecourriel     VARCHAR(45),
    rueclient           VARCHAR(25),
    villeclient         VARCHAR(25),
    cpclient            VARCHAR(8),
    PRIMARY KEY(numeroclient)
);

CREATE TABLE IF NOT EXISTS BD_TP4.Telephone (
    numerodetelephone   VARCHAR(20),
    numeroclient        SERIAL          NOT NULL,
    PRIMARY KEY(numeroclient,numerodetelephone),
    FOREIGN KEY(numeroclient) REFERENCES BD_TP4.Client(numeroclient) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Fournisseur (
    numerofournisseur       SERIAL      NOT NULL,
    nomfournisseur          VARCHAR(20),
    adressefournisseur      VARCHAR(60),
    PRIMARY KEY (numerofournisseur)
);

CREATE TABLE IF NOT EXISTS BD_TP4.Planrepas (
    numeroplan              SERIAL          NOT NULL,
    categorie               VARCHAR(10),
    frequence               INTEGER         CHECK (frequence > 0),
    nbrpersonnes            INTEGER         CHECK (nbrpersonnes > 0), 
    nbrcalories             INTEGER         CHECK (nbrcalories > 0), 
    prix                    NUMERIC         CHECK (prix >=0),
    numerofournisseur       SERIAL          NOT NULL,
    PRIMARY KEY(numeroplan),
    FOREIGN KEY(numerofournisseur) REFERENCES BD_TP4.Fournisseur(numerofournisseur) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Abonner (
    numeroclient        SERIAL          NOT NULL,
    numeroplan          SERIAL          NOT NULL,
    duree               NUMERIC(6,3)    NOT NULL,
    PRIMARY KEY (numeroclient, numeroplan),
    FOREIGN KEY (numeroclient) REFERENCES BD_TP4.Client(numeroclient) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (numeroplan) REFERENCES BD_TP4.Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Vegetarien (
    numeroplan          SERIAL          NOT NULL,
    typederepas         VARCHAR(15),
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES BD_TP4.Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Pescetarien (
    numeroplan          SERIAL          NOT NULL,
    typepoisson         VARCHAR(15),
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES BD_TP4.Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Famille (
    numeroplan          SERIAL          NOT NULL,
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES BD_TP4.Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Rapide (
    numeroplan          SERIAL          NOT NULL,
    tempsdepreparation  INTEGER         CHECK (tempsdepreparation > 0),
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES BD_TP4.Famille(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Facile (
    numeroplan          SERIAL          NOT NULL,
    nbringredients      INTEGER         CHECK (nbringredients > 0),
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES BD_TP4.Famille(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Kitrepas (
    numerokitrepas      SERIAL          NOT NULL,
    descriptionkit      VARCHAR(50),
    numeroplan          SERIAL          NOT NULL,
    PRIMARY KEY (numerokitrepas),
    FOREIGN KEY (numeroplan) REFERENCES BD_TP4.Planrepas(numeroplan) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Etape (
    numerokitrepas          SERIAL      NOT NULL,
    descriptionetape        VARCHAR(50),
    dureeetape              NUMERIC(6,3) CHECK (dureeetape > 0),
    numerokitrepasetape     SERIAL      NOT NULL,
    PRIMARY KEY (numerokitrepas),
    FOREIGN KEY (numerokitrepas) REFERENCES BD_TP4.Kitrepas(numerokitrepas) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Image (
    numeroimage         SERIAL          NOT NULL,
    donnees             VARCHAR(50),
    numerokitrepas      SERIAL          NOT NULL,
    PRIMARY KEY (numeroimage),
    FOREIGN KEY (numerokitrepas) REFERENCES BD_TP4.Kitrepas(numerokitrepas) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS BD_TP4.Ingredient (
    numeroingredient    SERIAL          NOT NULL,
    nomingredient       VARCHAR(20),
    paysingredient      VARCHAR(20),
    PRIMARY KEY (numeroingredient)
);

CREATE TABLE IF NOT EXISTS BD_TP4.Contenir (
    numerokitrepas          SERIAL      NOT NULL,
    numeroingredient        SERIAL      NOT NULL,
    PRIMARY KEY (numerokitrepas, numeroingredient),
    FOREIGN KEY (numerokitrepas) REFERENCES BD_TP4.Kitrepas(numerokitrepas) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (numeroingredient) REFERENCES BD_TP4.Ingredient(numeroingredient) ON DELETE CASCADE ON UPDATE CASCADE
);

/*Question 3- Peuplez la base de données TP4_Livraison en ajoutant des informations pertinentes aux
tables soient deux tuples par table. Enregistrez votre code SQL dans le même fichier TP4_Livraison.sql
après les requêtes de création des tables. (3pts)*/
/*A refaire*/

INSERT INTO BD_TP4.Client VALUES(DEFAULT,'Dufour','Benjamin','benjamin.dufour@gmail.com','14 Avenue Mont-Royal','Montréal','H2T 1N4');
INSERT INTO BD_TP4.Client VALUES(DEFAULT,'Crossing','Elisabeth','elisabeth.crossing@outlook.com','15 Avenue Mont-Royal','Montréal','H2T 1N4');

INSERT INTO BD_TP4.Telephone VALUES('+1 819 555 5555',1);
INSERT INTO BD_TP4.Telephone VALUES('+1 800 000 0000',2);

INSERT INTO BD_TP4.Fournisseur VALUES(DEFAULT,'QC Transport','28 avenue Mont-Royal, H2T 1N4, Montréal');
INSERT INTO BD_TP4.Fournisseur VALUES(DEFAULT,'Benjamin','9144 Orange Street, Brooklyn, 11215, New York');

INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Coréen',2,4,940,22,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Français',1,6,800,27,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Italien',1,8,650,29,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Grec',1,4,458,24,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Français',1,6,789,19,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Français',1,6,750,22,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Portugais',1,6,410,15,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Mexicain',1,6,616,30,1);
INSERT INTO BD_TP4.Planrepas VALUES(DEFAULT,'Turc',1,6,902,29,1);

INSERT INTO BD_TP4.Abonner VALUES(2,1,6);
INSERT INTO BD_TP4.Abonner VALUES(2,2,10);
INSERT INTO BD_TP4.Abonner VALUES(1,1,8);
INSERT INTO BD_TP4.Abonner VALUES(1,9,9);

INSERT INTO BD_TP4.Vegetarien VALUES(9,'Méditerranéen');
INSERT INTO BD_TP4.Vegetarien VALUES(8,'Mexicain');

INSERT INTO BD_TP4.Pescetarien VALUES(2,'Tilapia');
INSERT INTO BD_TP4.Pescetarien VALUES(4,'Thon');

INSERT INTO BD_TP4.Famille VALUES(5);
INSERT INTO BD_TP4.Famille VALUES(6);
INSERT INTO BD_TP4.Famille VALUES(7);
INSERT INTO BD_TP4.Famille VALUES(8);

INSERT INTO BD_TP4.Rapide VALUES(5,25);
INSERT INTO BD_TP4.Rapide VALUES(6,30);

INSERT INTO BD_TP4.Facile VALUES(7,5);
INSERT INTO BD_TP4.Facile VALUES(8,6);

INSERT INTO BD_TP4.Kitrepas VALUES(DEFAULT,'Kit du plat coréen',1);
INSERT INTO BD_TP4.Kitrepas VALUES(DEFAULT,'Kit du plat italien',3);

INSERT INTO BD_TP4.Etape VALUES(DEFAULT,'Decouper les aliments',5,1);
INSERT INTO BD_TP4.Etape VALUES(DEFAULT,'Faire mijoter la préparation',60,2);

INSERT INTO BD_TP4.Image VALUES(DEFAULT,'Aliments du Kit 1',1);
INSERT INTO BD_TP4.Image VALUES(DEFAULT,'Aliments du Kit 2',2);

INSERT INTO BD_TP4.Ingredient VALUES(DEFAULT,'Tomate','Espagne');
INSERT INTO BD_TP4.Ingredient VALUES(DEFAULT,'Celeri','France');

INSERT INTO BD_TP4.Contenir VALUES(1,1);
INSERT INTO BD_TP4.Contenir VALUES(2,2);
