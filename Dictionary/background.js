// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('background running');
window.word = 'coding train';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  word = request.text;
});



