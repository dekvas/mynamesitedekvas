function checkValueInteger(value, valueName) {
  var v = parseFloat(value);
  if ((v | 0) === v)
    return "";
  else
    return valueName + " должно быть целым";
}
function checkValueNonNegative(value, valueName) {
  if (+value < 0)
    return valueName + " должно быть неотрицательным";
  return "";
}
function checkValuePositive(value, valueName) {
  if (+value <= 0)
    return valueName + " должно быть положительным";
  return "";
}
function checkValueNotTooBig(value, valueName, max) {
  if (typeof max === "undefined")
    max = 1000;
  if (+value > max)
    return "Слишком большое " + valueName;
  return "";
}
function checkValueInRange(value, valueName, max) {
  var res = checkValueInteger(value, valueName);
  if (res == "")
    res = checkValueNonNegative(value, valueName);
  if (res == "")
    res = checkValueNotTooBig(value, valueName, max);
  return res;
}
function checkValueInRangePositive(value, valueName, max) {
  var res = checkValueInteger(value, valueName);
  if (res == "")
    res = checkValuePositive(value, valueName);
  if (res == "")
    res = checkValueNotTooBig(value, valueName, max);
  return res;
}
function checkProbability(value, valueName) {
  if (+value < 0)
    return valueName + " должно быть неотрицательным";
  if (+value > 1.0)
    return "Слишком большое " + valueName;
  return "";
}
function parseNumeric(str) {
  let val = str.replace(',', '.');
  if (isNaN(val))
    return false;
  else
    return +val;
}
function parseRational(str) {
  str = str.trim();
  const common = /^([+-]){0,1}0*(\d+)\/0*(\d+)$/i
  const decimal = /^([+-]){0,1}0*(\d+)([\.,]\d+){0,1}$/i
  let pq = str.match(common);
  if (pq != null)
	return {p: (pq[1] === undefined ? "" : pq[1]) + pq[2], q: pq[3], d: false};
  let dec = str.match(decimal);
  let res = null;
  if (dec != null) {
	let w = dec[1] === undefined ? dec[2] : dec[1] + dec[2];
	if (dec[3] === undefined)
	  return {p: w, q: "1", d: true};
    else
      return {p: w + dec[3].substr(1), q: "1" + "0".repeat(dec[3].length - 1), d: true};
  }
  return false;
}
function createValueInput() {
  var input = document.createElement('INPUT');
  input.type = 'text';
  input.value = '0';
  input.size = 3;
  return input;
}
function buildValuesRow(row, ofs, count) {
  for (let i = row.cells.length; i < ofs + count; i++)
    row.insertCell(i).appendChild(createValueInput());
  for (let i = row.cells.length - 1; i >= ofs + count; i--)
    row.deleteCell(i);
}
function collectRowValues(row, ofs, tagOfFmt) {
  let res = new Array(row.cells.length - ofs);
  for (let i = 0; i < res.length; i++) {
	res[i] = parseNumeric(row.cells[i + ofs].getElementsByTagName('input')[0].value);
	if (res[i] === false)
	  res[i] = tagOfFmt.replace("{idx}", i + 1);
  }
  return res;
}
function collectFieldParams(fieldsIds) {
  let params = {error: ""};
  for (let key in fieldsIds) {
    let el = document.getElementById(fieldsIds[key]);
    let val = parseNumeric(el.value, key);
    if (val === false)
      params.error = "Значение ${key} должно быть числом";
    else
      params[key] = +val;
  }
  return params;
}
function inclination(num, names) {
  switch (num % 10) {
    case 0: case 5: case 6:
    case 7: case 8: case 9:
      return names.many;
    case 1:
      return names.one;
    case 2: case 3: case 4:
      return names.few;
  }
}
function formatRange(count, funcGet, separator) {
  if (count <= 0)
    return "";
  var result = funcGet(0);
  if (count > 6) {
    for (var i = 1; i < 3; i++)
      result += separator + String(funcGet(i));
    result += separator + " ... ";
    for (var i = count - 3; i < count; i++)
      result += separator + String(funcGet(i));
  }
  else
    for (var i = 1; i < count; i++)
      result += separator + String(funcGet(i));
  return result;
}
function formatMultRange(from, to) {
  if (from > to)
    return "1";
  else
    return formatRange(to - from + 1, function(i) { return from + i; }, " \\cdot ");
}
function formatSignedValue(value) {
  if (value < 0)
    return "(" + String(value) + ")";
  else
    return String(value);
}
function removeLeadingZeroes(num) {
  const leadingZeroes = /^([+-]){0,1}0*(\d+)$/i;
  let parts = num.match(leadingZeroes);
  if (parts == null)
    return num;
  else
    return (parts[1] !== undefined ? parts[1] : "") + parts[2];
}
function formatRational(r) {
  const dec = /^10*$/i;
  let neg = r.p.at(0) == '-';
  let p = r.p.at(0) == '-' || r.p.at(0) == '+' ? r.p.substr(1) : r.p;
  let q = "";
  if (r.d && r.q.match(dec) != null) {
	if (r.q.length > 1) {
	  let pad = r.q.length - p.length;
	  if (pad > 0)
        p = "0".repeat(pad) + p;
      let whole = p.length - (r.q.length - 1);
      p = p.substr(0, whole) + '.' + p.substr(whole);
	}
  }
  else
	q = r.q;
  if (neg)
    p = "(" + p +")";
  if (q == "")
    return p;
  else {
    return `\\frac{${removeLeadingZeroes(p)}}{${removeLeadingZeroes(q)}}`;
  }
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
function calcRequestArray(action, paramsArray, resultId, funcCheck, funcFormat) {
  var checkResult = '';
  for (var i = 0; i < paramsArray.length; i++) {
    checkResult = paramsArray[i].error;
    if (checkResult != '')
      break;
    checkResult = funcCheck(paramsArray[i]);
    if (checkResult != '')
      break;
  }
  if (checkResult == '') {
    setResultHTML(resultId, 'Вычисление...');
    var url = "math_calc.php";
    var resultArray = [];
    var counter = {total: 0, error: false};
    for (var i = 0; i < paramsArray.length; i++) {
      var queryParams = paramsArray[i];
      queryParams.action = action;
      queryParams.ajax = '1';
      var jqXHR = $.get(url, queryParams);
      jqXHR.idx = i;
      jqXHR.done(
          function (data, queryResult, jqXHR) {
            if (counter.error)
              return;
            var result = $.parseJSON(data);
            if (result.error !== undefined) {
              setResultHTML(resultId, result.error);
              counter.error = true;
            }
            else {
              resultArray[jqXHR.idx] = result;
              counter.total++;
              if (counter.total == paramsArray.length) {
                var el = document.createElement('DIV');
                el.innerHTML = "$$\n" + funcFormat(paramsArray, resultArray) + "\n$$\n";
                MathJax.Hub.Typeset(el, function() { setResultElement(resultId, el); });
              }
            }
          }
        );
    }
  }
  else
    setResultHTML(resultId, checkResult);
}
function calcRequest(action, params, resultId, funcCheck, funcFormat) {
  var paramsArray = [params];
  calcRequestArray(
    action, paramsArray, resultId, funcCheck,
    function(paramsArray, resultArray) {
      return funcFormat(paramsArray[0], resultArray[0]);
    }
  );
}