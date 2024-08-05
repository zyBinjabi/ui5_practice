const fs = require('fs').promises;
const path = require('path');
const { exit } = require('process');

const getContent = require('./create_controller');
const getViewContent = require('./create_view'); // Import the function to get view content

const getAppContent = require('./create_app');
const getNavigationListFragmentContent = require('./create_NavigationListFragment');
const getSideNavigationFragmentContent = require('./create_SideNavigationFragment');

const { readJsonFile, updateAndWriteJsonFile } = require('./RWJSON');

class FileManager {
    constructor(fileName, isRoute) {
        this.fileName = fileName;
        this.isRoute = isRoute;

        this.controllerPath = path.join(__dirname, '../webapp/controller');
        this.viewPath = path.join(__dirname, '../webapp/view'); // Path for view directory
        this.fragmentPath = path.join(__dirname, '../webapp/fragment'); // Path for view directory
        this.mainFragmentPath = path.join(__dirname, '../webapp/fragment/mainFragment');
        this.ModelPath = path.join(__dirname, '../webapp/model'); // Path for view directory

        this.manifestPath = path.join(__dirname, '../webapp/manifest.json');
        this.navListPath = path.join(__dirname, '../webapp/model/navList.json');

        this.appPath = path.join(__dirname, '../webapp/view/App.view.xml');
        this.sideNavigationFragmentPath = path.join(__dirname, '../webapp/fragment/mainFragment/NavigationList.fragment.xml');
        this.navigationListFragmentPath = path.join(__dirname, '../webapp/fragment/mainFragment/SideNavigation.fragment.xml');
    }

    async getManifestJson(manifestPath) {
        try {
            return await readJsonFile(manifestPath);
        } catch (error) {
            throw error; // Throw the error to be caught by the caller
        }
    }

    async ensureDirectoryExists(directoryPath) {
        try {
            await fs.mkdir(directoryPath, { recursive: true });
        } catch (error) {
            console.error(`Error creating directory '${directoryPath}':`, error);
        }
    }

    async createFile(filePath, content, fileType) {
        try {
            if (await fs.stat(filePath).catch(() => false)) {
                console.error(`${fileType} file '${filePath}' already exists. Skipping write operation.`);
            } else {
                await fs.writeFile(filePath, content);
                console.log(`${fileType} file '${filePath}' written successfully.`);
            }
        } catch (error) {
            console.error(`Error writing ${fileType} file '${filePath}':`, error);
        }
    }

    async initApp(){
        try {
            let manifestJson = await this.getManifestJson(this.manifestPath);
            const appId = manifestJson['sap.app']['id'];

            const appFilePath = path.join(this.viewPath, `App.view.xml`);
            const sideNavigationFragmentFilePath = path.join(this.mainFragmentPath, `NavigationList.fragment.xml`); 
            const navigationListFragmentFilePath = path.join(this.mainFragmentPath, `SideNavigation.fragment.xml`); 

            await this.ensureDirectoryExists(this.viewPath);
            await this.ensureDirectoryExists(this.mainFragmentPath);

            const appContent = getAppContent("INIT", appId);
            const navigationListFragmentContentContent = getNavigationListFragmentContent("INIT", appId);
            const sideNavigationFragmentContentContent = getSideNavigationFragmentContent("INIT", appId);

            await this.createFile(appFilePath, appContent, 'Controller');
            await this.createFile(sideNavigationFragmentFilePath, navigationListFragmentContentContent, 'Fragment');
            await this.createFile(navigationListFragmentFilePath, sideNavigationFragmentContentContent, 'Fragment');

            await updateAndWriteJsonFile("INIT", this.manifestPath, this.navListPath);

        } catch (error) {
            console.error('Error in main function:', error);
        }

    }

    async main() {
        if (!this.fileName) {
            console.error('Please write the file name.');
            process.exit(1); // Exit the script with an error code
        }

        try {
            let manifestJson = await this.getManifestJson(this.manifestPath);
            const appId = manifestJson['sap.app']['id'];

            const controllerFilePath = path.join(this.controllerPath, `${this.fileName}.controller.js`);
            const viewFilePath = path.join(this.viewPath, `${this.fileName}.view.xml`); // Path for view file

            await this.ensureDirectoryExists(this.controllerPath);
            await this.ensureDirectoryExists(this.viewPath);

            const controllerContent = getContent(this.fileName, appId);
            const viewContent = getViewContent(this.fileName, appId);

            await this.createFile(controllerFilePath, controllerContent, 'Controller');
            await this.createFile(viewFilePath, viewContent, 'View');

            if (this.isRoute === "r") {
                await updateAndWriteJsonFile(this.fileName, this.manifestPath, this.navListPath);
            }
        } catch (error) {
            console.error('Error in main function:', error);
        }
    }
}

// Get the filename from command-line arguments or a function parameter
const args = process.argv.slice(2); // Remove the first two elements (node and script name)
const fileName = args[0];
const isRoute = args[1];
console.log({args})
console.log({fileName})
console.log({isRoute})
const fileManager = new FileManager(fileName, isRoute);
if (fileName == 'init'){
    fileManager.initApp()
}else{
    fileManager.main();
}
