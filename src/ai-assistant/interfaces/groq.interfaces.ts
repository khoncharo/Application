export interface IGroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface IGroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
