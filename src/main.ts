import { NestFactory } from "@nestjs/core";

/* app/root module */
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./common/logging.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");
    app.useGlobalInterceptors(new LoggingInterceptor())
    
    await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
