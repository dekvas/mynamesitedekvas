function checkDiscrDistr(params) {
  var P = 0.0;
  for (var i = 0; i < params.x.length; i++) {
    if (params.p[i] < 0 || params.p[i] > 1.0)
      return "Вероятность p<sub>" + (i + 1) + "</sub> должна быть от 0 до 1";
    P += params.p[i];
  }
  if (Math.abs(P - 1.0) > 1e-6)
    return "Сумма вероятностей p<sub>i</sub> должна равняться 1";
  return "";
}
function collectDiscrDistrParams(tableId) {
  let table = document.getElementById(tableId);
  let params = {error: ""};
  params.x = collectRowValues(table.rows[0], 1, "x<sub>{idx}</sub>");
  params.p = collectRowValues(table.rows[1], 1, "p<sub>{idx}</sub>");
  for (let i = 0; i < params.x.length; i++)
    if (isNaN(params.x[i])) {
	  params.error = params.x[i];
      break;
    }
  for (let i = 0; i < params.p.length; i++)
    if (isNaN(params.p[i])) {
	  params.error = params.p[i];
      break;
    }
  return params;
}
function formatDiscrDistrMean(params, result) {
  return "M(X) = \\sum_{i=1}^{" + params.x.length + "}{x_i \\cdot p_i} = " +
  formatRange(params.x.length, function(i) { return String(params.p[i]) + " \\cdot " + formatSignedValue(params.x[i]); }, " + ") + " = " + result.mo;
}
function formatDiscrDistrDisp(params, result) {
  return formatDiscrDistrMean(params, result) + "\\\\" +
    "D(X) = \\sum_{i=1}^{" + params.x.length + "}{x_i^2 \\cdot p_i} - \\left(M(X)\\right)^2 = " +
    formatRange(params.x.length, function(i) { return String(params.p[i]) + " \\cdot " + formatSignedValue(params.x[i]) + "^2"; }, " + ") + " - " + formatSignedValue(result.mo) + "^2 = " +
    result.disp;
}
function formatDiscrDistrDev(params, result) {
  return formatDiscrDistrDisp(params, result) + "\\\\" + "\\sigma(X) = \\sqrt{D(X)} = \\sqrt{" + result.disp + "} = " + result.dev;
}
function createDiscrDistrInput() {
  var input = document.createElement('INPUT');
  input.type = 'text';
  input.value = '0';
  input.size = 3;
  return input;
}
function buildDiscrDistrTable(k, valuesId) {
  var table = document.getElementById(valuesId);
  if (isNaN(k.value))
    return;
  var kVal = Math.floor(+k.value);
  if (kVal < 1)
    kVal = 1;
  if (kVal > 20)
    kVal = 20;
  for (var i = table.rows[0].cells.length; i <= kVal; i++) {
    table.rows[0].insertCell(i).appendChild(createDiscrDistrInput()); 
    table.rows[1].insertCell(i).appendChild(createDiscrDistrInput()); 
  }
  for (var i = table.rows[0].cells.length - 1; i >= kVal + 1; i--) {
    table.rows[0].deleteCell(i);
    table.rows[1].deleteCell(i);
  }
}