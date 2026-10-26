---
name: asgi-wsgi-auth-middleware
description: "Use when adding login protection to a FastAPI application that mounts a Flask or Dash WSGI app, where route dependencies do not cover mounted applications."
---
# Login Protection for FastAPI with Mounted WSGI Apps

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Enumerate every mounted ASGI and WSGI route, callback and authentication boundary. Do not assume outer framework route dependencies protect a separately mounted application.
2. Place an appropriately scoped pure ASGI authentication layer outside the protected mount. Verify middleware order against the installed framework and session implementation.
3. Use an explicit minimal public-path allowlist. Static assets and health endpoints are public only if reviewed as non-sensitive. Check a signed, appropriately protected session before protected HTTP traffic.
4. Test anonymous, valid, invalid and expired sessions against pages and callbacks, including path variants. Browser pages may redirect to login while API callers receive an appropriate unauthorized response. Handle other protocols explicitly rather than assuming HTTP checks cover WebSockets.
5. Obtain signing material from an authorized secret mechanism with no shipped default. Do not log credentials. Apply secure cookie settings, CSRF protection, bounded body parsing and rate limits appropriate to the deployment.
6. Verify real callback behavior and response semantics after wrapping, not just response size. Check form-parser dependencies and limits on the installed stack.

## Limits

Middleware does not replace authorization inside the application or tests of every protocol and mounted path.
