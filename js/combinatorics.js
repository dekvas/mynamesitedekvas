function checkCombination(params, nName, kName) {
  nName = typeof nName !== "undefined" ? nName : "n";
  kName = typeof kName !== "undefined" ? kName : "k";
  let res = checkValueInRange(params.k, kName);
  if (res == "")
    res = checkValueInRange(params.n, nName);
  if (res == "" && +params.k > +params.n)
    res = kName + " не может быть больше " + nName;
  return res;
}
function formatCombination(params, result) {
  return "C_{" + params.n + "}^{" + params.k + "} = \\frac{" + params.n + "!}{" + params.k + "! \\cdot (" + params.n + "-" + params.k +")!} = " +
    "\\frac{" + params.n + "!}{" + params.k + "! \\cdot " + (params.n - params.k) + "!} = " +
    "\\frac{" + formatMultRange(Math.max(params.n - params.k, params.k) + 1, params.n) + "}{" + formatMultRange(1, Math.min(params.n - params.k, params.k)) + "} = " +
    String(result.value);
}