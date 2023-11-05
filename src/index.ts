import type Mail from 'nodemailer/lib/mailer/mail-message.js';
import type { SentMessageInfo } from 'nodemailer';

import Generator, { GeneratorOptions } from './components/generator';

export default (options: GeneratorOptions) => {
    const generator = new Generator(options);

    return (message: Mail<SentMessageInfo>, callback: (err?: Error | null | undefined) => void) => {
        return generator.render(message, callback);
    }
}