const fs = require('fs');

function deleteImage(imageName) {
  const filePath = `./backend/public/images/${imageName}`;

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Image is deleted successfully.');
  });
}


module.exports = deleteImage;