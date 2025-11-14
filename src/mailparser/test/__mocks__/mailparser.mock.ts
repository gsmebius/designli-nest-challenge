export const parsedMailMock = {
  text: `
    Aquí hay algunos links:
    https://jsonplaceholder.typicode.com/posts/1
    https://jsonplaceholder.typicode.com/todos/1
    https://jsonplaceholder.typicode.com/users/1
  `,
  html: `
    <p>Este es un cuerpo HTML con links:</p>
    <a href="https://example.com/attachment1.json">Link JSON 1</a>
    <a href="https://example.com/attachment2.json">Link JSON 2</a>
  `,
  attachments: [],
};
