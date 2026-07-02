package com.smarttravel.smart_travel.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS Configuration
 * Allows cross-origin requests from frontend
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/")
                .allowedOrigins(
                        "http://localhost:5173",      // Vite dev server
                        "http://localhost:3000",      // React dev server
                        "http://localhost:4173",      // Vite preview
                        "https://your-vercel-app.vercel.app"  // Production frontend
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
}
}