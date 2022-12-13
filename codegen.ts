
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://natuprime.saleor.cloud/graphql/",
  documents: "graphql/**/*.graphql",
  generates: {
    "saleor/api": {
      preset: "client",
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'typescript-apollo-client-helpers'
      ]
    }
  }
};

export default config;
