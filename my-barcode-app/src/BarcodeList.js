import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BarcodeList() {
  const [barcodes, setBarcodes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarcodes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/barcodes'); // 백엔드 API 호출
        setBarcodes(response.data);
      } catch (error) {
        console.error('Error fetching barcodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarcodes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Barcode List</h2>
      {barcodes ? (
        <pre>{JSON.stringify(barcodes, null, 2)}</pre>
      ) : (
        <p>No barcodes found.</p>
      )}
    </div>
  );
}

export default BarcodeList;
