/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
}

/* What should the add-on do when a document is opened */
function onOpen() {
  DocumentApp.getUi()
  .createAddonMenu() // Add a new option in the Google Docs Add-ons Menu
  .addItem("Add Metadata", "showSidebar")
  .addToUi();  // Run the showSidebar function when someone clicks the menu
}

function add_property(){ 
  //Call the HTML file and set the width and height
  var html = HtmlService.createHtmlOutputFromFile("add_new")
    .setWidth(450)
    .setHeight(300);
  
  //Display the dialog
  var dialog = ui.showModalDialog(html, "Add new property key value");
 
};


function findCustomPropertiesFromResult(data) {
    var foundData={};
    if(data.hasOwnProperty('items')) {
      if(data['items'].length>0) {
        foundData['status'] = 1;
        foundData['data'] = [];
        var items = data['items'];
        var temp = {};
        for (var key in items) {
          temp = {};
          temp['key'] = items[key]['key'];
          temp['value'] = items[key]['value'];

           Logger.log(temp['value']);

          foundData['data'].push(temp)
        }

        return foundData;

      }
      else {
        return {status:0};
      }
    }
    else {
      return {status:0};
    }
}

function getCustomProperties() {
  var fileId = DocumentApp.getActiveDocument().getId()
  var propertyData = findCustomPropertiesFromResult(Drive.Properties.list(fileId));
  Logger.log(propertyData);
  return propertyData['data'];
}

function add_property(){ 
  //Call the HTML file and set the width and height
  var html = HtmlService.createHtmlOutputFromFile("add_new")
    .setWidth(450)
    .setHeight(300);
  
  //Display the dialog
  DocumentApp.getUi().showModalDialog(html,"Add new property key value");
 // var dialog = ui.showModalDialog(html, "Add new property key value");
 
};

// function addCustomProperty(fileId) {
//   var property = {
//     key: 'department',
//     value: 'Sales',
//     visibility: 'PUBLIC'
//   };
//   Drive.Properties.insert(property, fileId);
// }

// function processMetadataForm() {
//   return getCustomProperties();
  
  // var props=PropertiesService.getDocumentProperties()
  // //Process each form element (atm, they are just input text elements)
  
  //   props.setProperty('talha','anwar')
  //   Logger.log('ran process meta');
  //}



/* Show a 300px sidebar with the HTML from googlemaps.html */
function showSidebar() {
  var html = HtmlService.createTemplateFromFile("metadata_adder")
    .evaluate()
    .setTitle("Metadata CRUD"); // The title shows in the sidebar
  DocumentApp.getUi().showSidebar(html);
}
