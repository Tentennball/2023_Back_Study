const ExifImage = require('exif').ExifImage;

module.exports = {
  convertor: async (path) => {
    path = __dirname.substring(0, __dirname.length - 6) + path;
    return await new ExifImage({ image: path }, (exifData) => {
      return exifData
    });
  },
};