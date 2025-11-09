'use strict';

var core = require('../core');

/**
 * Pattern should contain either none or two capturing groups.
 * In case of two groups - 1st is raw, 2nd is clean.
 */
var patterns = {
  season: [
    /([Ss]([0-9]{1,2}))/,
    /([Ss]?([0-9]{1,2}))[Eex]/,
    /((?:\.|^|(?:-? ))([0-9]{2})[0-9]{2}?)/,
    ///([^0-9]([0-9]{1,2})[0-9]{2})[^0-9]/
  ],
  episode: [
    /((?:[Eex])([0-9]{2})(?:[^0-9]|$))/,
    /((?:[0-9]{2})([0-9]{2})(?:[^0-9]|$))/,
    /([Ee]p\.?([0-9]{1,2}))/,
    ///([^0-9][0-9]{1,2}([0-9]{2})[^0-9])/
  ],
  sequence: [
    /([Pp]art\.([0-9]{1,2}))/,
    /(([0-9]{1,2})of[0-9]{1,2})/
  ],
  year: /([\[\(]?((?:19[0-9]|20[0-2])[0-9])[\]\)]?)/,
  resolution: /(([0-9]{3,4}p))[^M]/,
  format: /([ .](ntsc|NTSC|pal|PAL))/,
  quality: /(?:PPV\.)?[HP]DTV|(?:HD)?CAM|B[rR]Rip|[. ]TS|(?:PPV )?WEB-?DL(?: DVDRip)?|H[dD]Rip|DVDRip|DVDRiP|DVDRIP|dvdrip|dvd|DVD|CamRip|W[EB]B[rR]ip|WEB|web|[Bb]lu[Rr]ay|DvDScr|hdtv/,
  codec: /(?:xvid|x26[45]|h\.?26[45])(?:hi10)?/i,
  audio: /MP3|DD5\.?1|Dual[\- ]Audio|LiNE|DTS|AAC(?:\.?2\.0)?|AC3(?:\.5\.1)?|[BbDd][Dd](?:5\.1|2\.0)|Atmos|ATMOS/,
  group: /(- ?([^-]+(?:-={[^-]+-?$)?))$/,
  //group: /(-? ?([^- .]+)$)/,
  region: /R[0-9]/,
  extended: /EXTENDED/,
  hardcoded: /HC/,
  proper: /PROPER/,
  repack: /REPACK/,
  container: /MKV|AVI/,
  widescreen: /WS/,
  website: /^(\[ ?([^\]]+?) ?\])/,
  language: /rus\.eng/,
  garbage: /1400Mb|3rd Nov| ((Rip))/
};
var types = {
  season: 'integer',
  episode: 'integer',
  year: 'integer',
  extended: 'boolean',
  hardcoded: 'boolean',
  proper: 'boolean',
  repack: 'boolean',
  widescreen: 'boolean'
};
var torrent;

core.on('setup', function (data) {
  torrent = data;
});

core.on('start', function() {
  var key, match, index, clean, part;

  let skipList = [];

  for(key in patterns) {
    let patternList = [];
    if(skipList.includes(key)) {
      continue;
    }
    if(Array.isArray(patterns[key])) {
      patternList = patterns[key];
    }
    else {
      patternList.push(patterns[key]);
    }
    for(let pattern of patternList) {
      if(!(match = torrent.name.match(pattern))) {
        continue;
      }

      index = {
        raw:   match[1] ? 1 : 0,
        clean: match[1] ? 2 : 0
      };

      if(key === 'episode' || key === 'season') {
        // TODO: we should check continued matches.
        if(match[index.raw].match(patterns.year)) {
          continue;
        }
        let bSeq = false;
        for(let seq of patterns.sequence) {
          if(match[index.raw].match(seq)) {
            bSeq = true;
          }
        }
        if(bSeq) {
          continue;
        }
        if(key === 'episode') {
          // Sometimes a show has an episode like e21, but it's some part 2, so episodes should take priority
          skipList.push('sequence');
        }
      }

      if(key === 'sequence') {
        key = 'episode';
        skipList.push('episode');
      }

      if(types[key] && types[key] === 'boolean') {
        clean = true;
      }
      else {
        clean = match[index.clean];

        if(types[key] && types[key] === 'integer') {
          clean = parseInt(clean, 10);
        }
      }

      if(key === 'group') {
        if(clean.match(patterns.codec) || clean.match(patterns.quality)) {
          continue;
        }

        if(clean.match(/[^ ]+ [^ ]+ .+/)) {
          // groups don't have spaces
          continue;
          //key = 'episodeName';
        }
      }

      part = {
        name: key,
        match: match,
        raw: match[index.raw],
        clean: clean
      };

      if(key === 'episode') {
        core.emit('map', torrent.name.replace(part.raw, '{episode}'));
      }

      core.emit('part', part);
      break;
    }
  }

  core.emit('common');
});

core.on('late', function (part) {
  if(part.name === 'group') {
    part.clean = part.clean.replace(/^-/, '');
    core.emit('part', part);
  }
  else if(part.name === 'episodeName') {
    part.clean = part.clean.replace(/[\._]/g, ' ');
    part.clean = part.clean.replace(/_+$/, '').trim();
    core.emit('part', part);
  }
});
