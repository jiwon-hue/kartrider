import axios from 'axios';

async function dataRes(barcode) {
  try {
    const response = await axios.get(`https://port-0-barcode-backend-m331910a6bdfd054.sel4.cloudtype.app/get-barcode/${barcode}`);
    return response.data; // 데이터를 반환하여 다른 파일에서 사용 가능하게 함
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // 에러 발생 시 에러를 던져서 호출한 곳에서 처리하게 함
  }
}

export default dataRes;
