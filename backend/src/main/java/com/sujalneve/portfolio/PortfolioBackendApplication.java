package com.sujalneve.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class PortfolioBackendApplication {

    public static void main(String[] args) {
        loadDotEnv();
        SpringApplication.run(PortfolioBackendApplication.class, args);
    }

    private static void loadDotEnv() {
        Path[] candidates = new Path[]{
                Paths.get(".env"),
                Paths.get("backend", ".env"),
                Paths.get("..", "backend", ".env")
        };

        for (Path path : candidates) {
            if (Files.exists(path) && Files.isRegularFile(path)) {
                try {
                    List<String> lines = Files.readAllLines(path);
                    for (String line : lines) {
                        line = line.trim();
                        if (!line.isEmpty() && !line.startsWith("#") && line.contains("=")) {
                            int eq = line.indexOf('=');
                            String key = line.substring(0, eq).trim();
                            String val = line.substring(eq + 1).trim();
                            // Don't overwrite existing system properties or env vars
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, val);
                            }
                        }
                    }
                    break;
                } catch (IOException ignored) {
                }
            }
        }
    }
}
