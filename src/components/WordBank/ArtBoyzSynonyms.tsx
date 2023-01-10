let artSynonymsDictionary: { [key: number]: string } = {
  0: "Creativity",
  1: "Gifted",
  2: "Visionary",
};

let boyzSynonymsDictionary: { [key: number]: string } = {
  0: "Lads",
  1: "Bruddas",
  2: "Gentlemen",
};

export function RandomSynGen() {
  let synonym =
    artSynonymsDictionary[
      Math.floor(Math.random() * Object.keys(artSynonymsDictionary).length)
    ];

  return synonym;
}

export const ArtSynonym = [
  "Creativity",
  "Gifted",
  "Ingenious",
  "Innovative",
  "Inventive",
  "Original",
  "Productive",
  "Prolific",
  "Visionary",
  "originative",
  "clever",
  "cool",
  "demiurgic",
  "deviceful",
  "fertile",
  "hip",
  "innovational",
  "innovatory",
  "inspired",
  "leading",
  "stimulating",
];
