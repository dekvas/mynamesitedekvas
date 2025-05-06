function check2ColorSelection(params) {
  var res = checkCombination({n: params.N, k: params.n}, "N", "n");
  if (res != "")
    return res;
  res = checkCombination({n: params.N - params.K, k: params.n - params.k}, "N - K", "n - k");
  if (res != "")
    return res;
  res = checkCombination({n: params.K, k: params.k}, "K", "k");
  if (res != "")
    return res;
  return "";
}
function format2ColorSelection(params, result, pattern, kKind, nmkKind, item) {
  var kName = inclination(params.K, kKind);
  var nmkName = inclination(params.N - params.K, nmkKind);
  var itemName = inclination(params.N - params.K, item);
  var descr = pattern.replace('{n}', params.n).replace('{k}', params.k).replace('{nmk}', params.n - params.k).replace('{kKind}', kName).
    replace('{nmkKind}', nmkName).replace('{nItem}', inclination(params.n, item)).replace('{kItem}', inclination(params.k, item)).
    replace('{nmkItem}', inclination(params.n - params.k, item));
  return "$$Вероятность того, что " + descr + ", равна:<br/>" +
    "$$P = \\frac{C_K^k \\cdot C_{N-K}^{n-k}}{C_N^n} = \\frac{C_{" + params.K + "}^{" + params.k + "} \\cdot C_{" +
    (params.N - params.K) + "}^{" + (params.n - params.k) + "}}{C_{" + params.N + "}^{" + params.n + "}} = " +
    "\\frac{" + result.Ck + " \\cdot " + result.Cnmk + "}{" + result.Cn + "} = " + result.P + "$$<br/>" +
    "<p>Здесь <a href=\"tvart_sub.php?p=calc_C\">сочетания</a> вычислены следующим образом:</p>$$" +
    formatCombination({n: params.K, k: params.k}, {value: result.Ck}) + " \\\\" +
    formatCombination({n: params.N - params.K, k: params.n - params.k}, {value: result.Cnmk}) + " \\\\" +
    formatCombination({n: params.N, k: params.n}, {value: result.Cn});
}
function calc2ColorSelectionN(nId, kId, nmkId) {
  var k = document.getElementById(kId).value;
  if (isNaN(k))
    return;
  var nmk = document.getElementById(nmkId).value;
  if (isNaN(nmk))
    return;
  document.getElementById(nId).value = +nmk + +k;
}
function calc2ColorSelectionNmK(nId, kId, nmkId) {
  var n = document.getElementById(nId).value;
  if (isNaN(n))
    return;
  var k = document.getElementById(kId).value;
  if (isNaN(k))
    return;
  document.getElementById(nmkId).value = +n - +k;
}