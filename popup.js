// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

/**
 * Change the background color of the current page.
 *
 * @param {string} color The new background color.
 */
function changeBackgroundColor(color) {
  var script = 'document.body.style.backgroundColor="' + color + '";';
  chrome.tabs.executeScript({
    code: script
  });
}

/**
 * Change the font color of the current page.
 *
 * @param {string} color The new font color.
 */
 function changeFontColor(color) {
   var script = 'document.body.style.color="' + color +'";';
   chrome.tabs.executeScript({
     code: script
   });
 }

/**
 * Change the font of the current page.
 *
 * @param {string} font The new font.
 */
function changeFont(font) {
  var script = 'document.body.style.fontFamily="' + font + '";';
  chrome.tabs.executeScript({
    code: script
  });
}

/**
 * Change the font size of the current page.
 *
 * @param {string} fontSize The font size of the new font.
 */
 function changeFontSize(fontSize) {
   var script = 'document.body.style.fontSize="' + fontSize + '";';
   chrome.tabs.executeScript({
     code: script
   });
 }

 /**
  * Change the font of the current page to italics.
  *
  */
  function changeFontItalics() {
    var script = 'document.body.style.fontStyle="italic";';
    chrome.tabs.executeScript({
      code: script
    });
  }

  /**
   * Change the font of the current page to bold.
   */
   function changeFontBold() {
     var script = 'document.body.style.fontWeight="bold";';
     chrome.tabs.executeScript({
       code: script
     });
   }

   /**
    * Reset the font of the current page to without italics or bold.
    */
    function resetFontStyle() {
      var script = 'document.body.style.fontWeight="normal";' + 'document.body.style.fontStyle="normal";';
      chrome.tabs.executeScript({
        code: script
      });
    }

/**
 * Gets the saved background color for url.
 *
 * @param {string} url URL whose background color is to be retrieved.
 * @param {function(string)} callback called with the saved background color for
 *     the given url on success, or a falsy value if no color is retrieved.
 */
function getSavedBackgroundColor(url, callback) {
  chrome.storage.sync.get(url, (items) => {
    callback(chrome.runtime.lastError ? null : items[url]);
  });
}

/**
 * Sets the given background color for url.
 *
 * @param {string} url URL for which background color is to be saved.
 * @param {string} color The background color to be saved.
 */
function saveBackgroundColor(url, color) {
  var items = {};
  items[url] = color;
  chrome.storage.sync.set(items);
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    var bgdropdown = document.getElementById('background');
    var fontdropdown = document.getElementById('font-dropdown');
    var slider = document.getElementById('fontRange');
    var fontcolor = document.getElementById('font-color');
    var fontitalics = document.getElementById('font-italics');
    var fontbold = document.getElementById('font-bold');
    var fontreset = document.getElementById('font-reset');

    // Load the saved background color for this page and modify the dropdown
    // value, if needed.
    getSavedBackgroundColor(url, (savedColor) => {
      if (savedColor) {
        changeBackgroundColor(savedColor);
        bgdropdown.value = savedColor;
      }
    });

    // Ensure the background color is changed and saved when the dropdown
    // selection changes.
    bgdropdown.addEventListener('change', () => {
      changeBackgroundColor(bgdropdown.value);
      saveBackgroundColor(url, bgdropdown.value);
    });

    fontdropdown.addEventListener('change', () => {
      changeFont(fontdropdown.value);
    });

    fontcolor.addEventListener('change', () => {
      changeFontColor(fontcolor.value);
    });

    slider.oninput = function() {
      if (this.value == 1) {
        changeFontSize("xx-small");
      } else if (this.value == 2) {
        changeFontSize("x-small");
      } else if (this.value == 3)  {
        changeFontSize("small");
      } else if (this.value == 4) {
        changeFontSize("medium");
      } else if (this.value == 5) {
        changeFontSize("large");
      } else if (this.value == 6) {
        changeFontSize("x-large");
      } else if (this.value == 7) {
        changeFontSize("xx-large");
      }
    }

    fontitalics.addEventListener('click', () => {
      changeFontItalics();
    });

    fontbold.addEventListener('click', () => {
      changeFontBold();
    });

    fontreset.addEventListener('click', () => {
      resetFontStyle();
    });



  });
});
