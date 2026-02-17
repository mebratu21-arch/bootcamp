export type Contact = {
  id: number;
  name: string;
  email: string;
};

export type ContactState = {
  contacts: Contact[];
};

export type ContactAction =
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'REMOVE_CONTACT'; payload: number };
