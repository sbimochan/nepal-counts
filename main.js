function convertNumber(number) {
  if (isNaN(number) || number === "") return "";
  const numberInIntlFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(number);
  const numberInNepalFormat = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR"
  }).format(number);
  return { numberInIntlFormat, numberInNepalFormat };
}

// Credit: https://codepen.io/ajitkayastha/pen/aLJLBY
function convertNumberToWords(num) {
  var ones = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen "
  ];
  var tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety"
  ];
  if ((num = num.toString()).length > 9)
    return "Overflow: Maximum 9 digits supported";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (ones[Number(n[1])] || tens[n[1][0]] + " " + ones[n[1][1]]) + "Crore "
      : "";
  str +=
    n[2] != 0
      ? (ones[Number(n[2])] || tens[n[2][0]] + " " + ones[n[2][1]]) + "Lakh "
      : "";
  str +=
    n[3] != 0
      ? (ones[Number(n[3])] || tens[n[3][0]] + " " + ones[n[3][1]]) +
        "Thousand "
      : "";
  str +=
    n[4] != 0
      ? (ones[Number(n[4])] || tens[n[4][0]] + " " + ones[n[4][1]]) + "Hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (ones[Number(n[5])] || tens[n[5][0]] + " " + ones[n[5][1]])
      : "";
  return str;
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("numberInput");
  const resultNodeUSD = document.getElementById("conversionResultUSD");
  const resultNodeNPR = document.getElementById("conversionResultNPR");
  const resultNodeNPRWords = document.getElementById(
    "conversionResultNPRWords"
  );

  input.addEventListener("input", function () {
    const val = input.value;
    if (val === "") {
      resultNodeUSD.textContent = "Please enter a decimal number.";
      return;
    }
    const result = convertNumber(val);
    const resultInWords = convertNumberToWords(val);

    resultNodeUSD.textContent = `The number in USD ${result.numberInIntlFormat}.`;
    resultNodeNPR.textContent = `The number in ${result.numberInNepalFormat}.`;
    resultNodeNPRWords.textContent = `In words: ${resultInWords}.`;
  });
});
