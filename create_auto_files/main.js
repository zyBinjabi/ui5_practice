// npm install fs-extra --save-dev
const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const getContent = require('./create_controller');
const getViewContent = require('./create_view'); // Import the function to get view content
const { readJsonFile, updateAndWriteJsonFile } = require('./RWJSON');

// Get the filename from command-line arguments or a function parameter
const args = process.argv.slice(2); // Remove the first two elements (node and script name)
const fileName = args[0];
const isRoute = args[1];
// Read the arguments passed to the script

const controllerPath = path.join(__dirname, '../webapp/controller');
const viewPath = path.join(__dirname, '../webapp/view'); // Path for view directory
const manifestPath = path.join(__dirname, '../webapp/manifest.json');
const navListPath = path.join(__dirname, '../webapp/model/navList.json');

// Check if the filename is provided
if (!fileName) {
    console.error('Please write the file name.');
    process.exit(1); // Exit the script with an error code
}

async function getManifestJson(manifestPath) {
    try {
        return await readJsonFile(manifestPath);
    } catch (error) {
        throw error; // Throw the error to be caught by the caller
    }
}


async function main() {
    let manifestJson = await getManifestJson(manifestPath);
    const appId = manifestJson['sap.app']['id']

    const controllerFilePath = path.join(controllerPath, `${fileName}.controller.js`);
    const viewFilePath = path.join(viewPath, `${fileName}.view.xml`); // Path for view file
    

    // Create the directories if they don't exist
    if (!fs.existsSync(controllerPath)) {
        fs.mkdirSync(controllerPath, { recursive: true });
    }

    if (!fs.existsSync(viewPath)) {
        fs.mkdirSync(viewPath, { recursive: true });
    }

    // Write the content to the dynamically created JavaScript files in the specified directories
    // Check if the controller file already exists
    if (fs.existsSync(controllerFilePath)) {
        console.error(`Controller file '${controllerFilePath}' already exists. Skipping write operation.`);
    } else {
        // Get the content from content.js by calling the exported function and passing the file name
        const controllerContent = getContent(fileName, appId);
        fs.writeFileSync(controllerFilePath, controllerContent);
        console.log(`Controller file '${controllerFilePath}' written successfully.`);
    }

    // Check if the view file already exists
    if (fs.existsSync(viewFilePath)) {
        console.error(`View file '${viewFilePath}' already exists. Skipping write operation.`);
    } else {
        // Get the view content and write it to the file
        const viewContent = getViewContent(fileName, appId);
        fs.writeFileSync(viewFilePath, viewContent);
        console.log(`View file '${viewFilePath}' written successfully.`);
    }

    if (isRoute === "r"){
        updateAndWriteJsonFile(fileName,manifestPath,navListPath)
    }
}

main()

