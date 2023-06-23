export type Question = {
  completed: boolean;
  value: string;
  question: string;
  answer: string;
};

export type Category = {
  id: string;
  title: string;
};

export type Column = {
  category: Category;
  questions: Map<number, Question>;
};

export type Board = {
  //first index is the category id, second index is the score
  //   board: Map<number, Column>;
  categories: Array<Category>;
  questions: Array<Array<Question>>;
};
