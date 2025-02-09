// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

window.addEventListener('mouseup', wordSelected);

function wordSelected() {
  let selectedText = window.getSelection().toString().trim();
  console.log(selectedText);
  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({text: selectedText}, function (response) {
      console.log(response);
    });
  }
}
