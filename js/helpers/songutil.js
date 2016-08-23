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

var GenreColor = "#FFFFFF"
var SongSpot = -1
var SongOrder = []
var ArtistName = ""
var SongName = ""
var GenreName = ""
var SingleLineSongName = ""
var CompiledSongData = "return {"

var BackgroundWidth = 0
var BackgroundHeight = 0

var SongTextSize = 0.96
var SongNameSizeRatio = 0.6
var ArtistNameActualRatio = 0
var SongNameActualRatio = 0

var Albums = []
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

//Heavily modified from https://github.com/caseif/vis.js/blob/gh-pages/js/util/helper/net/async_helper.js
function LoadSound(Url,ArtistLogo,Album) {
  StartTime = false
  var Request = new XMLHttpRequest()
  Request.open("GET", Url, true)
  Request.responseType = 'arraybuffer'

  Request.onload = () => {
      Context.decodeAudioData(Request.response, function(Buffer) {
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
          AlbumRotations[0] = [0.5*1000,"Open"]
          if (ArtistLogo != null) {
            Preload(ArtistLogo)
            AlbumRotations[AlbumRotations.length] = [15*1000,"Turn",ArtistLogo]
          }
          if (AlbumImageLink != undefined) {
            Preload(AlbumImageLink)
            AlbumRotations[AlbumRotations.length] = [30*1000,"Turn",AlbumImageLink]
            AlbumRotations[AlbumRotations.length] = [TimeLength - (30*1000),"Turn",ArtistLogo]
          }
          if (ArtistLogo != null) {
            AlbumRotations[AlbumRotations.length] = [TimeLength - (15*1000),"Turn"]
          }
          AlbumRotations[AlbumRotations.length] = [TimeLength - (0.5*1000),"Close"]

          var AlbumData = Albums[Album]
          TextCycles[0] = [1000,"Open"]
          if (AlbumData != undefined) {
            var TimeDivision = TimeLength * (1/(AlbumData[1].length + 1))
            for (var i = 0;i < AlbumData[1].length; i++) {
                TextCycles[TextCycles.length] = [TimeDivision * (i + 1),"Change",AlbumData[0],AlbumData[1][i]]
            }
          }
          TextCycles[TextCycles.length] = [TimeLength - 1000,"Close"]

          if (GenreName != "") {
            document.title = "[" + GenreName + "] " + ArtistName + " - " + SongName.replace("<br>"," ").replace("<br/>"," ")
          } else {
            document.title = ArtistName + " - " + SongName.replace("<br>"," ").replace("<br/>"," ")
          }
        	Source.start(0)
      }, function(Message){
        console.log(Message)
      });
  };
  Request.send()
}
//

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
  var SingleLineArtistName = RemoveNewLines(ArtistName)
	GenreName =	SongData[2]
	var FileName = "songs/" + SongData[3]
  var ArtistLogo = SongData[4]
  var Album = SongData[5]

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

  ArtistText.innerHTML = ArtistName
  SongNameText.innerHTML = SongName
	GenreColor = GetColorFromGenre(GenreName)
  CreateNewFleck()

  if (EncodeEnabledByDefault == true) {
    DownloadSongData = true
  } else {
    DownloadSongData = false
  }

  RevertCustomBackgroundChanges()

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

  if (IndluceFileMetadata == true) {
    CompiledSongData = CompiledSongData + "\n\tArtistName = \"" + ArtistName + "\","
    CompiledSongData = CompiledSongData + "\n\tSongName = \"" + SingleLineSongName + "\","
    CompiledSongData = CompiledSongData + "\n\tGenreName = \"" + GenreName + "\","
  }
  if (IndluceRecordMetadata == true) {
    CompiledSongData = CompiledSongData + "\n\tRecordFrequency = " + RecordFrequency + ","
    CompiledSongData = CompiledSongData + "\n\tRecordDownScale = " + RecordDownScale + ","
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
  if (DownloadSongData == true) {
    var ModuleName = ArtistName + "_" + SongName
    CompiledSongData  = '<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4"> <External>null</External> <External>nil</External> <Item class="ModuleScript" referent="RBX040E8D154ACF48B48C3F54832CED08C8"><Properties> <Content name="LinkedSource"><null></null></Content> <string name="Name">' + ModuleName + '</string> <ProtectedString name="Source"><![CDATA[' + CompiledSongData;
    CompiledSongData  = CompiledSongData  + "\n}";
    CompiledSongData  = CompiledSongData +  ']]></ProtectedString> </Properties> </Item> </roblox>';
    var FileName = ArtistName + " - " + SongName + " Exported Song Data.rbxmx"
    download(CompiledSongData, FileName, "text/plain");
  }
  CompiledSongData = "return {"
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
    if (Paused == false && Stopped == false) {
      ForceStop()
    }
  }
}

function InitializeSpectrumHandler() {
  SongOrder = GetRandomTableOfNumbers(Songs.length)
  AudioNode.onaudioprocess = HandleAudio
  Analyser.fftSize = FFTSize
  Analyser.smoothingTimeConstant = 0
  GainNode.gain.value = 0;
  GainNode.connect(Context.destination)
  AudioNode.connect(Context.destination)
  Analyser.connect(AudioNode)
}
