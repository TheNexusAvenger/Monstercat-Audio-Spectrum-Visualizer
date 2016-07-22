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
          Preload("img/monstercatlogo.png")
          Preload(ArtistLogo)


          AlbumRotations[0] = [0.5*1000,"Open"]
          AlbumRotations[1] = [15*1000,"Turn",ArtistLogo]
          if (AlbumImageLink != undefined) {
            Preload(AlbumImageLink)
            AlbumRotations[2] = [30*1000,"Turn",AlbumImageLink]
            AlbumRotations[3] = [TimeLength - (30*1000),"Turn",ArtistLogo]
          }
          AlbumRotations[AlbumRotations.length] = [TimeLength - (15*1000),"Turn"]
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

          document.title = "[" + GenreName + "] " + ArtistName + " - " + SongName.replace("<br>"," ").replace("<br/>"," ")
        	Source.start(0)
      }, function(Message){
        console.log(Message)
      });
  };
  Request.send()
}
//

function AddSong(ArtistName,SongName,GenreName,FileLocation,ArtistFile,AlbumName){
	Songs[Songs.length] = [ArtistName,SongName,GenreName,FileLocation,ArtistFile,AlbumName]
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
  SingleLineSongName = SongName.replace("<br/>"," ").replace("<br>"," ")
	GenreName =	SongData[2]
	var FileName = "songs/" + SongData[3]
  var ArtistLogo = SongData[4]
  var Album = SongData[5]

  var SongLineCount = GetLineCount(SongName) + 1
  var SongNameLines = SongLineCount * SongNameSizeRatio
  ArtistNameActualRatio = SongTextSize / (1 + SongNameLines)
  SongNameActualRatio = (SongTextSize * SongNameSizeRatio) / (1 + SongNameLines)
  var SongTextSizeRatio = (SongTextSize * SongNameSizeRatio * SongNameLines) / (1 + SongNameLines)
  var FromTop = (1 - SongTextSize)/2  * 100
  var ArtistHeight = Math.floor(ArtistNameActualRatio * 100)
  ArtistText.style.top = FromTop + "%"
  ArtistText.style.height = ArtistHeight + "%"
  SongNameText.style.top = (ArtistHeight + FromTop) + "%"
  SongNameText.style.height = Math.floor(SongTextSizeRatio * 100) + "%"

  ArtistText.innerHTML = ArtistName
  SongNameText.innerHTML = SongName
	GenreColor = GetColorFromGenre(GenreName)
  CreateNewFleck()

  DownloadSongData = false

  var SongBackgroundOverride = SongBackgrounds[SingleLineSongName]
  var AlbumBackgroundOverride = AlbumBackgrounds[Album]
  var ArtistBackgroundOverride = ArtistBackgrounds[ArtistName]


  var FullBackgroundData
  if (SongBackgroundOverride) {
    FullBackgroundData = SongBackgroundOverride
  } else if (AlbumBackgroundOverride) {
    FullBackgroundData = AlbumBackgroundOverride
  } else if (ArtistBackgroundOverride) {
    FullBackgroundData = ArtistBackgroundOverride
  }

  RevertCustomBackgroundChanges()
  if (FullBackgroundData) {
    DrawParticles = false
    var BackgroundData = FullBackgroundData[0][Math.floor(Math.random() * FullBackgroundData[0].length)]
    BackgroundImage.src = BackgroundData[0]
    BackgroundWidth = BackgroundData[1]
    BackgroundHeight = BackgroundData[2]
    ColorBackground.style.backgroundColor = BackgroundData[3]

    if (FullBackgroundData[1]) {
      GenreColor = FullBackgroundData[1]
    }

    if (FullBackgroundData[2]) {
      FullBackgroundData[2]()
    }
  } else {
    DrawParticles = true
    BackgroundImage.src = "img/blankpixel.png"
    ColorBackground.style.backgroundColor = "#000000"
  }

  MainDiv.style.display = "none"
  LoadingDiv.style.display = "block"
  document.title = "Loading..."
  LoadingText.innerHTML = "Loading...<br>[" + GenreName + "] " + ArtistName + " - " + SongName.replace("<br>"," ").replace("<br/>"," ")

  if (IndluceFileMetadata == true) {
    CompiledSongData = CompiledSongData + "\n\tArtistName = \"" + ArtistName + "\","
    CompiledSongData = CompiledSongData + "\n\tSongName = \"" + SongName.replace("<br>"," ").replace("<br/>"," ") + "\","
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
  Analyser.smoothingTimeConstant = 0.25;
  GainNode.gain.value = 0;
  GainNode.connect(Context.destination);
  AudioNode.connect(Context.destination);
  Analyser.connect(AudioNode)
}
