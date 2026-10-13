import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_INSTRUCTION } from "@/lib/systemInstruction";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// ============================================================
// Fungsi retry: coba panggil Gemini beberapa kali kalau gagal
// ============================================================
async function callGeminiWithRetry(fn: () => Promise<any>, maxRetry = 2) {
  for (let i = 0; i < maxRetry; i++) {
    try {
      return await fn();
    } catch (err: any) {
      console.warn(`Retry ${i + 1}/${maxRetry} gagal:`, err?.message);

      // Kalau error 429 (rate limit), tunggu lebih lama
      const isRateLimit = err?.message?.includes("429");
      const waitTime = isRateLimit ? Math.pow(2, i) * 2000 : 800;

      if (i === maxRetry - 1) throw err;
      await new Promise((r) => setTimeout(r, waitTime));
    }
  }
}

// ============================================================
// Handler POST: dipanggil dari frontend setiap kali user kirim pesan
// ============================================================
export async function POST(req: NextRequest) {
  try {
    const { message, previousInteractionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong ya 😊" },
        { status: 400 }
      );
    }

    // Panggil Gemini dengan retry
    const interaction = await callGeminiWithRetry(() =>
      ai.interactions.create({
        model: "gemini-3.8-flash", // ⬅️ model yang stabil
        input: message,
        system_instruction: SYSTEM_INSTRUCTION,
        ...(previousInteractionId && {
          previous_interaction_id: previousInteractionId,
        }),
      })
    );

    const reply =
      interaction.output_text ?? "Aduh, Kakak bingung. Coba tanya lagi ya 😅";

    return NextResponse.json({
      reply,
      interactionId: interaction.id,
    });
  } catch (error: any) {
    console.error("Gemini error:", error);

    // Pesan error yang lebih spesifik
    if (error?.message?.includes("429")) {
      return NextResponse.json(
        {
          error:
            "Kakak lagi sibuk banget nih, coba tanya lagi sebentar ya 😊",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Waduh, ada gangguan. Coba lagi ya 😅" },
      { status: 500 }
    );
  }
}