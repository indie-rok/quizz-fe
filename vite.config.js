import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                'index.html': './index.html',
                'quizz.html': './quizz.html',
                'leaderboard.html': './leaderboard.html',
                'l1': './l1.js',
            }
        }
    }
})