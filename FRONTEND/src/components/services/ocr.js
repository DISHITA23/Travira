import Tesseract from 'tesseract.js';

export const extractTextFromImage = async (imageFile) => {
  try {
    const result = await Tesseract.recognize(
      imageFile,
      'eng',
      {
        logger: (m) => console.log(m)
      }
    );
    return parseReceiptText(result.data.text);
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
};

const parseReceiptText = (text) => {
  // Simple parsing logic - can be enhanced with regex
  const lines = text.split('\n').filter(line => line.trim());
  
  // Try to find amount (look for currency symbols or numbers)
  const amountRegex = /₹?\s*(\d+[\d,]*\.?\d*)/;
  let amount = null;
  
  for (const line of lines) {
    const match = line.match(amountRegex);
    if (match && parseFloat(match[1].replace(/,/g, '')) > 0) {
      amount = parseFloat(match[1].replace(/,/g, ''));
      break;
    }
  }
  
  // Extract description (usually the first few lines)
  const description = lines.slice(0, 3).join(' ').substring(0, 100);
  
  return {
    description: description || 'Expense',
    amount: amount || 0,
    rawText: text
  };
};

export default { extractTextFromImage };