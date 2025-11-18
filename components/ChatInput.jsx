import { useState } from "react";

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e?.preventDefault();
    const text = value.trim();
    if (!text || isLoading) return;
    onSend(text);
    setValue("");
  }

  return (
    <form className="chat-input" onSubmit={submit}>
      <input
        className="input-field"
        placeholder="Type a medical question — e.g. 'What causes persistent headaches?'"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="px-4 py-2 rounded-md bg-primary-500 text-white"
      >
        {isLoading ? "Thinking..." : "Ask AI"}
      </button>
    </form>
  );
}
