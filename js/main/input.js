//Cookie functions from http://www.w3schools.com/js/js_cookies.asp
function SetCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + "; "
}

function GetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

var Paused = false
var Stopped = false
var Volume = StartVolume
var PausedAt = 0
var CurrentTimeOffset = 0
var TimePausedAt = 0
var DownloadSongData = false
var LastDisplayed = 0
DisplayTime = DisplayTime * 1000

function UpdateVolume() {
  GainNode.gain.value = (Volume/100) - 1
  SetCookie("volume",Volume.toString())
}

function BoolToText(Bool) {
  if (Bool == true) {
    return "Yes"
  } else {
    return "No"
  }
}

function UpdateTextVisibility() {
  var EndTimeRatio = (LastDisplayed - Date.now() + DisplayTime)/(500)
  LowerTextDiv.style.opacity = EndTimeRatio
}

function UpdateText() {
  if (EncodingEnabled == true) {
    LeftText.innerHTML = "&nbsp;Press O to Skip and P to Pause<br>&nbsp;Export Data (E): " + BoolToText(DownloadSongData) + "<br>&nbsp;Volume (Arrow Keys): " + Volume + "%"
  } else {
    LeftText.innerHTML = "<br>&nbsp;Press O to Skip and P to Pause<br>&nbsp;Volume (Arrow Keys): " + Volume + "%"
  }
  UpdateTextVisibility()
}

Body.addEventListener("mousemove", function(Key) {
  LastDisplayed = Date.now()
  UpdateText()
})

Body.addEventListener("keydown", function(Key) {
  if (Playing == true) {
    var KeyCode = Key.code
    if (KeyCode == "KeyP") {
      var Time = Date.now()
      if (Paused == true) {
        CurrentTimeOffset = CurrentTimeOffset + (Time - PausedAt)
        CreateSourceBuffer(Source)
        Source.start(0,TimePausedAt/1000)
        Paused = false
      } else {
        Paused = true
        PausedAt = Time
        TimePausedAt = Time - StartTime - CurrentTimeOffset
        Source.stop()
      }
      UpdateText()
    } else if (KeyCode == "KeyE") {
      if (EncodingEnabled == true) {
        DownloadSongData = !DownloadSongData
        UpdateText()
      }
    } else if (KeyCode == "ArrowUp") {
      Volume = Volume + 5
      if (Volume > 100) {
        Volume = 100
      }
      UpdateVolume()
      UpdateText()
    } else if (KeyCode == "ArrowDown") {
      Volume = Volume - 5
      if (Volume < 0) {
        Volume = 0
      }
      UpdateVolume()
      UpdateText()
    } else if (KeyCode == "KeyO") {
      if (Stopped != true) {
        Stopped = true
        AlbumImage.style.width = "0px"
        AlbumImage.style.left = "0px"
        MonstercatLogo.style.width = "0px"
        MonstercatLogo.style.left = "0px"
        TextDiv.style.width = "0px"
        AlbumTextDiv.style.width = "0px"

        ParticleBackground.style.opacity = 0
        TimeLength = 0
        if (Source && Paused == false) {
          Source.stop()
        } else {
          ForceStop()
        }
      }
    }
  }
});

var LastVolume = GetCookie("volume")
if (LastVolume) {
  var NewVolume = parseInt(LastVolume)
  if (isNaN(NewVolume) != true) {
    Volume = NewVolume
  }
}
UpdateText()
UpdateVolume()
