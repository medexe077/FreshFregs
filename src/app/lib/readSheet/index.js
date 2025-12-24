import { google } from "googleapis";

export const testConnection = async () => {
  console.log('Testing Google API connection...');
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    
    const client = await auth.getClient();
    console.log('✓ Authentication successful!');
    return true;
  } catch (error) {
    console.error('✗ Authentication failed:', error.message);
    return false;
  }
};
export const getSheetsData = async () => {
  console.log('=== ENV VARIABLES CHECK ===');
  console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  console.log('GOOGLE_PRIVATE_KEY exists:', !!process.env.GOOGLE_PRIVATE_KEY);
  console.log('GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID);
  console.log('========================');
  
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ 
      version: "v4",
      auth: await auth.getClient() 
    });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Sheet1!A1:Q";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('No data found in Google Sheets');
      return [];
    }

    const dataRows = rows.slice(1);
    
    const fragrances = dataRows.map((row, index) => {
      return {
        id: row[0] || `perfume-${index + 1}`,
        name: row[1] || '',
        brand: row[2] || '',
        price: parseFloat(row[3]) || 0,
        originalPrice: parseFloat(row[4]) || 0,
        image: row[5] || '',
        category: row[6] || 'unisex',
        type: row[7] || 'fresh',
        isBestSeller: row[8]?.toString().toLowerCase() === 'true',
        isNew: row[9]?.toString().toLowerCase() === 'true',
        description: row[10] || '',
        notes: {
          top: row[11]?.split(',').map(note => note.trim()) || [],
          middle: row[12]?.split(',').map(note => note.trim()) || [],
          base: row[13]?.split(',').map(note => note.trim()) || [],
        },
        longevity: row[14] || '8-10 hours',
        sillage: row[15] || 'Moderate',
        occasion: row[16]?.split(',').map(occ => occ.trim()) || [],
      };
    });

    return fragrances;

  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return [];
  }
};

export const getProducts = async () => {
  return await getSheetsData();
};

export const getBestSellers = async () => {
  const fragrances = await getSheetsData();
  return fragrances.filter(f => f.isBestSeller);
};

export const getNewArrivals = async () => {
  const fragrances = await getSheetsData();
  return fragrances.filter(f => f.isNew);
};

export const getProductById = async (id) => {
  const fragrances = await getSheetsData();
  return fragrances.find(f => f.id === id);
};

export const getProductsByCategory = async (category) => {
  const fragrances = await getSheetsData();
  return fragrances.filter(f => f.category === category);
};

export const getProductsByType = async (type) => {
  const fragrances = await getSheetsData();
  return fragrances.filter(f => f.type === type);
};

export const getSimilarProducts = async (product, limit = 4) => {
  const fragrances = await getSheetsData();
  return fragrances
    .filter(f => f.id !== product.id && (f.type === product.type || f.category === product.category))
    .slice(0, limit);
};