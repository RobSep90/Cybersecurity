import { Hono } from "https://deno.land/x/hono/mod.ts";
import { registerUser } from "./routes/register.js";
import { loginUser } from "./routes/login.js";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

const app = new Hono();

// *** Lisää CSP middleware tähän ***
app.use('*', async (c, next) => {
    await next();
    c.res.headers.set('Content-Security-Policy', "default-src 'none'; script-src 'self'; img-src 'self'; style-src 'self'; frame-ancestors 'none'; form-action 'self';");
  });
  
  // Serve static files from the /static directory
  app.use('/static/*', serveStatic({ root: '.' }));

// Serve static files from the /static directory
app.use('/static/*', serveStatic({ root: '.' }));

// Serve the index page
app.get('/', async (c) => {
    return c.html(await Deno.readTextFile('./views/index.html'));
});

// Serve the registration form
app.get('/register', async (c) => {
    return c.html(await Deno.readTextFile('./views/register.html'));
});

// Route for user registration (POST request)
app.post('/register', registerUser);

// Serve login page
app.get('/login', async (c) => {
    return c.html(await Deno.readTextFile('./views/login.html')); // Use the login.html file
});

// Handle user login
app.post('/login', loginUser);

Deno.serve(app.fetch);
// Run the app using the command:
// deno run --allow-net --allow-env --allow-read --watch app.js
