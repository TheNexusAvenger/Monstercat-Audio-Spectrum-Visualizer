var Context = new AudioContext()
var SampleRate = Context.sampleRate
var Source
var Analyser = Context.createAnalyser();
var GainNode = Context.createGain();
var AudioNode = Context.createScriptProcessor(BufferInterval, 1, 1)

var ArtistText = document.getElementById("Artist")
var SongNameText = document.getElementById("SongName")
var Title = document.getElementById("Title")

var StartTime = 0
var TimeLength = 0
var Playing = false

var Songs = []
var AlbumRotations = []
var NextAlbumRotation = 0
var TextCycles = []
var NextTextCycle = 0
var ArtistLineCount = 0
var SongLineCount = 0

var GenreColor = "#FFFFFF"
var SongSpot = -1
var SongOrder = []
var ArtistName = ""
var SongName = ""
var GenreName = ""
var SingleLineSongName = ""
var SingleLineArtistName = ""

var BackgroundWidth = 0
var BackgroundHeight = 0

var SongTextSize = 0.96
var SongNameSizeRatio = 0.6
var ArtistNameActualRatio = 0
var SongNameActualRatio = 0

var Albums = []
var LPSongNames = []
var AlbumBackgrounds = []
var SongBackgrounds = []
var ArtistBackgrounds = []

var ChangedEnvironments = []
var BaseEnvironments = []

var DefaultTextColor = "#FFFFFF"



function Preload(ImageUrl) {
  var Img = new Image();
  Img.src = ImageUrl;
}

var CachedAudio = []
var MaxCachedURLs = 5
var LastCachedURLs = []
function PushValues(NewValue) {
	var FirstValue = LastCachedURLs [0]
	for (var i = 0; i < MaxCachedURLs - 1; i++) {
		LastCachedURLs[i] = LastCachedURLs[i + 1]
	}
	LastCachedURLs[MaxCachedURLs - 1] = NewValue
	return FirstValue
}

function GetAudioSource(Url,Callback) {
  var ExistingResponse = CachedAudio[Url]
  if (ExistingResponse) {
    if (Callback) {
      Callback(ExistingResponse)
    }
  } else {
    var Request = new XMLHttpRequest()
    Request.open("GET", Url, true)
    Request.responseType = 'arraybuffer'

    Request.onload = () => {
      Context.decodeAudioData(Request.response, function(Buffer) {
        CachedAudio[Url] = Buffer
        var CacheToClear = PushValues(Url)
        if (CacheToClear) {
          CachedAudio[CacheToClear] = null
        }

        if (Callback) {
          Callback(Buffer)
        }
      },function(Message){
        console.log(Message)
      });
    }

    Request.send()
  }
}

function LoadSound(Url,ArtistLogo,Album) {
  StartTime = false

  function Callback(Buffer) {
    Stopped = false
    CreateSourceBuffer()
    Source.buffer = Buffer
    Source.connect(Context.destination)

    TimeLength = Math.round(Buffer.duration * 1000)
    StartTime = Date.now()
    Playing = true

    MainDiv.style.display = "block"
    LoadingDiv.style.display = "none"

    var AlbumImageLink = "img/albums/" + Album +".png"
    Preload(MonstercatLogo.innerHTML)
    if (ArtistLogo != null) {
      Preload(ArtistLogo)
    }
    if (AlbumImageLink != undefined) {
      Preload(AlbumImageLink)
    }
    AlbumImage.src = AlbumImageLink

    var AlbumData = Albums[Album]
    var LPSongNameData = LPSongNames[SongName]

    if (LPSongNameData != null) {
      var StartSong = LPSongNameData[0]
      if (StartSong != null && StartSong[0] == 0) {
        TextCycles[0] = [0,"Open","Song",StartSong[1],StartSong[2]]
      } else {
        TextCycles[0] = [0,"Open","Song",ArtistName,SongName]
      }
    } else {
      TextCycles[0] = [0,"Open","Song",ArtistName,SongName]
    }

    if (LPSongNameData != null) {
      for (var i = 0;i < LPSongNameData.length; i++) {
        var CurrentSong = LPSongNameData[i]
        TextCycles[TextCycles.length] = [CurrentSong[0],"Change","Song",CurrentSong[1],CurrentSong[2]]
      }
    } else if (AlbumData != undefined) {
      var TimeDivision = TimeLength * (1/(AlbumData[1].length + 1))
      for (var i = 0;i < AlbumData[1].length; i++) {
        TextCycles[TextCycles.length] = [TimeDivision * (i + 1),"Change","Album",AlbumData[0],AlbumData[1][i]]
      }
    }

    if (GenreName != "") {
      document.title = "[" + GenreName + "] " + SingleLineArtistName + " - " + SingleLineSongName
    } else {
      document.title = SingleLineArtistName + " - " + SingleLineSongName
    }
    Source.start(0)
  }

  GetAudioSource(Url,Callback)

  var NextSongSpot = SongSpot + 1
  if (NextSongSpot > Songs.length - 1) {
    NextSongSpot = 0
  }
  var NextSongData = Songs[SongOrder[NextSongSpot]]
  GetAudioSource("songs/" + NextSongData[3],function(){})
}



function RemoveNewLines(String) {
  String = String.replace("<br/>"," ")
  String = String.replace("<br>"," ")
  String = String.replace("<Br/>"," ")
  String = String.replace("<Br>"," ")
  String = String.replace("<bR/>"," ")
  String = String.replace("<bR>"," ")
  String = String.replace("<BR/>"," ")
  String = String.replace("<BR>"," ")
  return String
}

