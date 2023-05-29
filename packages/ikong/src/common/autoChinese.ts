const numberText = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

function getIntString(nIntNumber: string, units: string[]) {
  if (nIntNumber === "0") return numberText[0];
  const nArray = nIntNumber.split("");
  let returnString = "";
  let uid = 3;
  let index = -1;
  let zero1 = true;
  let zero2 = false;
  for (let i = nArray.length - 1; i >= 0; i--) {
    const oneString = nArray[i];
    const oneNumber = parseInt(oneString);
    const oneChinese = numberText[oneNumber];
    const oneUnit = units[++index] || "";

    if (index >= 4) {
      if (zero1) returnString = returnString.substr(1);
      uid++;
      index = 0;
      zero1 = true;
      zero2 = false;
      returnString = units[uid] + returnString;
    }
    if (oneString === "0" && zero1) continue;
    zero1 = false;
    if (index == 0) {
      returnString = oneChinese + oneUnit + returnString;
      continue;
    } else if (index == 1) {
      if (oneString === "1" && i == 0) {
        returnString = oneUnit + returnString;
        continue;
      }
    }
    if (oneString === "0") {
      if (zero2) continue;
      returnString = oneChinese + returnString;
      zero2 = true;
    } else {
      returnString = oneChinese + oneUnit + returnString;
    }
  }
  return returnString;
}
const numberUnit = [
  "",
  "十",
  "百",
  "千",
  "万",
  "亿",
  "兆",
  "京",
  "垓",
  "秭",
  "穣",
  "沟",
  "涧",
  "正",
  "载",
  "极",
];
export default function autoChinese(value: number) {
  if (numberText[value]) return numberText[value];
  const nString = Math.abs(value).toString();
  const [nIntNumber, nFloatNumber] = nString.split(".");
  const prefix = value < 0 ? "负" : "";
  const intString = prefix + getIntString(nIntNumber, numberUnit);
  return prefix + intString;
}

// const SerialNumberEnums = {
//   english: 'abcdefghijklmnopqrstuvwxyz',
//   upperEnglish: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//   greek: 'αβγδεζηθικλμνξοπρςτυφχψω',
//   upperGreek: 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
//   number: '0123456789',
//   number0: '⓪①②③④⑤⑥⑦⑧⑨',
//   number0limit: '⓪①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳㊴㊵㊶㊷㊸㊹㊺㊻㊼㊽㊾㊿',
//   english0: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
//   upperEnglish0: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'
// }
// Number.prototype.toN = function(str) {
//   const used = SerialNumberEnums[str] || str
//   let num = this;
//   const level = used.length;
//   const r = []; // 结果
//   // 要转换的数字循环除进制，直到数字小于进制
//   while (num >= level) {
//     r.push(num % level);
//     num = (num - r[r.length - 1]) / level;
//   }
//   r.push(num); // 最后一位放到结果里
//   // 将结果倒置
//   for (let i = 0; i < (r.length - 1) / 2; i++) {
//     // 数字交换
//     r[i] += r[r.length - 1 - i];
//     r[r.length - 1 - i] = r[i] - r[r.length - 1 - i];
//     r[i] -= r[r.length - 1 - i];
//   }

//   return r.map(e => used[e]).join('');
// }
// const SerialNumberEnumsKeys = ['english','upperEnglish','greek','upperGreek','number0','english0','upperEnglish0', 'number0limit']
// String.prototype.inN = function(delimiter) {
//   const [start, end] = this.split(delimiter);
//   if(start && start === end) return [start];
//   if(!isNaN(start) && !isNaN(end)){
//     const indexStart = start * 1;
//     const indexEnd = end * 1;
//     if(indexStart === indexEnd) return [indexStart];
//     if(indexStart < indexEnd){
//       return Array.apply(null,{length:indexEnd - indexStart + 1}).map((_,i)=>i+indexStart)
//     }else if(indexStart > indexEnd){
//       return Array.apply(null,{length:indexStart - indexEnd + 1}).map((_,i)=>i+indexEnd).reverse()
//     }else{
//       return [indexStart];
//     }
//   }
//   for(let i = 0 ;i <SerialNumberEnumsKeys.length;i++){
//     const type = SerialNumberEnumsKeys[i];
//     const SerialNumber = SerialNumberEnums[type];
//     const iStart = start ? SerialNumber.indexOf(start) : 0;
//     const iEnd = end ? SerialNumber.indexOf(end) : SerialNumber.length - 1;
//     if(iStart !== -1 && iEnd !== -1){
//       if(iStart < iEnd){
//         return SerialNumber.slice(iStart,iEnd+1).split('')
//       }else{
//         return  SerialNumber.slice(iEnd,iStart+1).split('').reverse()
//       }
//     }
//   }
//   return [];
// };
