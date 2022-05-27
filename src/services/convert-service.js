export default class ConvertService {
  round(number, digits = 4) {
    return +(number).toFixed(digits);
  }
}