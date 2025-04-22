import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // Add this line
  app.enableCors({
    origin: ['http://localhost:8081', 'http://localhost:19006', 'http://localhost:3000', 'http://192.168.22.110:19006','http://192.168.22.110:3000'], // Add more if needed, // Your frontend origin
    credentials: true,   
  });




  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
