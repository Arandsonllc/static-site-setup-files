const fs = require("fs");
const path = require("path");

// List of specific files and folders to copy
const itemsToCopy = [
  {
    type: "file",
    source: "./css/style.css",
    destination: "./dist/css/style.css",
  },
  {
    type: "file",
    source: "./js/geo-country.js",
    destination: "./dist/js/geo-country.js",
  },
  {
    type: "file",
    source: "./js/lang-redirect.js",
    destination: "./dist/js/lang-redirect.js",
  },
  {
    type: "file",
    source: "./js/script.js",
    destination: "./dist/js/script.js",
  },
  {
    type: "file",
    source: "./js/functions.js",
    destination: "./dist/js/functions.js",
  },
  {
    type: "file",
    source: "./index.html",
    destination: "./dist/index.html",
  },
  {
    type: "folder",
    source: "./img",
    destination: "./dist/img",
  },
  {
    type: "folder",
    source: "./lang",
    destination: "./dist/lang",
  },
];

// Function to copy a file
function copyFile(source, destination) {
  const destDir = path.dirname(destination);

  // Ensure destination directory exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy the file
  fs.copyFile(source, destination, (err) => {
    if (err) {
      console.error(
        `Error copying file ${source} to ${destination}: ${err.message}`
      );
    } else {
      console.log(`File copied: ${source} → ${destination}`);
    }
  });
}

// Function to copy a folder recursively
function copyFolder(source, destination) {
  if (!fs.existsSync(source)) {
    console.error(`Source folder does not exist: ${source}`);
    return;
  }

  // Ensure destination folder exists
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Read the contents of the folder
  fs.readdir(source, (err, items) => {
    if (err) {
      console.error(`Error reading folder ${source}: ${err.message}`);
      return;
    }

    // Copy each item in the folder
    items.forEach((item) => {
      const sourcePath = path.join(source, item);
      const destinationPath = path.join(destination, item);

      fs.stat(sourcePath, (err, stats) => {
        if (err) {
          console.error(
            `Error getting stats for ${sourcePath}: ${err.message}`
          );
          return;
        }

        if (stats.isFile()) {
          // Copy the file
          copyFile(sourcePath, destinationPath);
        } else if (stats.isDirectory()) {
          // Recursively copy the folder
          copyFolder(sourcePath, destinationPath);
        }
      });
    });
  });
}

// Function to process files and folders
function copyItems(items) {
  items.forEach(({ type, source, destination }) => {
    if (type === "file") {
      copyFile(source, destination);
    } else if (type === "folder") {
      copyFolder(source, destination);
    } else {
      console.error(`Unknown type "${type}" for ${source}`);
    }
  });
}

// Start copying specific files and folders
copyItems(itemsToCopy);
