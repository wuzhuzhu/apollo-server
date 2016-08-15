import { property } from 'lodash';

export const schema = `
  type Author {
    name: String
    books: [Book]
  }
  
  type Book {
    name: String
    author: [Author]
  }
`;

export const resolvers = {
  Author: {
    books(author){
      return [
        { id: 1, title: 'A post'},
        { id: 2, title: 'Another post'}
      ]
    }
  },
  Book: {
    author(book){
      return { id: 1, name: 'HelloIn' }
    }
  },
};