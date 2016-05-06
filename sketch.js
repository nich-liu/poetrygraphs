// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

var sentenceInput, wordInput;
// var stringArray = document.getElementById('sentence').value.split('\n');
var x = "Johnathan"+" Doe ";
var lex;

var results;

function setup() {
  noCanvas();
  lex = new RiLexicon();

  // A text area
  sentenceInput = select('#sentence');

  // A button
  var analyzeButton = select('#analyze')
  analyzeButton.mousePressed(analyze);

  wordInput = select('#word');

  // A button
  var rhymeButton = select('#rhymes')
  rhymeButton.mousePressed(rhyme);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearAll);

}

function analyze() {
  var p = createP('');
  p.class('text');

  var ol = createElement('ol');
  ol.parent(p);

  // What has the user entered?
  // Make a rita string object
  var rs = new RiString(sentenceInput.value());
  // Analyze that string for lots of features
  var features = rs.features();

  // Here are some features you can get (there are more!)
  var li1 = createElement('li', 'Stresses: ' + features.stresses);
  var li2 = createElement('li', 'Phonemes: ' + features.phonemes);
  var li3 = createElement('li', 'Parts of speech: ' + features.pos);
  var li4 = createElement('li', 'Syllables: ' + features.syllables);

  // Put the in the list
  li1.parent(ol);
  li2.parent(ol);
  li3.parent(ol);
  li4.parent(ol);

  // How many syllables is each word?

  // First split up each word by anything not a dash, slash or letter/number
  // This would be simpler if you are looking at one word at a time
  var tokens = features.syllables.split(/[^\-\/\w]+/);

  // Make an array for the syllable count of each word
  var syllableCount = [];

  // How many syllables separated by slashes?
  for (var i = 0; i < tokens.length; i++) {
    var syllables = tokens[i].split(/\//);
    syllableCount[i] = syllables.length;
  }

  // Show this in the list
  var li5 = createElement('li', 'Syllable count: ' + syllableCount.join(' ')+ sentenceInput.value());
  li5.parent(ol);
  var mystr=sentenceInput.value();
mystr=nl2br(mystr);
alert(mystr);
}
function nl2br (str, is_xhtml) {
     var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
     return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  }



// Go through and remove all the divs
function clearAll() {
  var par = selectAll('.text');
  for (var i = 0; i < par.length; i++) {
    par[i].remove();
  }

}
