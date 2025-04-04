# **A tmdb-proxy-server**  
A simple proxy for the TMDB API using **Vercel Serverless Functions**.

## **Setup**  
This proxy requires a **TMDB_API_KEY** environment variable. You can set this up via **Vercel** or a **.env file**.

- **Vercel Environment Variables:** [Docs](https://vercel.com/docs/build-step#environment-variables)  
- **Get a TMDB API Key:** [TMDB API Docs](https://developers.themoviedb.org/3/getting-started/introduction)

📌 **Note:** In India, TMDB is banned or not working in some regions. Using this proxy can be a good way to bypass those restrictions.

---

## **Local Development**  
To run the Vercel serverless function locally:  

1. **Install dependencies:**  
   ```sh
   npm install
   ```
2. **Link your project to Vercel:**  
   ```sh
   vercel
   ```
3. **Pull environment variables from Vercel:**  
   ```sh
   vercel env pull
   ```
4. **Run the server locally:**  
   ```sh
   vercel dev
   ```
   **Or specify a port:**  
   ```sh
   vercel dev --listen 5000
   ```

---

## **Deployment**  
To deploy the proxy on Vercel, simply run:  
```sh
vercel --prod
```

Now, your API will be available at:  
```
https://your-vercel-deployment/api/tmdb?path=movie/popular
```

🚀 Happy coding!

