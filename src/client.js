import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link"; // GraphQLサーバーへのhttpリクエストのheaderのAuthorizationにトークンを設定する為のclass
import { HttpLink } from "apollo-link-http"; // GraphQLサーバーと接続するlinkの設定をする為のclass
import { InMemoryCache } from "apollo-cache-inmemory"; // ApolloClientのcacheの設定をする為のclass

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const headersLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
  return forward(operation);
});

// エンドポイントの設定
const endpoint = "https://api.github.com/graphql";
const httpLink = new HttpLink({ uri: endpoint });
const link = ApolloLink.from([headersLink, httpLink])

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
