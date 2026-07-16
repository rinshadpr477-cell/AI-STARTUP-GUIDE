export function FormattedAnswer({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const blocks: React.ReactNode[] = [];
  let currentList: string[] = [];

  function flushList(key: string) {
    if (currentList.length > 0) {
      blocks.push(
        <ul key={key} className="list-disc space-y-1 pl-5">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>,
      );
      currentList = [];
    }
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      flushList(`list-${index}`);
      blocks.push(
        <h3 key={index} className="mt-4 font-medium first:mt-0">
          {trimmed.replace(/^##\s+/, "")}
        </h3>,
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.replace(/^[-*]\s+/, ""));
    } else {
      flushList(`list-${index}`);
      blocks.push(
        <p key={index} className="leading-relaxed">
          {trimmed.replace(/^#+\s*/, "")}
        </p>,
      );
    }
  });
  flushList("list-final");

  return <div className="space-y-2 text-foreground/90">{blocks}</div>;
}