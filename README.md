# nodemailer-hbs

```ts
import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-hbs';

const transporter = createTransport({
    ...
});

const __filename = fileURLToPath(import.meta.url),
    __dirname = dirname(__filename).replace('dist', DIRECTORY);

transport.use('compile', hbs({
    ...
}));
```

This repository represents the modified and functional iteration of 'nodemailer-express-handlebars.' 

All rights to the original author are acknowledged.