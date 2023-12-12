FROM openjdk:17-oracle
VOLUME /tmp
COPY target/*.jar app.jar
EXPOSE 8761

ENTRYPOINT ["java", "-jar", "/app.jar"]