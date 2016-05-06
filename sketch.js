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
  for (var i=0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      texts.push($.trim(lines[i]));
    }
  }
    alert("first word="+lines[0]);
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
  console.log(sum);
  alert("Graph generated, syllables="+sum);


  return sum;
}

function analyze() {
  splitLines();
  var sum=0;
  sum=countline("poop");
    alert("New sum:"+sum);

  //announce sum on click
// var sum = syllableCount.reduce((a, b) => a + b, 0);
// console.log(sum);
// alert("Graph generated, syllables="+sum);


// create  graph
$("#visualization").html("");
var container = document.getElementById('visualization');
  var items = [
      {x: '2014-06-11', y: sum, group: 0},
      {x: '2014-06-12', y: 25, group: 0},
      {x: '2014-06-13', y: 30, group: 0},
      {x: '2014-06-14', y: -10, group: 0},
      {x: '2014-06-15', y: 15, group: 0},
      {x: '2014-06-16', y: 30, group: 0}
  ];
  var dataset = new vis.DataSet(items);
  var options = {
      start: '2014-06-10',
      end: '2014-06-18',
      dataAxis: {
          showMinorLabels: false,
          icons: true
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
