export interface Api {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: any[];
    question: string;
    type: string;
}
export interface ApiListMatch {
    amount: number;
    category?: number;
    difficulty?: string;
    encode?: string;
    type?: string;
}
export interface ApiCategory {
    id: number;
    name: string;
}
export interface ApiCategoryListMatch {
    id?: number;
    name?: string;
}
