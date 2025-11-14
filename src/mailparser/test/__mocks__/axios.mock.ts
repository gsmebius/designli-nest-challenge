export const mockAxiosGet = jest.fn().mockImplementation(async (url: string) => {
  const baseJson = (data: any) => ({
    data,
    headers: { 'content-type': 'application/json' }, // 👈 FIX
  });

  if (url.endsWith('attachment1.json')) {
    return baseJson({ ok: true, message: 'JSON como attachment 1' });
  }
  if (url.endsWith('attachment2.json')) {
    return baseJson({ ok: true, message: 'JSON como attachment 2' });
  }
  if (url.endsWith('/posts/1')) {
    return baseJson({
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    });
  }
  if (url.endsWith('/todos/1')) {
    return baseJson({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });
  }
  if (url.endsWith('/users/1')) {
    return baseJson({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    });
  }

  throw new Error(`URL no reconocida: ${url}`);
});
