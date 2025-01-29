// Middleware to handle user on protected routes

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRouteForPayment = createRouteMatcher(['/payment'])

export default clerkMiddleware((auth, req) => {
  const { userId, redirectToSignIn } = auth()

  if (isProtectedRouteForPayment(req) && !userId) {
    // Redirect to sign-in if the user is not authenticated
    return redirectToSignIn()
  }

  // Continue processing if the user is authenticated
})