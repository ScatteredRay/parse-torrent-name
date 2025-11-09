'use strict';

var ptn = require('./');
var tape = require('tape');

var torrents = [
  {
    name: 'The Walking Dead S05E03 720p HDTV x264-ASAP[ettv]',
    title: 'The Walking Dead',
    season: 5,
    episode: 3,
    resolution: '720p',
    quality: 'HDTV',
    codec: 'x264',
    audio: undefined,
    group: 'ASAP[ettv]',
    extended: undefined,
    hardcoded: undefined,
    widescreen: undefined,
    website: undefined,
    excess: undefined
  },
  {
    name: 'Hercules (2014) 1080p BrRip H264 - YIFY',
    title: 'Hercules',
    year: 2014,
    resolution: '1080p',
    quality: 'BrRip',
    codec: 'H264',
    group: 'YIFY'
  },
  {
    name: 'Dawn.of.the.Planet.of.the.Apes.2014.HDRip.XViD-EVO',
    title: 'Dawn of the Planet of the Apes',
    year: 2014,
    quality: 'HDRip',
    codec: 'XViD',
    group: 'EVO'
  },
  {
    name: 'The Big Bang Theory S08E06 HDTV XviD-LOL [eztv]',
    season: 8,
    episode: 6,
    quality: 'HDTV',
    codec: 'XviD',
    group: 'LOL [eztv]'
  },
  {
    name: '22 Jump Street (2014) 720p BrRip x264 - YIFY',
    title: '22 Jump Street',
    episode: undefined
  },
  {
    name: 'Hercules.2014.EXTENDED.1080p.WEB-DL.DD5.1.H264-RARBG',
    extended: true,
    quality: 'WEB-DL',
    audio: 'DD5.1',
    excess: undefined
  },
  {
    name: 'Hercules.2014.EXTENDED.HDRip.XViD-juggs[ETRG]',
    extended: true,
    excess: undefined
  },
  {
    name: 'Hercules (2014) WEBDL DVDRip XviD-MAX',
    quality: 'WEBDL DVDRip',
    excess: undefined
  },
  {
    name: 'WWE Hell in a Cell 2014 PPV WEB-DL x264-WD -={SPARROW}=-',
    quality: 'PPV WEB-DL',
    group: 'WD -={SPARROW}=-',
    excess: undefined
  },
  {
    name: 'UFC.179.PPV.HDTV.x264-Ebi[rartv]',
    title: 'UFC 179',
    quality: 'PPV.HDTV'
  },
  {
    name: 'Marvels Agents of S H I E L D S02E05 HDTV x264-KILLERS [eztv]',
    title: 'Marvels Agents of S H I E L D'
  },
  {
    name: 'X-Men.Days.of.Future.Past.2014.1080p.WEB-DL.DD5.1.H264-RARBG',
    title: 'X-Men Days of Future Past'
  },
  {
    name: 'Guardians Of The Galaxy 2014 R6 720p HDCAM x264-JYK',
    region: 'R6',
    quality: 'HDCAM'
  },
  {
    name: 'Marvel\'s.Agents.of.S.H.I.E.L.D.S02E01.Shadows.1080p.WEB-DL.DD5.1',
    title: 'Marvel\'s Agents of S H I E L D',
    episodeName: 'Shadows',
    audio: 'DD5.1',
    excess: undefined
  },
  {
    name: 'Marvels Agents of S.H.I.E.L.D. S02E06 HDTV x264-KILLERS[ettv]',
    title: 'Marvels Agents of S.H.I.E.L.D.'
  },
  {
    name: 'Guardians of the Galaxy (CamRip / 2014)',
    excess: undefined
  },
  {
    name: 'The.Walking.Dead.S05E03.1080p.WEB-DL.DD5.1.H.264-Cyphanix[rartv]',
    codec: 'H.264',
    year: undefined,
    excess: undefined
  },
  {
    name: 'Brave.2012.R5.DVDRip.XViD.LiNE-UNiQUE',
    region: 'R5',
    audio: 'LiNE',
    excess: undefined
  },
  {
    name: 'Lets.Be.Cops.2014.BRRip.XViD-juggs[ETRG]',
    quality: 'BRRip'
  },
  {
    name: 'These.Final.Hours.2013.WBBRip XViD',
    quality: 'WBBRip'
  },
  {
    name: 'Downton Abbey 5x06 HDTV x264-FoV [eztv]',
    title: 'Downton Abbey',
    season: 5,
    episode: 6,
    excess: undefined
  },
  {
    name: 'Annabelle.2014.HC.HDRip.XViD.AC3-juggs[ETRG]',
    hardcoded: true,
    audio: 'AC3',
    excess: undefined
  },
  {
    name: 'Lucy.2014.HC.HDRip.XViD-juggs[ETRG]',
    hardcoded: true,
    excess: undefined
  },
  {
    name: 'The Flash 2014 S01E04 HDTV x264-FUM[ettv]',
    excess: undefined
  },
  {
    name: 'South Park S18E05 HDTV x264-KILLERS [eztv]',
    excess: undefined
  },
  {
    name: 'The Flash 2014 S01E03 HDTV x264-LOL[ettv]',
    excess: undefined
  },
  {
    name: 'The Flash 2014 S01E01 HDTV x264-LOL[ettv]',
    excess: undefined
  },
  {
    name: 'Lucy 2014 Dual-Audio WEBRip 1400Mb',
    audio: 'Dual-Audio',
    garbage: '1400Mb',
    group: undefined,
    excess: undefined
  },
  {
    name: 'Teenage Mutant Ninja Turtles (HdRip / 2014)',
    title: 'Teenage Mutant Ninja Turtles',
    quality: 'HdRip'
  },
  {
    name: 'Teenage Mutant Ninja Turtles (unknown_release_type / 2014)',
    excess: 'unknown_release_type',
    proper: undefined
  },
  {
    name: 'The Simpsons S26E05 HDTV x264 PROPER-LOL [eztv]',
    proper: true,
    excess: undefined
  },
  {
    name: '2047 - Sights of Death (2014) 720p BrRip x264 - YIFY',
    title: '2047 - Sights of Death',
    year: 2014,
    excess: undefined,
    repack: undefined
  },
  {
    name: 'Two and a Half Men S12E01 HDTV x264 REPACK-LOL [eztv]',
    repack: true,
    excess: undefined
  },
  {
    name: 'Dinosaur 13 2014 WEBrip XviD AC3 MiLLENiUM',
    quality: 'WEBrip',
    audio: 'AC3',
    group: 'MiLLENiUM',
    excess: undefined
  },
  {
    name: 'Teenage.Mutant.Ninja.Turtles.2014.HDRip.XviD.MP3-RARBG',
    audio: 'MP3',
    excess: undefined
  },
  {
    name: 'Dawn.Of.The.Planet.of.The.Apes.2014.1080p.WEB-DL.DD51.H264-RARBG',
    audio: 'DD51',
    excess: undefined
  },
  {
    name: 'Teenage.Mutant.Ninja.Turtles.2014.720p.HDRip.x264.AC3.5.1-RARBG',
    audio: 'AC3.5.1',
    excess: undefined
  },
  {
    name: 'Gotham.S01E05.Viper.WEB-DL.x264.AAC',
    episodeName: 'Viper',
    audio: 'AAC',
    group: undefined,
    excess: undefined
  },
  {
    name: 'Into.The.Storm.2014.1080p.WEB-DL.AAC2.0.H264-RARBG',
    audio: 'AAC2.0',
    excess: undefined
  },
  {
    name: 'Lucy 2014 Dual-Audio 720p WEBRip',
    audio: 'Dual-Audio',
    group: undefined,
    excess: undefined
  },
  {
    name: 'Into The Storm 2014 1080p BRRip x264 DTS-JYK',
    audio: 'DTS',
    excess: undefined
  },
  {
    name: 'Sin.City.A.Dame.to.Kill.For.2014.1080p.BluRay.x264-SPARKS',
    quality: 'BluRay'
  },
  {
    name: 'WWE Monday Night Raw 3rd Nov 2014 HDTV x264-Sir Paul',
    title: 'WWE Monday Night Raw',
    garbage: '3rd Nov',
    season: undefined,
    episode: undefined
  },
  {
    name: 'Jack.And.The.Cuckoo-Clock.Heart.2013.BRRip XViD',
    title: 'Jack And The Cuckoo-Clock Heart',
    group: undefined,
    excess: undefined
  },
  {
    name: 'WWE Hell in a Cell 2014 HDTV x264 SNHD',
    group: 'SNHD',
    excess: undefined
  },
  {
    name: 'Dracula.Untold.2014.TS.XViD.AC3.MrSeeN-SiMPLE',
    group: 'MrSeeN-SiMPLE',
    excess: undefined
  },
  {
    name: 'The Missing 1x01 Pilot HDTV x264-FoV [eztv]',
    episodeName: 'Pilot',
    excess: undefined
  },
  {
    name: 'Doctor.Who.2005.8x11.Dark.Water.720p.HDTV.x264-FoV[rartv]',
    season: 8,
    episode: 11,
    episodeName: 'Dark Water',
    excess: undefined
  },
  {
    name: 'Gotham.S01E07.Penguins.Umbrella.WEB-DL.x264.AAC',
    episodeName: 'Penguins Umbrella',
    excess: undefined
  },
  {
    name: 'One Shot [2014] DVDRip XViD-ViCKY',
    title: 'One Shot',
    excess: undefined
  },
  {
    name: 'The Shaukeens 2014 Hindi (1CD) DvDScr x264 AAC...Hon3y',
    quality: 'DvDScr',
    excess: ['Hindi', '1CD']
  },
  {
    name: 'The Shaukeens (2014) 1CD DvDScr Rip x264 [DDR]',
    quality: 'DvDScr',
    garbage: 'Rip',
    group: '[DDR]',
    excess: '1CD'
  },
  {
    name: 'Annabelle.2014.1080p.PROPER.HC.WEBRip.x264.AAC.2.0-RARBG',
    audio: 'AAC.2.0',
    group: 'RARBG'
  },
  {
    name: 'Interstellar (2014) CAM ENG x264 AAC-CPG',
    quality: 'CAM',
    excess: 'ENG'
  },
  {
    name: 'Guardians of the Galaxy (2014) Dual Audio DVDRip AVI',
    audio: 'Dual Audio',
    container: 'AVI',
    group: undefined,
    excess: undefined
  },
  {
    name: 'Eliza Graves (2014) Dual Audio WEB-DL 720p MKV x264',
    container: 'MKV',
    excess: undefined
  },
  {
    name: 'WWE Monday Night Raw 2014 11 10 WS PDTV x264-RKOFAN1990 -={SPARR',
    widescreen: true,
    quality: 'PDTV',
    group: 'RKOFAN1990 -={SPARR',
    excess: ['11', '10']
  },
  {
    name: 'Sons.of.Anarchy.S01E03',
    title: 'Sons of Anarchy',
    season: 1,
    episode: 3,
    group: undefined
  },
  {
    name: 'doctor_who_2005.8x12.death_in_heaven.720p_hdtv_x264-fov',
    title: 'doctor who',
    episodeName: 'death in heaven',
    quality: 'hdtv',
    excess: undefined
  },
  {
    name: 'breaking.bad.s01e01.720p.bluray.x264-reward',
    title: 'breaking bad',
    season: 1,
    episode: 1,
    quality: 'bluray',
    excess: undefined
  },
  {
    name: 'Game of Thrones - 4x03 - Breaker of Chains',
    title: 'Game of Thrones',
    episodeName: 'Breaker of Chains',
    group: undefined
  },
  {
    name: '[720pMkv.Com]_sons.of.anarchy.s05e10.480p.BluRay.x264-GAnGSteR',
    website: '720pMkv.Com',
    title: 'sons of anarchy',
    season: 5,
    episode: 10,
    resolution: '480p',
    quality: 'BluRay',
    codec: 'x264',
    group: 'GAnGSteR',
    excess: undefined
  },
  {
    name: '[ www.Speed.cd ] -Sons.of.Anarchy.S07E07.720p.HDTV.X264-DIMENSION',
    website: 'www.Speed.cd',
    title: 'Sons of Anarchy',
    season: 7,
    episode: 7,
    resolution: '720p',
    quality: 'HDTV',
    codec: 'X264',
    group: 'DIMENSION'
  },
  {
    name: 'Community.s02e20.rus.eng.720p.Kybik.v.Kybe',
    title: 'Community',
    season: 2,
    episode: 20,
    language: 'rus.eng',
    resolution: '720p',
    group: 'Kybik.v.Kybe',
    episodeName: undefined
  },
  {
    name: "The.Colour.of.Magic.Part.2.2008.1080p.BluRay.mkv",
    title: "The Colour of Magic",
    season: undefined,
    episode: 2,
    year: 2008,
    resolution: "1080p",
    quality: "BluRay",
  },
  {
    name: "Wilfred.S03E11.Stagnation.1080p.WEB-DL.DD5.1.H.264-NTb.mkv",
    title: "Wilfred",
    season: 3,
    episode: 11,
    episodeName: "Stagnation",
    resolution: "1080p",
    quality: "WEB-DL",
    codec: "H.264",
    excess: undefined
  },
  {
    name: "National.Geographic.Romes.Greatest.Battles.1of2.Battle.of.Actium.PDTV.XviD.AC3.avi",
    title: "National Geographic Romes Greatest Battles",
    season: undefined,
    episode: 1
  },
  {
    name: "Secret.Diary.of.a.Call.Girl.S01E08.720p.HDTV.x264-CtrlHD",
    title: "Secret Diary of a Call Girl",
    season: 1,
    episode: 8
  },
  {
    name: "strange.sex.0106.720p-yestv.mkv",
    title: "strange sex",
    season: 1,
    episode: 6,
    resolution: "720p"
  },
  {
    name: "nashville.2012.116.hdtv-lol.mp4",
    title: "nashville",
    season: 1,
    episode: 16
  },
  {
    name: "i.videogame.ep05.se.pdtv.xvid-fisk",
    title: "i videogame",
    episode: 5
  },
  {
    name: "I.VideoGame.Ep.02.DSR.XViD-WPi.avi",
    title: "I VideoGame",
    episode: 2
  },
  {
    name: "Mad.Men.S05/Mad.Men.S05E09.HDTV.x264-ASAP.mp4",
    title: "Mad Men",
    season: 5,
    episode: 9
  },
  {
    name: "1e39c-White Gloves",
    season: 1,
    episode: 39, // 39c?!
    group: "White Gloves"
  },
  {
    name: 'Xena.Warrior.Princess.s06e21.a.friend.in.need.ntsc.dvd.dd5.1.x264hi10-lightspeed',
    title: 'Xena Warrior Princess',
    season: 6,
    episode: 21,
    group: 'lightspeed',
    episodeName: 'a friend in need',
    excess: undefined
  },
  {
    name: 'survivor.s04e06.the.underdogs.dvdrip.x264',
    title: 'survivor',
    season: 4,
    episode: 6,
    quality: 'dvdrip',
    codec: 'x264',
    excess: undefined
  },
  {
    name: 'Coupling.S01E01.PAL.DVD.AC3.x264-SDB',
    title: 'Coupling',
    season: 1,
    episode: 1,
    quality: 'DVD',
    codec: 'x264',
    group: 'SDB',
    audio: 'AC3',
    format: 'PAL'
  },
  {
    name: 'Stacked S01E04 NTSC DVD DD2.0 x264-Hype',
    title: 'Stacked',
    season: 1,
    episode: 4,
    format: 'NTSC',
    quality: 'DVD',
    audio: 'DD2.0',
    codec: 'x264',
    group: 'Hype',
    excess: undefined
  },
  {
    name: 'TaleSpin.S01E55.Destiny.Rides.Again.480p.DVDRip.DD2.0.x264-SA89',
    season: 1,
    episode: 55,
    resolution: '480p',
    quality: 'DVDRip',
    codec: 'x264',
    audio: 'DD2.0',
    group: 'SA89',
    title: 'TaleSpin',
    episodeName: 'Destiny Rides Again',
    excess: undefined
  },
  {
    name: 'Peep.Show.S04E06.Wedding.DVDRip.DD2.0.x264-DEEP',
    title: 'Peep Show',
    season: 4,
    episode: 6,
    quality: 'DVDRip',
    audio: 'DD2.0',
    codec: 'x264',
    group: 'DEEP',
    excess: undefined
  },
  {
    name: 'Below.Deck.Mediterranean.S05E02.Cant.Touch.This.1080p.WEB.h264-ROBOTS',
    title: 'Below Deck Mediterranean',
    season: 5,
    episode: 2,
    episodeName: 'Cant Touch This',
    resolution: "1080p",
    excess: undefined
  },
  {
    name: 'Expedition.Unknown.S09E07.Mysteries.of.Bermuda.Triangle.1080p.WEB.x264-ROBOTS',
    title: 'Expedition Unknown',
    season: 9,
    episode: 7,
    episodeName: 'Mysteries of Bermuda Triangle',
    resolution: "1080p",
    quality: 'WEB',
    codec: 'x264',
    group: 'ROBOTS',
    excess: undefined
  },
  {
    name: 'Holiday.Dream.Home.S01E11.Palisades.and.Sand.720p.WEB.h264-KOMPOST',
    title: 'Holiday Dream Home',
    season: 1,
    episode: 11,
    episodeName: 'Palisades and Sand',
    resolution: '720p',
    quality: 'WEB',
    codec: 'h264',
    group: 'KOMPOST',
    format: undefined,
    excess: undefined
  },
  {
    name: 'Animaniacs.1e22b-Plane Pal.DVDRip.x264-SDxT',
    title: 'Animaniacs',
    season: 1,
    episode: 22,
    episodeName: 'Plane Pal',
    format: undefined,
    excess: undefined
  },
  {
    name: '1e05-Taming of the Screwy',
    season: 1,
    episode: 5,
    episodeName: 'Taming of the Screwy'
  },
  {
    name: 'Archer.S04E11.The.Papal.Chase.2013.BluRay.1080p.DTS.x264-Penumbra',
    title: 'Archer',
    season: 4,
    episode: 11,
    year: 2013,
    quality: 'BluRay',
    resolution: '1080p',
    audio: 'DTS',
    codec: 'x264',
    group: 'Penumbra',
    episodeName: 'The Papal Chase',
    format: undefined,
    excess: undefined
  },
  {
    name: 'The.Untamed.2019.E35.V2.2160p.WEB-DL.H265.AAC-LeagueWEB',
    title: 'The Untamed',
    year: 2019,
    episode: 35,
    resolution: '2160p',
    quality: 'WEB-DL',
    codec: 'H265',
    audio: 'AAC',
    group:'LeagueWEB', 
    excess: undefined
  },
  {
    name: 'rupauls.drag.race.s16e06.2160p.web.h265-hotdogwater',
    title: 'rupauls drag race',
    season: 16,
    episode: 6,
    resolution: '2160p',
    quality: 'web',
    codec: 'h265',
    group: 'hotdogwater'
  },
  {
    name: 'The.White.Lotus.S01E05.The.Lotus-Eaters.1080p.AMZN.WEB-DL.DDP5.1.H.264-NTb',
    title: 'The White Lotus',
    season: 1,
    episode: 5,
    episodeName: 'The Lotus-Eaters',
    group: 'NTb'
  },
  {
    name: 'The.Afterparty.S01E07.Danner.2160p.ATVP.WEB-DL.DDP5.1.Atmos.HDR.H.265-NOSiViD',
    audio: 'Atmos'
  },
  {
    name: 'Ducktales Season 2',
    title: 'Ducktales',
    season: 2
  },
  {
    name: 'DuckTales - 2x10 - Money to Burn - Super Ducktales (Part 5).DVDRip.x264.[gd]',
    title: 'DuckTales',
    season: 2,
    episode: 10
  },
  {
    name: 'RuPauls.Drag.Race.All.Stars.S09E12.Grand.Finale.Variety.Extravaganza.Part.2.1080p.AMZN.WEB-DL.DDP2.0.H.264-MADSKY.mkv',
    title: 'RuPauls Drag Race All Stars',
    season: 9,
    episode: 12
  },
  {
    name: '2.Broke.Girls.S01E23.And.Martha.Stewart.Have.a.Ball.(Part.1.).1080p.WEB-DL.AAC2.0.DD5.1.h-264-BTN.mkv.mkv',
    title: '2 Broke Girls',
    season: 1,
    episode: 23
  },
  {
    name: 'Below.Deck.Sailing.Yacht.S04E18.Below.Deck.Sailing.Yacht.Reunion.Part.1.1080p.AMZN.WEB-DL.DDP2.0.H.264-NTb.mkv',
    title: 'Below Deck Sailing Yacht',
    season: 4,
    episode: 18
  }
];

torrents.forEach(function(torrent) {
  var testName = '"' + torrent.name + '"';
  var parts = ptn(torrent.name);

  tape(testName, function (test) {
    var key, testMessage;

    for(key in torrent) {
      if(torrent.hasOwnProperty(key)) {
        if(key === 'name') {
          continue;
        }

        testMessage = key + ': ' + JSON.stringify(torrent[key]);

        test[Array.isArray(torrent[key]) ? 'deepEqual' : 'equal'](
          parts[key],
          torrent[key],
          testMessage
        );
      }
    }

    test.end();
  });
});
