var SetLastAlbumImage = false
var SetLastAlbumText = false
var CoverSpinSpeed = 200
var TextSpinSpeed = 500

var CurrentLogo = "img/monstercatlogo.png"
function ResetToMonstercatLogo() {
  AlbumImage.src = "img/blankpixel.png"
  MonstercatLogo.src = CurrentLogo
}

function SetToCover(Image) {
  AlbumImage.src = Image
  MonstercatLogo.src = "img/blankpixel.png"
}

function UpdateAlbumCover(CurrentTime,NewLogoSize) {
  var NextAlbum = AlbumRotations[NextAlbumRotation]
  if (NextAlbum != null) {
    var Time = NextAlbum[0]
    var Type = NextAlbum[1]
    var Cover = NextAlbum[2]

    var BeforeRatio = Clamp((Time - CurrentTime)/CoverSpinSpeed)
    var AfterRatio = Clamp((CurrentTime - Time)/CoverSpinSpeed)

    if (Type == "Turn" || Type == "Close") {
      var LogoRatio = EaseSineOut(BeforeRatio)
      var LogoSizeWidth = NewLogoSize * LogoRatio

      AlbumImage.style.width = LogoSizeWidth + "px"
      AlbumImage.style.left = (NewLogoSize - LogoSizeWidth)/2 + "px"

      MonstercatLogo.style.width = LogoSizeWidth*0.7 + "px"
      MonstercatLogo.style.left = (NewLogoSize - LogoSizeWidth)/2 + NewLogoSize*0.15*LogoRatio + "px"
    }

    if (CurrentTime > Time && SetLastAlbumImage == false) {
      SetLastAlbumImage = true
      if (Cover != null) {
        SetToCover(Cover)
      } else {
        ResetToMonstercatLogo()
      }
    }
    if ((Type == "Turn" || Type == "Open") && AfterRatio > 0) {
      var LogoRatio = EaseSineIn(AfterRatio)
      var LogoSizeWidth = NewLogoSize * LogoRatio

      AlbumImage.style.width = LogoSizeWidth + "px"
      AlbumImage.style.left = (NewLogoSize - LogoSizeWidth)/2 + "px"

      MonstercatLogo.style.width = LogoSizeWidth*0.7 + "px"
      MonstercatLogo.style.left = (NewLogoSize - LogoSizeWidth)/2 + NewLogoSize*0.15*LogoRatio + "px"
    }

    if (CurrentTime - CoverSpinSpeed > Time) {
      SetLastAlbumImage = false
      NextAlbumRotation++
    }
  }
}




function GetLineCount(String) {
	String = String.toLowerCase().replace("<br/>","<br>")
	var Count = 0
	var Done = false
	var StringLeft = String
	while (Done == false) {
		var Match = StringLeft.match("<br>")
		if (Match) {
			var Index = Match.index
			StringLeft  = StringLeft .substring(Index + 4)
			Count++
		} else {
			Done = true
		}
	}
	return Count
}

function DisplaySongName(ArtistName,SongName) {
  TextDiv.style.display = "block";
  AlbumTextDiv.style.display = "none";
  ArtistText.innerHTML = ArtistName
  SongNameText.innerHTML = SongName


  var ArtistLineCount = GetLineCount(ArtistName) + 1
  var SongLineCount = GetLineCount(SongName) + 1
  var SongNameLines = SongLineCount * SongNameSizeRatio
  ArtistNameActualRatio = (SongTextSize) / (ArtistLineCount + SongNameLines)
  SongNameActualRatio = (SongTextSize * SongNameSizeRatio) / (ArtistLineCount + SongNameLines)
  var SongTextSizeRatio = (SongTextSize * SongNameSizeRatio * SongNameLines) / (ArtistLineCount + SongNameLines)
  var AristTextSizeRatio = (SongTextSize * ArtistLineCount) / (ArtistLineCount + SongNameLines)
  var FromTop = (1 - SongTextSize)/2  * 100
  var ArtistHeight = Math.floor(AristTextSizeRatio * 100)
  ArtistText.style.top = FromTop + "%"
  ArtistText.style.height = ArtistHeight + "%"
  SongNameText.style.top = (ArtistHeight + FromTop) + "%"
  SongNameText.style.height = Math.floor(SongTextSizeRatio * 100) + "%"
}

