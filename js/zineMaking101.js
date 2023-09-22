// Variables
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTpbSD6NfDouK4eMDh7s49kgxWXiRSD-i1TxOvR7cHAh2XOvMcNe8nwCutf82y_G-4HuZ2FRFxjvwoz/pub?gid=0&single=true&output=csv';
const categoryStartNum = 4;
const sheetName = 'zineMaking101';
const punctuation = ',';


// Papaparse
function init() {
  Papa.parse(publicSpreadsheetUrl, {
    download: true,
    header: true,
    complete: showInfo,
  });
}

console.log(showInfo);

function showInfo(results) {
  const data = results.data;
  const checked = 'x';
  const columnArray = Object.keys(data[0]);
  const columnName = [columnArray.length];
  for (let j = 0; j < columnArray.length; j++) {
    columnName[j] = columnArray[j];
  }

  // Create sorting buttons
  for (let j = categoryStartNum; j < columnArray.length; j++) {
    addButton(columnName[j]);
  }

  for (let i = categoryStartNum; i < columnArray.length; i++) {
    for (let j = 0; j < data.length; j++) {
      var category = columnArray[i];
      var columnData = data[j][category];

      if (columnData == checked) {
        addElement(
          columnName[i],
          data[j][columnName[0]],
          data[j][columnName[1]],
          data[j][columnName[2]],
          data[j][columnName[3]]
      );
    }
  }
}
// Click the "All" button programmatically
document.querySelector('.filterButton').click();
}

function addButton(columnName) {
  const newButton = document.createElement('BUTTON');
  const newButtonContent = document.createTextNode(columnName);

  newButton.appendChild(newButtonContent);
  newButton.className = 'filterButton';
  newButton.addEventListener('click', function() {
    filterSelection(columnName);
    filterItemOff(); // turns off all active buttons
    newButton.classList.add('active'); // turn this button on
  });
  document.getElementById('filterButtonWrap').appendChild(newButton);
}

console.log(addButton);

function filterItemOff() {
  let filterItemClassArray = document.getElementsByClassName('filterButton');
  for (let i = 0; i < filterItemClassArray.length; i++) {
    if (filterItemClassArray[i].classList.contains('active')) {
      filterItemClassArray[i].classList.remove('active');
    }
  }
}

function addElement(columnName, title, url, description, icon) {
  // class names
  const hashtagOne = ['item'];
  const hashtagTwo = [columnName];
  const hashtagArray = hashtagOne.concat(hashtagTwo);
  const hashtagString = hashtagArray.join(' ');
  const newItem = document.createElement('a');
  newItem.className = hashtagString;
  newItem.href = url;

  // iconwrap and svg
  const iconWrap = document.createElement('div');
  iconWrap.className = 'itemIconWrap';
  iconWrap.innerHTML = icon;

  // text wrap
  const textWrap = document.createElement('div');
  textWrap.className = 'itemTextWrap';

  // Create the title element
  const itemTitle = document.createElement('h3');
  itemTitle.innerText = `${title}`;
  textWrap.appendChild(itemTitle);

  // Create the description element if description exists
  if (description) {
    const itemDescription = document.createElement('p');
    itemDescription.innerText = `${description}`;
    textWrap.appendChild(itemDescription);
  }

  // Append the icon and content div to the item div
  newItem.appendChild(iconWrap);
  newItem.appendChild(textWrap);
  
  document.getElementsByTagName('main')[0].appendChild(newItem);

   // Shuffle the order of the items within the main element
    const mainElement = document.getElementsByTagName('main')[0];
    mainElement.insertBefore(newItem, mainElement.children[Math.floor(Math.random() * mainElement.children.length)]);
}

window.addEventListener('DOMContentLoaded', init);

// filter script
  function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName('item');
    for (i = 0; i < x.length; i++) {
      w3RemoveClass(x[i], 'show');
      if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], 'show');
    }
  }

  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += ' ' + arr2[i];
      }
    }
  }

  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(' ');
  }