
import { GoogleGenAI, Type } from "@google/genai";

// Note: In a real prod app, this key comes from process.env.API_KEY
const API_KEY = process.env.API_KEY || ''; 

// Extended list of creative slogans to feel "AI generated" and dynamic on every refresh
const INSTANT_SLOGANS = [
  {
    line1: "عصر جدید هوش مصنوعی را با",
    line2: "اشتیاق: GODEX لمس کنید"
  },
  {
    line1: "مرزهای خلاقیت را با",
    line2: "قدرت بی‌نهایت GODEX بشکنید"
  },
  {
    line1: "فراتر از تصور، سریع‌تر از",
    line2: "اندیشه: آینده در دستان شماست"
  },
  {
    line1: "هوشی که جهان شما را",
    line2: "دوباره تعریف می‌کند"
  },
  {
    line1: "همکاری انسان و ماشین در",
    line2: "بالاترین سطح تکامل"
  },
  {
    line1: "رقص داده‌ها و منطق در",
    line2: "سمفونی هوش مصنوعی مدرن"
  },
  {
    line1: "نه فقط یک چت‌بات، بلکه",
    line2: "ذهنی برای تمام فصول"
  },
  {
    line1: "از رویا تا واقعیت، فقط",
    line2: "یک پرامپت فاصله است"
  },
  {
    line1: "درک عمیق، پاسخ سریع",
    line2: "تجربه‌ای فراتر از کلمات"
  },
  {
    line1: "معماری ذهن دیجیتال برای",
    line2: "خلق فردایی هوشمندتر"
  }
];

export const generateResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "این یک نسخه نمایشی است. برای دریافت پاسخ واقعی از هوش مصنوعی، لطفاً کلید API معتبر را در پیکربندی محیط (env) قرار دهید. \n\n(This is a demo response. Please configure process.env.API_KEY for real responses.)";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const modelName = 'gemini-3-pro-preview'; 

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    return response.text || "پاسخی دریافت نشد.";
  } catch (error) {
    console.error("GODEX API Error:", error);
    return "متأسفانه خطایی در برقراری ارتباط با سرور رخ داده است. لطفاً بعداً تلاش کنید.";
  }
};

export const generateSlogan = async (): Promise<{ line1: string; line2: string }> => {
  // INSTANT LOAD: Pick a random slogan immediately.
  // This removes the 2-3 second delay of the API call, making the hero section appear instantly.
  const random = INSTANT_SLOGANS[Math.floor(Math.random() * INSTANT_SLOGANS.length)];
  
  // Return immediately
  return Promise.resolve(random);
};