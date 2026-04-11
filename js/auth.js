// ========================================================
// CLERK AUTHENTICATION — TaxForge
//
// Shared auth module loaded on every page. Handles:
//   - Clerk SDK loading and initialization
//   - Navigation auth state (Login/Register vs My Account/Logout)
//   - Logout
//   - Helper to get the current user's email
//
// SETUP: Replace the publishable key below with yours from
// https://dashboard.clerk.dev → Configure → API Keys
// ========================================================

const CLERK_PUBLISHABLE_KEY = 'pk_test_bWlnaHR5LXNwaWRlci02Mi5jbGVyay5hY2NvdW50cy5kZXYk';

/**
 * Load the Clerk SDK, initialize it, and update nav auth state.
 * Call this on every page. Returns the Clerk instance.
 *
 * Usage:
 *   initClerkAuth().then(clerk => { ... });
 */
async function initClerkAuth() {
  // Derive the Clerk frontend API domain from the publishable key
  // The key is pk_test_ or pk_live_ followed by base64-encoded domain
  var base64Part = CLERK_PUBLISHABLE_KEY.replace('pk_test_', '').replace('pk_live_', '');
  var frontendApi = atob(base64Part).replace(/\$$/, '');

  // Load Clerk JS SDK from Clerk's own CDN (includes UI components)
  await new Promise(function (resolve, reject) {
    if (window.Clerk) { resolve(); return; }
    var script = document.createElement('script');
    script.src = 'https://' + frontendApi + '/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
    script.setAttribute('data-clerk-publishable-key', CLERK_PUBLISHABLE_KEY);
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = resolve;
    script.onerror = function () { reject(new Error('Failed to load Clerk SDK')); };
    document.head.appendChild(script);
  });

  // Initialize Clerk (UI components are included via Clerk's CDN)
  // Handle both cases: Clerk auto-constructed (instance) or loaded as a class
  if (typeof window.Clerk === 'function' && !window.Clerk.load) {
    window.Clerk = new window.Clerk(CLERK_PUBLISHABLE_KEY);
  }
  await window.Clerk.load();
  window.clerkInstance = window.Clerk;

  // Update navigation to reflect auth state
  updateNavForAuth();

  return window.Clerk;
}

/**
 * Show/hide nav items based on whether the user is signed in.
 * Elements with class "nav-auth-guest" are shown when logged out.
 * Elements with class "nav-auth-user" are shown when logged in.
 */
function updateNavForAuth() {
  if (!window.Clerk) return;

  var isLoggedIn = !!window.Clerk.user;
  document.querySelectorAll('.nav-auth-guest').forEach(function (el) {
    el.style.display = isLoggedIn ? 'none' : '';
  });
  document.querySelectorAll('.nav-auth-user').forEach(function (el) {
    el.style.display = isLoggedIn ? '' : 'none';
  });
}

/**
 * Sign the user out and redirect to the homepage.
 * Named "logout" to match existing onclick="logout()" handlers in nav.
 */
async function logout() {
  if (window.Clerk) {
    await window.Clerk.signOut();
  }
  window.location.href = 'index.html';
}

/**
 * Get the current Clerk user's primary email address.
 * Returns empty string if not signed in.
 */
function getClerkUserEmail() {
  if (window.Clerk && window.Clerk.user && window.Clerk.user.primaryEmailAddress) {
    return window.Clerk.user.primaryEmailAddress.emailAddress;
  }
  return '';
}
