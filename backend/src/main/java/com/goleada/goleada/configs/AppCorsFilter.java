package com.goleada.goleada.configs;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class AppCorsFilter {

   @Bean
   public CorsFilter corsFilter() {

      CorsConfiguration corsConfig = new CorsConfiguration();
      corsConfig.setAllowCredentials(true);
      corsConfig.setAllowedOrigins(
            Arrays.asList("http://localhost:3000"));
      corsConfig.setAllowedMethods(Arrays.asList("*"));
      corsConfig.setAllowedHeaders(Arrays.asList("*"));

      UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
      configSource.registerCorsConfiguration("/**", corsConfig);
      return new CorsFilter(configSource);
   }
}
