import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
    private log = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        // Foreground (text) colors
        fg: {
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
            crimson: "\x1b[38m",
        },
        // Background colors
        bg: {
            black: "\x1b[40m",
            red: "\x1b[41m",
            green: "\x1b[42m",
            yellow: "\x1b[43m",
            blue: "\x1b[44m",
            magenta: "\x1b[45m",
            cyan: "\x1b[46m",
            white: "\x1b[47m",
            crimson: "\x1b[48m",
        },
    };

    private methodColor = {
        GET: this.log.fg.green,
        POST: this.log.fg.blue,
        PUT: this.log.fg.cyan,
        DELETE: this.log.fg.red,
    };

    constructor() {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const reqArg = context.getArgByIndex(0);
        const resArg = context.getArgByIndex(1);
        const req = {
            method: reqArg.method,
            url: reqArg.url,
            originalUrl: reqArg.originalUrl,
            userAgent: reqArg.header("user-agent"),
            ip: reqArg.ip,
            statusCode: resArg.statusCode,
            date: Date.now(),
        };

        const logData = `${this._method(req.method)} ${this._url(
            req.url,
        )}${this._reset()}${this.log.fg.crimson} - ${this._ip(
            req.ip,
        )} ${this._userAgent(req.userAgent)}${this._reset()}`;

        this.reqLog(logData);
        return next.handle().pipe(
            tap(() => this.resLog(req, logData)),
            catchError((error) => {
                req.statusCode = error.getStatus();
                this.resLog(req, logData);

                return throwError(() => error);
            }),
        );
    }

    reqLog(logData: any) {
        console.log(`${this._type("Req")}: ${logData}`);
    }

    resLog(req: any, logData: string) {
        console.log(
            `${this._type("Res")}: ${logData} - ${this._statusCode(
                req.statusCode,
            )} ${this._resTime(req.date)}${this._reset()}`,
        );
    }

    private _type(type: string) {
        return `${
            type === "Req" ? this.log.fg.cyan : this.log.fg.magenta
        }[${type}]`;
    }
    private _method(method: string) {
        return `${this.methodColor[method] || this.log.fg.black}${method}`;
    }
    private _url(url: string) {
        return `${this.log.fg.black}${url}`;
    }
    private _ip(ip: string) {
        return ip;
    }
    private _userAgent(userAgent: string) {
        return `[${userAgent}]`;
    }
    private _statusCode(statusCode: number) {
        const color =
            statusCode >= 400
                ? this.log.fg.red
                : statusCode >= 300
                ? this.log.fg.blue
                : this.log.fg.green;

        return `${color}${statusCode}`;
    }
    private _resTime(date: number) {
        return `${this.log.fg.yellow}+${Date.now() - date}ms`;
    }
    private _reset() {
        return this.log.reset;
    }
}
