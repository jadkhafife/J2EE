package org.sid.demospringcloudstreamskafka.services;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.kstream.Grouped;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Materialized;
import org.apache.kafka.streams.kstream.TimeWindows;
import org.sid.demospringcloudstreamskafka.entities.PageEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.time.Duration;
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

    @Bean
    public Function<KStream<String, PageEvent>, KStream<String, Long>> kStreamFunction(){
        return (input) -> {
            return input
                    .filter((k,v) -> v.getDuration()>100)
                    .mapValues((k,v) -> new KeyValue<>(v.getName(), 0L))
                    .groupBy((k,v) -> k)
                    .windowedBy(TimeWindows.of(Duration.ofMillis(5000)))
                    .count(Materialized.as("pageCount"))
                    .toStream()
                    .map((k,v) -> new KeyValue<>("=>"+k.window().startTime()+k.window().endTime(), v));
//                    .groupByKey(Grouped.keySerde(Serdes.String()))
        };
    }
}
