import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_INSTRUCTION } from "@/lib/systemInstruction";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { message, previousInteractionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong ya 😊" },
        { status: 400 }
      );
    }

    // Panggil Gemini dengan API Interactions terbaru
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: message,
      system_instruction: SYSTEM_INSTRUCTION,
      // Kalau ada riwayat percakapan sebelumnya, lanjutkan
      ...(previousInteractionId && {
        previous_interaction_id: previousInteractionId,
      }),
    });

    const reply =
      interaction.output_text ??
      "Aduh, Kakak bingung. Coba tanya lagi ya 😅";

    return NextResponse.json({
      reply,
      interactionId: interaction.id, // simpan untuk percakapan berikutnya
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Waduh, ada gangguan. Coba lagi ya 😅" },
      { status: 500 }
    );
  }
}