import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      
      if (isOnAdmin){
        if(isLoggedIn) { 
            return true
        }
        else{
          return Response.redirect(new URL('/login', nextUrl));
        }
      } 
      if (isOnLogin) {
          if(isLoggedIn){
            return Response.redirect(new URL('/admin', nextUrl))
          }
          else{
            return true
          } 
      }
    },
  },
  providers: [], 
} satisfies NextAuthConfig;