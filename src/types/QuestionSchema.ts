export type QuestionSchema = {
  id: string;
  description: string;
  type: 'CHECKBOX' | 'RADIO' | 'TEXT';
  order: number;
  testId: string;
};
