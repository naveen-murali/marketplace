import { NestFactory } from "@nestjs/core";

/* app/root module */
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");

    await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
