FROM eclipse-temurin:17
LABEL maintainer="ricardopanighellazarini@gmail.com"
WORKDIR /taskmanager
COPY target/backend-0.0.1-SNAPSHOT.jar /taskmanager/taskmanager.jar
ENTRYPOINT ["java", "-jar", "taskmanager.jar"]