function RegisterAlbum(ReferenceName,Name,Songs) {
  var AlbumSongs = []
  for (var i = 0; i < Songs.length; i = i + 3) {
    var SongsTable = []
    var Song1 = Songs[i]
    var Song2 = Songs[i + 1]
    var Song3 = Songs[i + 2]

    if (Song1 != null) {
      SongsTable[0] = [i+1,Song1]
    }
    if (Song2 != null) {
      SongsTable[1] = [i+2,Song2]
    }
    if (Song3 != null) {
      SongsTable[2] = [i+3,Song3]
    }

    AlbumSongs[AlbumSongs.length] = SongsTable
  }
  Albums[ReferenceName] = [Name,AlbumSongs]
}

RegisterAlbum("apolloep","Astronaut - Apollo EP",["Apollo (Electro Mix)","Apollo (Radio Edit)","Pinball","Space Jam","13","Apollo (Dodge & Fuski Remix)","Apollo (Instrumental Electro Mix)","Apollo (Instrumental Radio Edit)"])
RegisterAlbum("quantumep","Astronaut - Quantum EP",["Quantum","Rain"])
RegisterAlbum("destinationquantum","Astronaut - Destination: Quantum",["Quantum (Virtual Riot Remix)","Quantum (Hellberg Remix)","Quantum (Spag Heddy Remix)","Quantum (Dilemn Remix)","Quantum (Cutline Remix)"])
RegisterAlbum("destinationrain","Astronaut - Destination: Rain",["Rain (MitiS Remix)","Rain (Calvertron Remix)","Rain (Stephen Walking Remix)","Rain (Raise Spirit Remix)","Rain (Centron Remix)","Rain (Dflent Remix)"])
RegisterAlbum("destinationwar","Astronaut & Far Too Loud - Destination: War",["War (Teddy Killerz Remix)","War (F.O.O.L & Didrick Remix)","War (Diskord Remix)","War (The Frederik Remix)","War (Zuko Remix)"])

RegisterAlbum("upgradeep","Case & Point - Upgrade EP",["Upgrade","Razor"])

RegisterAlbum("betterwithtimeep","Grabbitz - Better With Time EP",["Hope (Intro)","Better With Time","Make You Mine","Intermission","Get Out","Float Away","Cold (feat. LAYNE)"])
RegisterAlbum("friendsep","Grabbitz - Friends EP",["7.6.14 (Intro)","Here With You Now","Friends (feat. Faustix)","Transition (Short)","Turn Around","Way Too Deep","A Walk To The Gallows"])

RegisterAlbum("thisismeep","Hellberg - This Is Me EP",["A Heartbeat Away","The Girl (feat. Cozi Zeuhlsdoff)","Back2You","Wasted Summer (feat. Jessarae)","Love You Now"])
RegisterAlbum("thegirltheremixes","Hellberg - The Girl (feat. Cozi Zeuhlsdoff) (The Remixes)",["The Girl (feat. Cozi Zeuhlsdoff) (Color Source Remix)","The Girl (feat. Cozi Zeuhlsdoff) (Mr FijiWiji Remix)","The Girl (feat. Cozi Zeuhlsdoff) (Anevo Remix)","The Girl (feat. Cozi Zeuhlsdoff) (Stonebank Remix)","The Girl (feat. Cozi Zeuhlsdoff) (Capital A Remix)"])

RegisterAlbum("newagedarkage","Karma Fields - New Age Dark Age",["Edge Of The World","Stickup (feat. Juliette Lewis)","For Me","Skyline","Fixed_","Greatness (feat. Talib Kweli)","Scandal (feat. C.C. Sheffield)","Build The Cities (feat. Kerli)","Skewed","Faint Echoes (feat. Monarchy)","A Bright But Distant Future","Build The Cities + (feat. Kerli)"])
RegisterAlbum("buildthecitiesreconstructions","Karma Fields - Build The Cities (feat. Kerli) (Reconstructions)",["Build The Cities (feat. Kerli) (Empire Of Sound)","Build The Cities (feat. Kerli) (Grabbitz Remix)","Build The Cities (feat. Kerli) (Project 46 Remix)","Build The Cities (feat. Kerli) (Kastle Remix)","Build The Cities (feat. Kerli) (AC Slater Remix)","Build The Cities (feat. Kerli) (Rootkit Remix)","Build The Cities (feat. Kerli) (Redial Remix)"])

RegisterAlbum("monstercat5yearanniversary","Monstercat - Monstercat 5 Year Anniversary",["Matches (feat. Aaron Richards)","Lift You Up (feat. EMEL)","Blackout","Divided VIP","Imperfect Views","This Feeling","Tribal","Break The Silence","Crescendo (feat. MLYK)","Before We Fade"])

RegisterAlbum("basslinekickintheremixes","Pegboard Nerds - Bassline Kickin (The Remixes)",["Bassline Kickin (Astronaut Remix)","Bassline Kickin (Dzeko & Torres Remix)","Bassline Kickin (Silverback Remix)"])
RegisterAlbum("heartbittheremixes","Pegboard Nerds - Heartbit (The Remixes)",["Heartbit (feat. Tia Simone) (12th Planet Remix)","Heartbit (feat. Tia Simone) (Sikdope Remix)","Heartbit (feat. Tia Simone) (Tommie Sunshine X Usica Remix)","Heartbit (feat. Tia Simone) (MIU Remix)","Heartbit (feat. Tia Simone) (Quiet Disorder Remix)","Heartbit VIP (feat. Tia Simone)"])
RegisterAlbum("pinkcloudep","Pegboard Nerds - Pink Cloud EP",["Emoji","Pink Cloud (feat. Max Collins)","Just Like That (feat. Johnny Graves)","Downhearted (feat. Jonny Rose)","The End Is Near (Fire In The Hole VIP)"])
RegisterAlbum("thelosttracksep","Pegboard Nerds - The Lost Tracks EP",["Frainbreeze","Close Encounter","20K","Lawless","Revenge Of The Nerds (VIP Mix)","Rocktronik"])
RegisterAlbum("theuncagedremixes","Pegboard Nerds - The Uncaged Remixes",["Here It Comes (Snavs & Toby Green Remix)","Badboi (Snavs Remix)","Badboi (Dani Deahl Remix)","Badboi (VIP)"])

RegisterAlbum("dreamsep","Rogue - Dream EP",["Dreams (feat. Laura Brehm)","Air","Moments (feat. Meg Dean)","Escape"])
RegisterAlbum("earthep","Rogue - Earth EP",["From The Dust","Cataclysm (feat. Meg Dean)","Perfect Views","Through The Dark"])

RegisterAlbum("dancetoep","Tut Tut Child - Dance To It EP",["Dance To It","Dragon Pirates","Fat Cat Adventures"])
RegisterAlbum("askyourfriendsfirstep","Tut Tut Child - Ask Your Friends First EP",["Hot Pursuit","Breathe (feat. Danyka Nadeau)","Plain Sight (feat. Rachel Hirons)","Birds On The Wire (feat. Augustus Ghost)"])

RegisterAlbum("miraisekaiep","Varien & 7 Minutes Dead - Mirai Sekai EP",["Mirai Sekai Pt.1: Neo-Seoul","Mirai Sekai Pt.2: Neo-Tokyo","Mirai Sekai Pt.3: Aeon Metropolis","Mirai Sekai Pt.4: Goodnight_Sequence","Mirai Sekai (Continuous Mix)"])
