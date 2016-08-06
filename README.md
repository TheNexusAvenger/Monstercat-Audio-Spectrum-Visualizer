# Monstercat-Audio-Spectrum-Visualizer
Also: More songs will be added, just need to get them

Viewing: 
(Development) https://rawgit.com/TheNexusAvenger/Monstercat-Audio-Spectrum-Visualizer/master/index.html
(Production) https://cdn.rawgit.com/TheNexusAvenger/Monstercat-Audio-Spectrum-Visualizer/master/index.html
<br>For limiting your search, add a ? to the end (make sure it isn't after a slash), then add song=SongNameHere with spaces if applicapable, or artist=ArtistName with spaces if applicable. To use both, use ?song=SomeName&artist=SomeName. Current browsers should automatically convert blank spaces to %20.

This is a complete redo of the modified version of [vis.j](https://github.com/TheNexusAvenger/vis.js), from the one by [caseif](https://github.com/caseif/vis.js). This fixes some of the key issues, such as the page having to refresh to work and being domain dependant, and adds features and other performance improvements, and scaling.

## Re-purposing (GitHub Fork)
If you don't want to download it to your computer and just use it as a fork, here are the steps needed:
1. Press the fork button in this repositionary to create a copy.<br>
2. In README.md, change the two TheNexusAvenger links (lines 6 and 7, but not 9) to your GitHub username.<br>
(Optinal) 3. In index.html, change the one TheNexusAvenger link (line 39) to your GitHub username. 

## Re-purposing (Download)
This is a bit more painful, but it has the main benefit of it doesn't rely on GitHub, RawGit, and your internet connection.
1. Download a ZIP of the repository and move it to where you want to store it in your computer.<br>
2. Create a shortcut as follows "C:<i>directorytochrome.exe</i> --allow-file-access-from-files file:///C:<i>directorytoindex.html</i>" (This is for Windows)<br>
3. Repeat if on a different computer, as location of chrome.exe can vary from installation date and OS

## Adding Songs
This process is more involved than ideal, but you can add songs.
1. Add the song file you want to /songs (make sure it is compatible with AudioContext, however most standard formats are supported)
(Optional) 2. Add an artist image and album image to /img/artists/ and /img/albums/ 
3. Open /js/songdata/songs.js and add the song into the functions

## Running It
To run this, a decent CPU is required (higher core speed is preferred to more cores). Running on low end computers and phones/tablets may have stutering. Google Chrome and Microsoft Edge are supported, Safari and Firefox may have some compatibility problems, and Internet Explorer isn't supported because the AudioContext object isn't defined.

## About Data Encoding
For now, data can be exported as a Roblox Model XML with the positions of the given bars at the given times. You will need to enable it in /js/helpers/config.js.
