package com.bytatech.ayoos.doctor.client;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.bytatech.ayoos.doctor.security.oauth2.AuthorizationHeaderUtil;

import feign.RequestInterceptor;

@Configuration
public class OAuth2InterceptedFeignConfiguration {

    @Bean(name = "oauth2RequestInterceptor")
    public RequestInterceptor getOAuth2RequestInterceptor(AuthorizationHeaderUtil authorizationHeaderUtil) throws IOException {
        return new TokenRelayRequestInterceptor(authorizationHeaderUtil);
    }
}
