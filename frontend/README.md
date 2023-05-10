# Frontend

O Frontend do aplicativo é feito com React.js e algumas bibliotecas adicionais
- Chakra-UI
- Bootstrap
- Date-fns
- JWT Decode
- MUI
- react-pro-sidebar
- Router-Dom

## Sidebar
Usando uma biblioteca já pronta fazemos a configuração da sidebar interativa, para isso temos que inserir o aplicativo dentro de um provider

```sh
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { ProSidebarProvider } from 'react-pro-sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ProSidebarProvider>
        <App />
    </ProSidebarProvider
    );
```

## ChakraUI

Para conseguirmos acessar os componentes da biblioteca do Chakra temos que inserir o aplicativo dentro de outro provider
```sh
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { ProSidebarProvider } from 'react-pro-sidebar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProSidebarProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ProSidebarProvider>

);
```


## Autenticação

A autenticação dos usuários é feita por tokens JWT, ao fazer o login armazenamos o retorno do token nop localstorage`

```sh
localStorage.setItem('token', JSON.stringify(token.token))
```

agora podemos usar o locastorage para receber o token em qualquer tela que vá usar ele para fazer uma requisição na API

```sh
  useEffect(() => {
    const tokenString = localStorage.getItem('token')
    const userToken = JSON.parse(tokenString)

    setToken(userToken)
  }, []);
```

Agora podemos ultilizar o token no storage para receber as informações que passamos pela API

```sh
jwt_decode(token).role ## Retorna a role guardada no token
```

## Router

Para fazer o gerenciamento das rotas usamos um Router para poder criar as rotas e linkar com as páginas necessárias

```sh
<BrowserRouter className="Layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barbeiros" element={<Barbeiros />} />
            <Route path="/horarios" element={<Horarios />} />
          </Routes>
        </BrowserRouter>
```

## Fetch

Para ultilizarmos a API usamos fetch dentro do React, passamos o token para a header x-access-token para conseguirmos usar a autenticação da API

```sh
fetch('http://localhost:3001/api/barbeiros/', 
    {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': userToken}})
          .then(response => response.json())
          .then(data => setData(data))

```
