require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel(modelName) {
  console.log(`🔍 Test ediliyor: ${modelName}...`);
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Merhaba, çalışıyor musun?");
    console.log(`✅ BAŞARILI: ${modelName} modeli çalışıyor!`);
    return true;
  } catch (error) {
    console.log(`❌ HATA: ${modelName} çalışmadı. (Sebep: ${error.status || error.message})`);
    return false;
  }
}

async function runTests() {
  console.log("--- MODEL TARAMASI BAŞLIYOR ---");
  // En olası modelleri sırayla deniyoruz
  await testModel("gemini-1.5-flash");
  await testModel("gemini-pro");
  await testModel("gemini-1.0-pro");
  await testModel("gemini-1.5-pro");
}

runTests();