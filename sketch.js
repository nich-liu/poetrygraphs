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
  var analyzeButton = select('#analyze');
  analyzeButton.mousePressed(analyze);
  var analyzeButton = select('#update');
  analyzeButton.mousePressed(analyze);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearAll);

}

function splitLines(){
  var lines = $('#sentence').val().split(/\n/);
  var texts = [];
    var stanza=0;
  for (var i=0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      texts.push($.trim(lines[i]));
    stanza+=1;
    }
    else {
      stanza=Math.log(stanza)*2;
      stanza=Math.floor(stanza);
      alert("adjusting this stanza break length to:"+stanza);
      for (var q=0; q < stanza; q++){
      texts.push(" ");
    }
      stanza=0;
    }
  }
    alert("Testing split function. First line="+lines[0]);
    lines=texts;
    return lines;
}
function countline(line){
  // Make a rita string object for input
  var rs = new RiString(line);
  // Analyze that string for lots of features
  var features = rs.features();
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
  var sum = syllableCount.reduce((a, b) => a + b, 0);

  return sum;
}

function analyze() {
  lines=splitLines();
  var sum=0;
  var counts = [];
  for (var i = 0; i < lines.length; i++) {
    counts.push(countline(lines[i]));
  }

  //find "tempo" of poem
var average = counts.reduce((a, b) => a + b, 0)/lines.length;
alert("tempo=average syllables in line="+average);

  //manipulate counts to vis.js readable array, items
  var test = [{x: 1, y: 0, group: 0}];
 for (var j = 1; j < lines.length; j++) {
   var suby=counts[j-1]-average*0.8-(counts[j-1]-counts[j]);
   if (suby<0){
     suby-=(suby/2);
   }
  test.push({x: j+1, y: suby, group: 0});
    if (j==lines.length-1&&counts[lines.length-1]!==0) {
      test.push({x: j+2, y: 0, group: 0});
    }
  }




// create  graph
$("#visualization").html("");
var container = document.getElementById('visualization');
var items = [];
  items = test;
  var dataset = new vis.DataSet(items);
  var options = {
      start: 0,
      end: (lines.length*1.05+1),
      dataAxis: {
          showMinorLabels: false,
          visible: false,
          showMajorLabels: false,
          icons: false
      }
  };
  var groupData = {
      id: 0,
      content: "Group Name",
      options: {
          drawPoints: {
              style: 'square' // square, circle
          },
          shaded: {
              orientation: 'zero' // top, bottom
          }
      }
  };
  var groups = new vis.DataSet();
  groups.add(groupData);
  var graph2d = new vis.Graph2d(container, dataset, groups, options);
  fit();
  updateStyle();
  function updateStyle() {
      groupData.style = "";
      groupData.style += document.getElementById("color").value;
      groupData.style += document.getElementById("line").value;
      groupData.style += document.getElementById("thickness").value;
      groupData.options.drawPoints = {};
      groupData.options.drawPoints.styles = "";
      groupData.options.drawPoints.style = document.getElementById("points").value;
      groupData.options.drawPoints.styles += document.getElementById("pointcolor").value;
      groupData.options.drawPoints.styles += document.getElementById("pointthickness").value;
      groupData.options.drawPoints.styles += document.getElementById("pointfill").value;
      groupData.options.drawPoints.size = Number(document.getElementById("pointsize").value);
      if (groupData.options.drawPoints.style === "") {
          groupData.options.drawPoints = false;
      }
      groupData.options.shaded = {};
      groupData.options.shaded.style = "";
      groupData.options.shaded.style += document.getElementById("fillcolor").value;
      groupData.options.shaded.style += document.getElementById("fillopacity").value;
      groupData.options.shaded.orientation = document.getElementById("fill").value;
      if (groupData.options.shaded.orientation === "") {
          groupData.options.shaded = false;
      }
      var groups = new vis.DataSet();
      groups.add(groupData);
      graph2d.setGroups(groups);
  }
}
