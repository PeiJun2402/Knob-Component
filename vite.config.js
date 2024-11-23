import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:"/Knob-Component/",
  css: {

    preprocessorOptions: {
    
      scss: {
      
        additionalData: `
        @import "./src/style/Partials/variable.scss";
        @import "./src/style/Partials/function.scss";
        @import "./src/style/Partials/font.scss";
        `, 
      
      },
    
    },
  
   }
})
