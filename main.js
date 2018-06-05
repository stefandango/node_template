// ESM syntax is supported.
import express from 'express';
import exhbs from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import controllers from './controllers';

const app = express();

// Middleware

// Set up view engine
const hbs = exhbs.create({
	layoutsDir: path.join(__dirname, '/build/views/layouts'),
	defaultLayout: 'main',
	partialsDir: path.join(__dirname, '/build/views/partials')
});
app.set('views', path.join(__dirname, '/build/views/'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/build/'));

// Set up Helmet
app.use(helmet());

// Compression
app.use(compression());

app.use(controllers);

let port = process.env.PORT;
app.listen(port, () => console.log('Example app listening on port: ' + port));

export {};
