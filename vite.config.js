import { resolve } from 'path'
import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                'index.html': './index.html',
                'quizz.html': './quizz.html',
                leaderboard: resolve(__dirname, 'leaderboard/index.html'),
            }
        }
    }
})