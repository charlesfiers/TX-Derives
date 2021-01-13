/* === Helpers contenant la base de mots, en format json === */

export default base_de_mots = {
  V : [
    ["s'ouvre", "tremble", "perce", "éclate", "s'étend", "gronde", "s'étire", "s'avance"],
    ["endosses", "chausses", "franchis"],
    {stationnary : ["flâneur"], walking : ["battant"], running : ["chahutant"], cycling : ["dévalant"], in_vehicle : ["floutant"]},
    {stationnary : ["crépite"], walking : ["remue", "bruit"], running : ["s'ébroue"], cycling : ["défile"], in_vehicle : ["disparaît"]},
    ["croît", "s'entête", "persiste"],
    ["tiédissent", "sourient", "valsent"],
    {stationnary : ["monte"], walking : ["grimpe"], running : ["se soulève"], cycling : ["te fouette"], in_vehicle : ["te transperce"]},
    ["s'enfonce", "résonne", "exulte"],
    {stationnary : ["es immobile"], walking : ["marches"], running : ["cours"], cycling : ["roules"], in_vehicle : ["fuses"]},
  ],
  N : [
    {rural : ["Le chemin", "La terre", "La campagne"], urbain : ["La ville", "La route", "Le trottoir"]},
    ["rumeurs", "nuées", "légendes"],
    {printemps : ["le printemps"], automne : ["l'automne"], hiver : ["l'hiver"], été : ["l'été"]},
    {cold : ["fraîcheur"], sweet : ["douceur"], hot : ["chaleur"]}, // à modifier selon weather_description
    ["la fatigue", "le silence", "le sommeil"],
    {rural : ["bêtes"], urbain : ["pierres"]},
    ["monde", "chant", "pays"],
    ["murmure", "chantier"],
    {rural : ["herbes"], urbain : ["rues"]},
    ["sol", "ciel"],
    ["les racines", "la graine"],
    {rural : ["arbres", "champs"], urbain : ["toits", "ponts"]},
    ["mains", "jambes"],
  ],
  G : [
    {rural : ["de blé"], urbain : ["d'acier"]},
  ],
  A : [
    ["rousseur", "clameur"],
    ["plein", "ébahi", "au bord"],
    {stationnary : ["très lentement"], walking : ["lentement"], running : ["soudainement"], cycling : ["brusquement"], in_vehicle : ["succintement"]},
  ],
}
