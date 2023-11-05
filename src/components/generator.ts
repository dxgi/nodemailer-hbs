import type Mail from 'nodemailer/lib/mailer/mail-message.js';
import type { SentMessageInfo } from 'nodemailer';

import { create } from 'express-handlebars';
import { join } from 'path';

declare module 'nodemailer/lib/mailer' {
    interface Options {
        template: string;
        context: Record<string, any>;
    }
}

export default class Generator {
    private readonly viewEngine: ReturnType<typeof create>;

    private readonly viewPath: string;

    private readonly extName: string = '.hbs';

    constructor(
        options: {
            viewEngine: Parameters<typeof create>[0];
            viewPath: string;
        }
    ) {
        this.viewEngine = create(
            options.viewEngine
        );

        this.viewPath = options.viewPath;
    }

    public render(
        message: Mail<SentMessageInfo>,
        callback: (
            err?: Error | null | undefined
        ) => void
    ) {
        if (message.data.html)
            return callback();

        const view = join(
            this.viewPath,
            message.data.template + this.extName
        );

        const context = {
            ...message.data.context,
            layout: message.data.template
        };

        this.viewEngine.renderView(view,  context, (err, html) => {
            if (err)
                return callback(err);

            message.data.html = html;

            callback();
        });
    }
}

export type GeneratorOptions = ConstructorParameters<typeof Generator>[0];