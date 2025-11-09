'use strict';

var core = require('../core');

var torrent, raw, groupRaw;
var escapeRegex = function(string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
};

core.on('setup', function (data) {
  torrent = data;
  raw = torrent.name;
  groupRaw = '';
});

core.on('part', function (part) {
  if(part.name === 'excess') {
    return;
  }
  else if(part.name === 'group') {
    groupRaw = part.raw;
  }

  // remove known parts from the excess
  raw = raw.replace(part.raw, '');
});

core.on('map', function (map) {
  torrent.map = map;
});

core.on('end', function () {

  // clean up excess
  let clean = raw.replace(/(^[-\. ]+)|([-\. ]+$)/g, '');
  clean = clean.replace(/[\(\)\/]/g, ' ');
  clean = clean.split(/\.\.*| +/).filter(Boolean);


  if(clean.length !== 0) {
    // let groupPattern = escapeRegex(clean[clean.length - 1] + groupRaw) + '$';

    // if(torrent.name.match(new RegExp(groupPattern))) {
    //   core.emit('late', {
    //     name: 'group',
    //     clean: clean.pop() + groupRaw
    //   });
    // }

    if(torrent.map && clean[0]) {
      torrent.map = torrent.map.replace(/[. -]/g, '')
      let episodeName = '';
      while(clean.length > 0) {
        let episodeNamePattern = '{episode}' + escapeRegex(((episodeName.replace(/ /g, ''))+clean[0]).replace(/_+$/, ''));

        if(torrent.map.match(new RegExp(episodeNamePattern))) {
          episodeName += ' '  + clean.shift();
        }
        else {
          break
        }
      }
      if(episodeName.length > 0) {
        core.emit('late', {
          name: 'episodeName',
          clean: episodeName
        });
      }
    }
  }

  if(clean.length !== 0) {
    let groupPattern = escapeRegex(clean[clean.length - 1] + groupRaw) + '$';

    if(torrent.name.match(new RegExp(groupPattern))) {
      core.emit('late', {
        name: 'group',
        clean: clean.pop() + groupRaw
      });
    }
  }

  if(clean.length !== 0) {
    core.emit('part', {
      name: 'excess',
      raw: raw,
      clean: clean.length === 1 ? clean[0] : clean
    });
  }
});
