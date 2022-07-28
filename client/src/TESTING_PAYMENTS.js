export const TESTING_PAYMENTS = [
  {
    ID: 1,
    purchasedBooks: [
      {
        ID: 1,
        title: "harry potter",
        price: 200,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
        authors: ["JK Rowling"],
        categories: ["Magic"],
      },
    ],
    userInfo: {
      userID: 10,
      username: "fran.etcheverri",
    },
    purchaseDate: "2022-07-28",
  },
  {
    ID: 2,
    purchasedBooks: [
      {
        ID: 2,
        title: "sherlock holmes",
        price: 20000,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
        authors: ["Arthur Conan Doyle"],
        categories: ["Detective"],
      },
    ],
    userInfo: {
      userID: 9,
      username: "quique",
    },
    purchaseDate: "2022-07-28",
  },
  {
    ID: 3,
    purchasedBooks: [
      {
        ID: 3,
        title: "some book",
        price: 100,
        image:
          "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
        authors: ["new author"],
        categories: ["SomeCategory"],
      },
    ],
    userInfo: {
      userID: 8,
      username: "moro.aldo",
    },
    purchaseDate: "2022-07-28",
  },
];
