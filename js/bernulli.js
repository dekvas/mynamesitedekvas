function checkBernulli(params) {
  var res = checkCombination({n: params.n, k: params.k});
  if (res != "")
    return res;
  res = checkProbability(params.p, "p");
  if (res != "")
    return res;
  return "";
}
function formatBernulli(params, result) {
  return 'P=P_{' + params.n + '} (' + params.k + ')=C_{' + params.n + '}^{' + params.k + '} \\cdot {' + params.p + '}^{' + params.k + '} ' +
    '\\cdot {' + (+(1 - params.p).toFixed(10)) + ' }^{' + (params.n - params.k) + '} = ' + result.P;
}