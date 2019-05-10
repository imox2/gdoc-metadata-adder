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

function showAlert(key) {
 // deleteCustomProperty(key);
  var ui = DocumentApp.getUi(); // Same variations.
  var message = 'Are you sure you want to delete the key : {key}?';
  message = message.replace('{key}',key);
  var result = ui.alert(
     'Please confirm',
     message,
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    deleteCustomProperty(key);
  } else {
    // User clicked "No" or X in the title bar.
    return 0;
  }
}



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


  return propertyData;
}


function deleteCustomProperty(key) {
  var fileId = DocumentApp.getActiveDocument().getId();

  var property = {
    key: key,
    value: null,
    visibility: 'PUBLIC'
  };
  
  var optionalArgs = {
    "visibility" : "PUBLIC"
  };
  
  
  Drive.Properties.remove(fileId, key, optionalArgs);
  return 1;
}

function updateCustomProperty(key,value) {
  var fileId = DocumentApp.getActiveDocument().getId()
  var property = {
    key: key,
    value: value,
    visibility: 'PUBLIC'
  };
  Drive.Properties.insert(property, fileId);
}


function addCustomProperty(key,value) {
  var fileId = DocumentApp.getActiveDocument().getId()
  var property = {
    key: key,
    value: value,
    visibility: 'PUBLIC'
  };
  Drive.Properties.insert(property, fileId);
}


/* Show a 300px sidebar with the HTML from googlemaps.html */
function showSidebar() {
  var html = HtmlService.createTemplateFromFile("metadata_adder")
    .evaluate()
    .setTitle("Metadata CRUD"); // The title shows in the sidebar
  DocumentApp.getUi().showSidebar(html);
}
