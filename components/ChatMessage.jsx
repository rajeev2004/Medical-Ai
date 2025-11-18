export default function ChatMessage({ msg }) {
  const time = new Date(msg.id).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const roleClass = msg.role === "user" ? "user" : "ai";

  return (
    <div className={`msg ${roleClass} fade-in`}>
      <div>{msg.text}</div>
      <div className="msg-meta">
        {msg.role === "user" ? "You" : "Med-AI"} · {time}
      </div>
    </div>
  );
}
