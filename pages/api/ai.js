export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body || {};

  await new Promise((r) => setTimeout(r, 900));

  const safeQ = (question || "").trim();
  const answer = safeQ
    ? `Placeholder AI: Based on your question "${safeQ}", some common considerations are: 1) check symptoms and severity; 2) consult a clinician if symptoms persist; 3) do not take unprescribed medicines. (Demo response)`
    : "Placeholder AI: Please provide a specific medical question.";

  return res.status(200).json({ answer, source: "demo-ai-v1" });
}
