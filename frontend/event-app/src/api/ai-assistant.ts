import { apiClient } from './client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function askAiAssistant(
  question: string,
  history: Message[] = [],
): Promise<string> {
  const res = await apiClient.post<{ answer: string }>('/assistant/ask', {
    question,
    history,
  });
  return res.data.answer;
}
