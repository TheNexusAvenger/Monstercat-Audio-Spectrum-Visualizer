function ChangeTextColor(Color){
  ArtistText.style.color = Color
  SongNameText.style.color = Color
  LeftText.style.color = Color
  RightText.style.color = Color
  LoadingText.style.color = Color
  AlbumTitleText.style.color = Color
  AlbumSongTitle1Text.style.color = Color
  AlbumSongTitle2Text.style.color = Color
  AlbumSongTitle3Text.style.color = Color
  Link1.style.color = Color
  Link2.style.color = Color
  DefaultTextColor = Color
}

function RevertCustomBackgroundChanges() {
  for (var i = 0; i < ChangedEnvironments.length; i++) {
    var Changed = ChangedEnvironments[i]
    if (Changed == "TextColor") {
      ChangeTextColor("#FFFFFF")
    } else if (Changed == "ShadowBlur") {
      ShadowBlur = BaseEnvironments["ShadowBlur"]
    } else if (Changed == "BackgroundShadows") {
      ColorBackground.style["box-shadow"] = "none"
    } else if (Changed == "MonstercatColorFilter") {
      MonstercatLogo.style["-webkit-filter"] = "none"
    }
  }
  ChangedEnvironments = []
}

function RegisterBackground(Name,Type,Backgrounds,Color,ChangeFunction) {
  if (Type == "Album") {
    AlbumBackgrounds[Name] = [Backgrounds,Color,ChangeFunction]
  } else if (Type == "Artist") {
    ArtistBackgrounds[Name] = [Backgrounds,Color,ChangeFunction]
  } else {
    SongBackgrounds[Name] = [Backgrounds,Color,ChangeFunction]
  }
}






function KarmaFieldsEnvironmentChanges() {
  BaseEnvironments["ShadowBlur"] = ShadowBlur
  ChangedEnvironments[0] = "ShadowBlur"
  ShadowBlur = 0
  ChangedEnvironments[1] = "TextColor"
  ChangeTextColor("#000000")
  ChangedEnvironments[2] = "BackgroundShadows"
  ColorBackground.style["box-shadow"] = "inset 0 0 30em rgba(0,0,0,0.5)"
}

function PureWhiteEnvironmentChanges() {
  MonstercatLogo.style["-webkit-filter"] = "invert(100%)"
  ChangedEnvironments[0] =  "MonstercatColorFilter"
}

RegisterBackground("Karma Fields","Artist",[["img/blankpixel.png",3840,2160,"#E8E8E8"]],"#000000",KarmaFieldsEnvironmentChanges)
RegisterBackground("Tristam X Karma Fields","Artist",[["img/blankpixel.png",3840,2160,"#E8E8E8"]],"#000000",KarmaFieldsEnvironmentChanges)

RegisterBackground("Blackout","Song",[["img/backgrounds/blackoutbackground.png",1920,1080,"rgba(0,0,0,0)"]],"#FFFFFF",PureWhiteEnvironmentChanges)
RegisterBackground("pinkcloudep","Album",[["img/backgrounds/pinkcloudbackground1.jpg",3840,2160,"rgba(0,0,0,0.5)"],["img/backgrounds/pinkcloudbackground2.jpg",3840,2160,"rgba(0,0,0,0.5)"],["img/backgrounds/pinkcloudbackground3.jpg",3840,2160,"rgba(0,0,0,0.5)"]],"#F6B4D9")
RegisterBackground("pinkcloudtheremixes","Album",[["img/backgrounds/pinkcloudbackground1.jpg",3840,2160,"rgba(0,0,0,0.5)"],["img/backgrounds/pinkcloudbackground2.jpg",3840,2160,"rgba(0,0,0,0.5)"],["img/backgrounds/pinkcloudbackground3.jpg",3840,2160,"rgba(0,0,0,0.5)"]],"#F6B4D9")
RegisterBackground("thelosttracksep","Album",[["img/backgrounds/thelosttracksbackground.png",1920,1080,"rgba(0,0,0,0)"]],null)

RegisterBackground("Lift You Up (feat. EMEL)","Song",[["img/backgrounds/liftyouupbackground.png",1920,1080,"rgba(0,0,0,0)"]],"#FFFFFF",PureWhiteEnvironmentChanges)
