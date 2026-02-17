export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
}

export interface ApiResponse {
  numFound: number;
  docs: Book[];
}

export interface FormState {
  step: 1 | 2 | 3;
  formData: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  errors: Partial<Record<keyof FormState['formData'], string>>;
}
