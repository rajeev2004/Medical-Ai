import Head from "next/head";
import { useChatStore } from "../lib/store";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const clear = useChatStore((s) => s.clear);

  const mutation = useMutation({
    mutationFn: async (question) => {
      const { data } = await axios.post("/api/ai", { question });
      return data;
    },
  });

  const isLoading = mutation.isLoading;

  async function handleSend(text) {
    const userMsg = { role: "user", text };
    addMessage({ ...userMsg, time: Date.now() });

    try {
      const res = await mutation.mutateAsync(text);
      const aiText = res?.answer || "No response";
      addMessage({ role: "ai", text: aiText, time: Date.now() });
    } catch (err) {
      addMessage({
        role: "ai",
        text: "Error: failed to get response.",
        time: Date.now(),
      });
    }
  }

  return (
    <>
      <Head>
        <title>Medical AI Assistant — Demo</title>
      </Head>

      <main className="container py-12">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Medical AI Assistant (Demo)</h1>
          <p className="text-muted mt-2">
            Next.js · Tailwind · Zustand · React Query — demo for CellStrat
          </p>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Ask a medical question</h2>
              <p className="text-sm text-muted">
                This demo returns a placeholder AI response for showcase
                purposes.
              </p>
            </div>
            <div>
              <button
                onClick={() => clear()}
                className="text-sm text-muted hover:text-gray-700"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="chat-wrapper" style={{ minHeight: 240 }}>
            {messages.length === 0 ? (
              <div className="text-muted">
                No messages yet — ask a question to start.
              </div>
            ) : (
              messages.map((m) => <ChatMessage key={m.id} msg={m} />)
            )}
          </div>

          <div className="mt-6">
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </section>

        <footer className="text-center text-sm text-muted">
          Built with ❤️ for CellStrat-style stack demo · Repo / Live links in
          README
        </footer>
      </main>
    </>
  );
}
