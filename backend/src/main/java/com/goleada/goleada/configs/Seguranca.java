package com.goleada.goleada.configs;
// package com.ac.sefaz.notapremiada.config;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpStatus;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// @Configuration
// @EnableWebSecurity
// public class Seguranca {

//     @Autowired
//     private PerfilUsuarioService service;

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http.httpBasic();
//         // http.authorizeRequests().anyRequest().permitAll();
//         http.cors();
//         http.authorizeRequests().antMatchers("/usuario/cadastrar-se").permitAll();
//         http.authorizeRequests().anyRequest().authenticated();
//         http.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
//         http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));
//         http.csrf().disable();
//         return http.build();
//     }

//     // @Override
//     // protected void configure(AuthenticationManagerBuilder auth) throws Exception
//     // {
//     // auth.authenticationProvider(authProvider());
//     // }

//     @Bean
//     public DaoAuthenticationProvider authProvider() {
//         DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//         authProvider.setUserDetailsService(service);
//         authProvider.setPasswordEncoder(new BCryptPasswordEncoder());
//         return authProvider;
//     }

//     // @Bean
//     // public PasswordEncoder passwordEncoder() {
//     // return new BCryptPasswordEncoder();
//     // }

//     // @Bean
//     // public UserDetailsService udService() {
//     // return new PerfilUsuarioService();
//     // }

// }