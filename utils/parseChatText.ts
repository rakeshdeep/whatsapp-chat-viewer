// utils/parseChatText.ts
export interface Message {
  date: Date;
  sender: string;
  content: string;
  isMedia: boolean;
}

export function parseChatText(text: string): Message[] {
  const lines = text.split("\n");
  const messages: Message[] = [];

  // Updated regex to handle your sample format
  const regex =
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s(\d{1,2}:\d{2}(?::\d{2})?)\s?(?:am|pm)\s?-\s(.+?):\s(.+)/i;

  for (const line of lines) {
    // Replace non-breaking spaces with regular spaces
    const cleanedLine = line.replace(/\u202F/g, " ");
    const match = cleanedLine.match(regex);

    if (match) {
      const [, dateStr, timeStr, sender, content] = match;
      const [day, month, year] = dateStr.split("/").map(Number);

      // Fix date parsing (assumes format DD/MM/YYYY or DD/MM/YY)
      const date = new Date(year < 100 ? 2000 + year : year, month - 1, day);
      date.setHours(
        parseInt(timeStr.split(":")[0]) +
          (timeStr.toLowerCase().includes("pm") ? 12 : 0),
        parseInt(timeStr.split(":")[1])
      );

      messages.push({
        date,
        sender: sender.trim(),
        content: content.trim(),
        isMedia:
          content.includes("<Media omitted>") ||
          content.startsWith("<attached:"),
      });
    }
  }

  return messages;
}
