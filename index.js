'use strict';

const stream = require('stream');
const path = require('path');
const fs = require('fs');
const os = require('os');
const exec = require('child_process').exec;

function GulpDartSass(options) {
  options = options || { };
  const transformStream = new stream.Transform({ objectMode: true });
  transformStream._transform = function(file, encoding, callback) {
    fs.mkdtemp(`${os.tmpdir()}${path.sep}`, (err, tempDir) => {
      if (err) {
        return callback(err, file);
      }
      const tmpFilePath = path.resolve(tempDir, file.relative.replace('.scss', '.css'));
      const targetFilePath = options.dest ? path.resolve(options.dest, file.relative.replace('.scss', '.css')) : file.path.replace('.scss', '.css');
      const cmd = `sass ${file.path} ${tmpFilePath} --no-source-map`;
      exec(cmd, function (err) {
        if (err) {
          return callback(err, file);
        }
        file.path = targetFilePath;
        file.contents = fs.readFileSync(tmpFilePath);
        callback(null, file);
      });
    });
  };

  return transformStream;
}

module.exports = GulpDartSass;
