const dataRes = require('./database'); // database.js 파일에서 함수 가져오기

const barcode = '8801043014786'; //인식할 바코드 번호가 8801043014786이라 가정

async function main() {
try {
  const data = await dataRes(barcode); //함수 dataReponse에서 123번 상품 정보를 불러옴
  console.log('Fetched data:', data); // 데이터 전체 정보
  console.log('Barcode:', data.barcode); //바코드 번호 키 정보
  console.log('Description:', data.description); //상품명 키 정보
  console.log('Price:', data.price); //가격 키 정보
  } 
catch (error) {
  console.error('Error in main function:', error.message);
  } }
  
main()

//node resEx.js