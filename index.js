'use strict';

var eventStream = require('event-stream'),
    clientjade = require('clientjade'),
    gutil = require('gulp-util'),
    File = gutil.File,
    Buffer = require('buffer').Buffer;

module.exports = function(filename){

  var files = [];

  return eventStream.through(function (file) {

        files.push(file.path);

      },
      function end () {

        var context = this;

        clientjade({files: files}, function(flag, result){

          var resultFile = new File();

          resultFile.contents = new Buffer(result);
          resultFile.path = filename;

          context.emit('data', resultFile);
          context.emit('end');

          return;
        });
      });
};