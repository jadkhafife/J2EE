package org.sid.demospringcloudstreamskafka.services;

import org.sid.demospringcloudstreamskafka.entities.PageEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

@Service
public class PageEventService {
    @Bean
    public Consumer<PageEvent> pageEventConsumer(){
        return (input) -> {
            System.out.println("******************");
            System.out.println(input.toString());
            System.out.println("******************");
        };
    }

    @Bean
    public Supplier<PageEvent> pageEventSupplier(){
        return () -> {
            PageEvent pageEvent =  new PageEvent(
                    Math.random()>0.5?"page1":"page2",
                    Math.random()>0.5?"user1":"user2",
                    new Date(),
                    (long) new Random().nextInt(9000));
            return pageEvent;
        };
    }

    @Bean
    public Function<PageEvent, PageEvent> pageEventFunction(){
        return (input) -> {
            input.setName("L"+input.getName().length());
            input.setUser("UUUUUUUUUUU");
            return input;
        };
    }
}