function AddZeroToFront(Num) {
  if (Num < 10) {
    return "0" + Num
  } else {
    return Num
  }
}
function DisplaySongList(AlbumName,Song1,Color1,Number1,Song2,Color2,Number2,Song3,Color3,Number3) {
  TextDiv.style.display = "none";
  AlbumTextDiv.style.display = "block";

  AlbumTitleText.innerHTML = AlbumName
  if (Song1) {
    AlbumSongTitle1Text.innerHTML = AddZeroToFront(Number1) + ". " + Song1
    if (Color1 == true) {
      AlbumSongTitle1Text.style["color"] = GenreColor
    } else {
      AlbumSongTitle1Text.style["color"] = DefaultTextColor
    }
  } else {
    AlbumSongTitle1Text.innerHTML = ""
    AlbumSongTitle1Text.style["color"] = DefaultTextColor
  }

  if (Song2) {
    AlbumSongTitle2Text.innerHTML = AddZeroToFront(Number2) + ". " + Song2
    if (Color2 == true) {
      AlbumSongTitle2Text.style["color"] = GenreColor
    } else {
      AlbumSongTitle2Text.style["color"] = DefaultTextColor
    }
  } else {
    AlbumSongTitle2Text.innerHTML = ""
    AlbumSongTitle2Text.style["color"] = DefaultTextColor
  }

  if (Song3) {
    AlbumSongTitle3Text.innerHTML = AddZeroToFront(Number3) + ". " + Song3
    if (Color3 == true) {
      AlbumSongTitle3Text.style["color"] = GenreColor
    } else {
      AlbumSongTitle3Text.style["color"] = DefaultTextColor
    }
  } else {
    AlbumSongTitle3Text.innerHTML = ""
    AlbumSongTitle3Text.style["color"] = DefaultTextColor
  }
}

function UpdateAlbumText(CurrentTime,NewWidth) {
  var NextAlbum = TextCycles[NextTextCycle]
  if (NextAlbum != null) {
    var Time = NextAlbum[0]
    var Type = NextAlbum[1]
    var NextDataType = NextAlbum[2]
    var AlbumName = NextAlbum[3]
    var SongList = NextAlbum[4]

    var BeforeRatio = Clamp((Time - CurrentTime)/TextSpinSpeed)
    var AfterRatio = Clamp((CurrentTime - Time)/TextSpinSpeed)

    if (Type == "Change" || Type == "Close") {
      var TextWidth = (NewWidth * BeforeRatio)

      TextDiv.style.width = TextWidth + "px"
      AlbumTextDiv.style.width = TextWidth + "px"
    }
    if (CurrentTime > Time && SetLastAlbumText == false) {
      SetLastAlbumText = true
      if (NextDataType == "Album") {
        var Song1 = SongList[0]
        var Song2 = SongList[1]
        var Song3 = SongList[2]
        var Color1 = (Song1[1] == SingleLineSongName)
        var Color2
        var Color3
        var Song1Name = Song1[1]
        var Song2Name
        var Song3Name
        var Song1Number = Song1[0]
        var Song2Number
        var Song3Number
        if (Song2 != null) {
          Color2 = (Song2[1] == SingleLineSongName)
          Song2Name = Song2[1]
          Song2Number= Song2[0]
        }
        if (Song3 != null) {
          Color3 = (Song3[1] == SingleLineSongName)
          Song3Name = Song3[1]
          Song3Number = Song3[0]
        }
        DisplaySongList(AlbumName,Song1Name,Color1,Song1Number,Song2Name,Color2,Song2Number,Song3Name,Color3,Song3Number)
      } else if (NextDataType == "Song") {
        DisplaySongName(NextAlbum[3],NextAlbum[4])
      }
    }
    if ((Type == "Change" || Type == "Open") && AfterRatio > 0) {
      var TextWidth = (NewWidth * AfterRatio)

      TextDiv.style.width = TextWidth + "px"
      AlbumTextDiv.style.width = TextWidth + "px"
    }

    if (CurrentTime - TextSpinSpeed > Time) {
      SetLastAlbumText = false
      NextTextCycle++
    }
  }
}
