# Use uma imagem base do Java. Certifique-se de que a versão é compatível com seu projeto (ex: 17, 21).
FROM openjdk:17-slim

# Define um argumento para o nome do arquivo JAR
ARG JAR_FILE=target/*.jar

# Cria um diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo .jar gerado para dentro do contêiner e o renomeia para app.jar
COPY ${JAR_FILE} app.jar

# Expõe a porta que sua aplicação Spring usa (o padrão é 8080)
EXPOSE 8080

# Comando para executar a aplicação quando o contêiner iniciar
ENTRYPOINT ["java", "-jar", "app.jar"]