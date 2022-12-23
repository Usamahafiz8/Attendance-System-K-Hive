"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("./auth/guard/jwt.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalGuards(new jwt_guard_1.JwtAuthGuard());
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Attendance')
        .setDescription('Attendance System for K-Hive')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map