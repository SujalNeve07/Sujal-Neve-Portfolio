package com.sujalneve.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    private final int maxRequests;
    private final long windowMillis;
    private final Map<String, Deque<Long>> requestHistory = new ConcurrentHashMap<>();

    public RateLimiterService(
            @Value("${portfolio.ratelimit.max-requests:5}") int maxRequests,
            @Value("${portfolio.ratelimit.window-seconds:300}") int windowSeconds
    ) {
        this.maxRequests = maxRequests;
        this.windowMillis = windowSeconds * 1000L;
    }

    /**
     * Checks if the given client IP is allowed to perform a contact submission.
     * Thread-safe sliding window algorithm with zero database dependency.
     */
    public synchronized boolean isAllowed(String clientIp) {
        if (clientIp == null || clientIp.isBlank()) {
            clientIp = "anonymous";
        }

        long now = System.currentTimeMillis();
        long cutoff = now - windowMillis;

        Deque<Long> timestamps = requestHistory.computeIfAbsent(clientIp, k -> new ArrayDeque<>());

        // Evict expired timestamps
        while (!timestamps.isEmpty() && timestamps.peekFirst() < cutoff) {
            timestamps.pollFirst();
        }

        if (timestamps.size() >= maxRequests) {
            return false;
        }

        timestamps.addLast(now);

        // Periodic maintenance cleanup if map grows
        if (requestHistory.size() > 500) {
            cleanUpOldEntries(cutoff);
        }

        return true;
    }

    private void cleanUpOldEntries(long cutoff) {
        requestHistory.entrySet().removeIf(entry -> {
            Deque<Long> q = entry.getValue();
            return q.isEmpty() || q.peekLast() < cutoff;
        });
    }
}
