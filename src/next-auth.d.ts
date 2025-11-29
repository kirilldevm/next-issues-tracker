import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      /** The user's postal address. */
      // id: string;
      // role: UserRole;
      // isTwoFactorEnabled: boolean;
      // isOAuth: boolean;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}

// import 'next-auth/jwt';

// declare module 'next-auth/jwt' {
//   /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//   }
// }
