/**
 * Mapping of frequency (hz) to note on equal-tempered scale.
 */
define(['text!scale.json'], function (noteFreq) {
  'use strict';
  var scale = JSON.parse(noteFreq);
  var fixedScale = scale.map(function(v,i,a){
    return {note: v.note.replace('</sub>/','</sub>-'), freq: +(v.freq).toFixed(2)};
  });
  return fixedScale;
});