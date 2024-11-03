const express = require('express');
const cors = require('cors'); // CORS 모듈 추가
const firebaseAdmin = require('firebase-admin');
const fs = require('fs');
const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

// Firebase 관리자 인증키 설정
const serviceAccount = require('./serviceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://server1-5ff85-default-rtdb.firebaseio.com'
});

const db = firebaseAdmin.database();
app.use(express.json());


// 기본 경로 설정
app.get('/', (req, res) => {
  res.send('Server is running★');
});

// 바코드 데이터 설정 및 조회 경로
app.get('/barcodes', async (req, res) => {
  try {
    const snapshot = await db.ref('barcodes').once('value');
    if (snapshot.exists()) {
      res.send(snapshot.val());
    } else {
      res.status(404).send({ error: 'No barcodes found' });
    }
  } catch (error) {
    console.error('Error retrieving barcodes:', error);
    res.status(500).send({ error: error.message });
  }
});
// 엔드포인트
app.get('/get-barcode/:barcode', async (req, res) => {
  const barcode = req.params.barcode; // URL에서 바코드 가져오기
  try {
    const snapshot = await db.ref('barcodes/' + barcode).once('value');
    if (snapshot.exists()) {
      res.send(snapshot.val()); // 바코드 데이터 반환
    } else {
      res.status(404).send({ error: 'Barcode not found' });
    }
  } catch (error) {
    console.error('Error retrieving barcode:', error);
    res.status(500).send({ error: error.message });
  }
});


// JSON 파일에서 데이터를 불러와 Firebase에 저장하는 함수
async function saveProductsFromFile() {
  try {
    // barcode_input.json 파일 읽기
    const data = fs.readFileSync('./barcode_input.json', 'utf-8');
    const { products } = JSON.parse(data); // JSON 데이터 파싱하여 products 배열 가져오기

    const savePromises = products.map(async (product) => {
      const barcodeKey = product.barcode;

      // 중복 체크: Firebase에 동일한 바코드 키가 있는지 확인
      const existingDataSnapshot = await db.ref('barcodes/' + barcodeKey).once('value');
      if (existingDataSnapshot.exists()) {
        console.log(`Barcode ${barcodeKey} already exists - Skipping`);
        return; // 이미 존재하면 저장하지 않음
      }

      // 중복이 아닐 경우 데이터 저장
      return db.ref('barcodes/' + barcodeKey).set({
        barcode: product.barcode,
        description: product.description,
        price: product.price,
      });
    });

    await Promise.all(savePromises);
    console.log('All unique products from file have been saved successfully with custom keys.');
  } catch (error) {
    console.error('Error saving products from file:', error);
  }
}

// 데이터 저장 경로 추가 (필요할 때 호출)
app.post('/save-products', async (req, res) => {
  try {
    await saveProductsFromFile();
    res.send({ message: 'Products saved successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error saving products' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
