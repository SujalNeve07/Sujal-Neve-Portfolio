
package com.sujalneve.portfolio.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CorsConfigTest {

    @Autowired
    private CorsConfig corsConfig;

    @Test
    void contextLoadsAndParsesOrigins() throws Exception {
        assertNotNull(corsConfig);

        Field field = CorsConfig.class.getDeclaredField("allowedOrigins");
        field.setAccessible(true);

        String[] origins = (String[]) field.get(corsConfig);
        List<String> originList = Arrays.asList(origins);

        assertEquals(4, origins.length, "Expected exactly four allowed origins");
        assertTrue(originList.contains("https://sujal-neve-portfolio.vercel.app"));
        assertTrue(originList.contains("http://localhost:5173"));
        assertTrue(originList.contains("http://localhost:5174"));
        assertTrue(originList.contains("http://localhost:4173"));

        for (String origin : origins) {
            assertFalse(origin.contains("["));
            assertFalse(origin.contains("]"));
            assertFalse(origin.contains("("));
            assertFalse(origin.contains(")"));
            assertTrue(origin.startsWith("http://") || origin.startsWith("https://"));
        }
    }
}
