import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                quizz: './quizz.html',
                leaderboard: './leaderboard.html',
                leaderboard1: './leaderboard1.js'
                // ...
                // List all files you want in your build
            }
        }
    }
})