//Colors from https://github.com/caseif/vis.js/blob/gh-pages/js/util/helper/genre_helper.js
var MainColors = {
  //Actual colors
  'Trap': '#820028',
  'Drumstep': '#E20386',
  'Drum & Bass': '#E10304',
  'Trance': '#0584E3',
  'Electro': '#E2D904',
  'House': '#E28C06',
  'Hardcore': '#0DB104',
  'Glitch Hop': '#19925B',
  'Post Disco': '#29B8B2',
  'Dubstep': '#8D03E2',
  'Future Bass': '#9999FB',
  'EDM': '#C2C1C2',

  //Custom colors
  'Chillout': '#F4C2C2',
  'Rock': '#B4D7BF',
  'Pop': '#B3E234',
};

var OtherColors = {
    'Trip Hop': 'Trap',

    'Neurofunk': 'Drum & Bass',
    'Techstep': 'Drum & Bass',

    'Bass House': 'Electro House',
    'Big Room House': 'Electro House',
    'Bounce': 'Electro House',
    'Complextro': 'Electro House',
    'Outrun': 'Electro House',

    'Bounce': 'Electro',

    'Electro Swing': 'House',

    'Freeform': 'Hardcore',
    'Hard Dance': 'Hardcore',

    'Moombah': 'Glitch Hop',
    'Neurohop': 'Glitch Hop',

    'Hardstyle': 'Trance',
    'Nu Style': 'Trance',

    'Electro Soul': 'Post Disco',
    'Indie Dance': 'Post Disco',
    'Nu Disco': 'Post Disco',
    'Synthwave': 'Post Disco',

    'Brostep': 'Dubstep',
    'Garage': 'Dubstep',
    'Neurostep': 'Dubstep',
    'Riddim': 'Dubstep',

    'Nu Funk': 'Breaks',

    'Downtempo': 'Chillout',

    'Neofolk': 'Rock',

    'Industrial': 'EDM',
    'Breaks': 'EDM',
};

for (var Key in OtherColors) {
  MainColors[Key] = MainColors[OtherColors[Key]]
}

function GetColorFromGenre(Genre) {
  if (Genre != null) {
    Genre = Genre.toLowerCase()
    for (var Key in MainColors) {
      if (Genre.indexOf(Key.toLowerCase()) != -1) {
        return MainColors[Key]
      }
    }
  }

  return MainColors["EDM"]
}
