function buildTestProbsTable(tableId, testCount) {
  let table = document.getElementById(tableId);
  buildValuesRow(table.rows[0], 0, testCount);
}
function collectTestProbs(tableId) {
  let table = document.getElementById(tableId);
  return collectRowValues(table.rows[0], 0, "вероятности {idx}");
}
function calcEventsProbability(testProbs) {
  var eventCount = Math.pow(2, testProbs.length);
  var eventProbs = new Array(testProbs.length + 1);
  for (var i = 0; i <= testProbs.length; i++)
    eventProbs[i] = {parts: 0, prob: 0.0, formula: "", result: ""};
  for (var i = 0; i < eventCount; i++) {
    var hits = 0;
    var formula = "";
    var result = "";
    var event = i;
    var prob = 1.0;
    for (var j = 0; j < testProbs.length; j++) {
      var v = "";
      var p = 0.0;
      if (event & 0x01 != 0) {
        hits++;
        v = "p";
        p = testProbs[j];
      }
      else {
        v = "q";
        p = 1.0 - testProbs[j];
      }
      prob *= p;
      if (formula.length > 0) {
        formula += " \\cdot ";
        result += " \\cdot ";
      }
      formula += v + "_{" + String(j + 1) + "}";
      result += formatNum(p);
      event >>>= 1;
    }
    eventProbs[hits].parts++;
    eventProbs[hits].prob += prob;
    if (eventProbs[hits].formula.length > 0) {
      eventProbs[hits].formula += " + ";
      eventProbs[hits].result += " + ";
    }
    eventProbs[hits].formula += formula;
    eventProbs[hits].result += result;
  }
  return eventProbs;
}
function inclination(num, one, few, many) {
  let d = num % 100;
  if (d >= 10 && d < 20)
    return many;
  switch (num % 10) {
    case 0: case 5: case 6:
    case 7: case 8: case 9:
      return many;
    case 1:
      return one;
    default:
      return few;
  }
}
function formatNum(num) {
  var s = num.toFixed(6);
  var idx = s.lastIndexOf(".");
  if (idx >= 0) {
    var l = s.length - 1;
    while (l >= 0 && s.charAt(l) == "0")
      l--;
    if (l == idx)
      l--;
    s = s.slice(0, l + 1);
  }
  return s;
}
function setResultElement(resultId, element) {
  var parent = document.getElementById(resultId);
  if (parent.firstChild != null)
    parent.removeChild(parent.firstChild);
  parent.appendChild(element);
}
function setResultHTML(resultId, html) {
  var el = document.createElement('DIV');
  el.innerHTML = html;
  setResultElement(resultId, el);
}
function calcAndDisplayEventsProbability(tableId, resultId, zeroFmt, nonZeroFmt, inclinOne, inclinFew, inclinMany) {
  var accuracy = collectTestProbs(tableId);
  if (typeof accuracy == 'string')
    setResultHTML(resultId, accuracy);
  else {
    var probs = calcEventsProbability(accuracy);
    var text = "";
    for (var i = 0; i < probs.length; i++) {
      text += "Вероятность того, что ";
      if (i == 0)
        text += zeroFmt;
      else
        text += nonZeroFmt.replace("{count}", String(i)).replace("{name}", inclination(i, inclinOne, inclinFew, inclinMany));
      text += ", равна: ";
      text += "<br/>\n";
      text += "$$P_{" + String(i) + "} = " + probs[i].formula + " = ";
      if (probs[i].parts * accuracy.length >= 8)
        text += "\\\\ = ";
      text += probs[i].result + " = " + formatNum(probs[i].prob) + ".$$<br/>\n";
    }
    var el = document.createElement('DIV');
    el.innerHTML = text;
    MathJax.Hub.Typeset(el, function() { setResultElement(resultId, el); });
  }
}