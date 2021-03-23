INSERT INTO store VALUES (1, 'UofT Bookstore');
INSERT INTO store VALUES (2, 'Tim Hortons');

INSERT INTO item VALUES (1, 'UofT hoodie', 1, 1);
INSERT INTO item VALUES (2, 'UofT hat', 1, 2);
INSERT INTO item VALUES (3, 'UofT T-shirt', 1, 3);

INSERT INTO variant VALUES (1, 1, 'White, S', 59.99, 34);
INSERT INTO variant VALUES (2, 1, 'White, L', 59.99, 52);
INSERT INTO variant VALUES (3, 2, 'Blue', 32.99, 15);
INSERT INTO variant VALUES (4, 3, 'Black', 27.99, 0);
INSERT INTO variant VALUES (5, 3, 'White', 27.99, 1);

INSERT INTO item_order VALUES (1, true, 1, 1, '2021-01-01 10:10:10');
INSERT INTO item_order VALUES (2, true, 3, 2, '2021-01-01 14:14:14');
