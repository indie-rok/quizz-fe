import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                quizz: './quizz.html',
                leaderboard: './leaderboard.html',
                // ...
                // List all files you want in your build
            }
        }
    }
})