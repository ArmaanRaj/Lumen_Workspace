import { clerkMiddleware , createRouteMatcher } from "@clerk/nextjs/server";
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};



const protectedRoutes = createRouteMatcher([
  '/',
  '/meeting/(.*)',
  '/personal-room',
  '/previous',
  '/recordings',
  '/upcoming',

]);

export default clerkMiddleware((auth, req) => {
  if (protectedRoutes(req)) auth().protect();
});
