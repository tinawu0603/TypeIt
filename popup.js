/**
 * Author: Tina Wu
 */

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

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    var bgdropdown = document.getElementById('background');
    var fontdropdown = document.getElementById('font-dropdown');
    var slider = document.getElementById('fontRange');
    var fontcolor = document.getElementById('font-color');
    var fontitalics = document.getElementById('font-italics');
    var fontbold = document.getElementById('font-bold');
    var fontreset = document.getElementById('font-reset');

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
