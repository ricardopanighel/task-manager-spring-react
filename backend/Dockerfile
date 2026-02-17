# 1: Build (Compila o projeto dentro da nuvem)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# 2: Run (Roda o projeto compilado)
FROM eclipse-temurin:17-jre
LABEL maintainer="ricardopanighellazarini@gmail.com"
WORKDIR /app
# Copia o .jar que foi gerado no passo anterior
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]