function AddSong(ArtistName,SongName,GenreName,FileLocation,ArtistFile,AlbumName){
  if (RemoveNewLines(SongName).toLowerCase().match(SongNameSearch) != null) {
    if (RemoveNewLines(ArtistName).toLowerCase().match(ArtistNameSearch) != null) {
      if (RemoveNewLines(GenreName).toLowerCase().match(GenreNameSearch) != null) {
	       Songs[Songs.length] = [ArtistName,SongName,GenreName,FileLocation,ArtistFile,AlbumName]
       }
    }
  }
}

function GetTableLength(Table) {
	var Total= 0

	for (var i = 0; i < Table.length; i++) {
		if (Table[i] != null) {
			Total ++
		}
	}
	return Total
}

function GetRandomTableOfNumbers(Numbers) {
	var Table = []
	var ValuesLeft = []

	for (var i = 0; i < Numbers; i++) {
		ValuesLeft[i] = i
	}
	while (GetTableLength(ValuesLeft) > 0) {
		var Done = false
		while (Done == false) {
			var Random = Math.floor(Math.random() * Numbers)
			if (ValuesLeft[Random] != null) {
				Done = true
				Table[Table.length] = ValuesLeft[Random]
				ValuesLeft[Random] = null
			}
		}
	}
	return Table
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

function PlayRandomSong(){
  SongSpot++
  if (SongSpot > Songs.length - 1) {
    SongSpot = 0
  }

  var SongData = Songs[SongOrder[SongSpot]]
  ArtistName = SongData[0]
	SongName = SongData[1]
  SingleLineSongName = RemoveNewLines(SongName)
  SingleLineArtistName = RemoveNewLines(ArtistName)
	GenreName =	SongData[2]
	var FileName = "songs/" + SongData[3]
  var ArtistLogo = SongData[4]
  var Album = SongData[5]
  ArtistLineCount = GetLineCount(ArtistName) + 1
  SongLineCount = GetLineCount(SongName) + 1

	GenreColor = "#FFFFFF"

  var SongBackgroundOverride = SongBackgrounds[SingleLineSongName]
  var AlbumBackgroundOverride = AlbumBackgrounds[Album]
  var ArtistBackgroundOverride = ArtistBackgrounds[ArtistName]

  var FullBackgroundData
  if (SongBackgroundOverride) {
    if (SongBackgroundOverride[0]) {
      FullBackgroundData = SongBackgroundOverride[0]
    }
    if (SongBackgroundOverride[1]) {
      GenreColor = SongBackgroundOverride[1]
    }
    if (SongBackgroundOverride[2]) {
      SongBackgroundOverride[2]()
    }
  } else if (AlbumBackgroundOverride) {
    if (AlbumBackgroundOverride[0]) {
      FullBackgroundData = AlbumBackgroundOverride[0]
    }
    if (AlbumBackgroundOverride[1]) {
      GenreColor = AlbumBackgroundOverride[1]
    }
    if (AlbumBackgroundOverride[2]) {
      AlbumBackgroundOverride[2]()
    }
  } else if (ArtistBackgroundOverride) {
    if (ArtistBackgroundOverride[0]) {
      FullBackgroundData = ArtistBackgroundOverride[0]
    }
    if (ArtistBackgroundOverride[1]) {
      GenreColor = ArtistBackgroundOverride[1]
    }
    if (ArtistBackgroundOverride[2]) {
      ArtistBackgroundOverride[2]()
    }
  }

  var FullBackgroundData = [["img/backgrounds/monstercat027animatedbackground.gif",800,450,"rgba(0,0,0,0)"]]

  if (FullBackgroundData) {
    DrawParticles = false
    var BackgroundData = FullBackgroundData[Math.floor(Math.random() * FullBackgroundData.length)]
    BackgroundImage.src = BackgroundData[0]
    BackgroundWidth = BackgroundData[1]
    BackgroundHeight = BackgroundData[2]
    ColorBackground.style.backgroundColor = BackgroundData[3]
  } else {
    DrawParticles = true
    BackgroundImage.src = "img/blankpixel.png"
    ColorBackground.style.backgroundColor = "#000000"
  }

  MainDiv.style.display = "none"
  LoadingDiv.style.display = "block"
  document.title = "Loading..."
  if (GenreName != "") {
    LoadingText.innerHTML = "Loading...<br>[" + GenreName + "] " + SingleLineArtistName + " - " + SingleLineSongName
  } else {
    LoadingText.innerHTML = "Loading...<br>" + SingleLineArtistName + " - " + SingleLineSongName
  }

  NextAlbumRotation = 0
  AlbumRotations = []
  NextTextCycle = 0
  TextCycles = []
	LoadSound(FileName,ArtistLogo,Album)
}

function ForceStop() {
  Playing = false
  Paused = false
  CurrentTimeOffset = 0

  LastFrame = 0
  PlayRandomSong()
}

function CreateSourceBuffer(ExistingBuffer) {
  Source = Context.createBufferSource()
  Source.connect(GainNode)
  Source.connect(Analyser)
  if (ExistingBuffer != null) {
    Source.buffer = ExistingBuffer.buffer
    Source.connect(Context.destination)
  }
  Source.onended = function() {
    if (Paused == false) {
      ForceStop()
    }
  }
}

function InitializeSpectrumHandler() {
  SongOrder = GetRandomTableOfNumbers(Songs.length)
  AudioNode.onaudioprocess = HandleAudio
  Analyser.fftSize = FFTSize
  Analyser.smoothingTimeConstant = 0
  GainNode.connect(Context.destination)
  AudioNode.connect(Context.destination)
  Analyser.connect(AudioNode)
}
