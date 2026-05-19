import { createServerFn } from "@tanstack/react-start";

type TranslateInput = {
  target: string;
  texts: string[];
};

const LANG_NAMES: Record<string, string> = {
  pt: "Portuguese (Portugal)",
  en: "English",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  zh: "Simplified Chinese",
  ar: "Lebanese Arabic (Lebanon dialect, natural and conversational)",
};

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator((data: TranslateInput) => data)
  .handler(async ({ data }) => {
    const { target, texts } = data;
    if (!texts.length) return { translations: [] as string[] };
    if (target === "pt") return { translations: texts };

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const languageName = LANG_NAMES[target] ?? target;
    const systemPrompt = `You are a professional translator. Translate each item of the JSON array from Portuguese to ${languageName}. Preserve meaning, tone, brand names (D.Tiba), punctuation and any line breaks. Do NOT translate emails, phone numbers, URLs, or proper nouns. Return ONLY a valid JSON array of the same length, in the same order, with the translated strings. No commentary, no markdown.`;

    const userPayload = JSON.stringify(texts);

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPayload },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`AI gateway error: ${res.status} ${errText}`);
    }
    const json = await res.json();
    const content: string = json?.choices?.[0]?.message?.content ?? "[]";
    const cleaned = content.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    let parsed: string[];
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      // Try to extract JSON array
      const match = cleaned.match(/\[[\s\S]*\]/);
      parsed = match ? JSON.parse(match[0]) : texts;
    }
    if (!Array.isArray(parsed) || parsed.length !== texts.length) {
      return { translations: texts };
    }
    return { translations: parsed.map((s) => String(s)) };
  });