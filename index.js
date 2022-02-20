import express from 'express';
import { create  } from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import morgan from 'morgan';
//const morgan = require('morgan');
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath (import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

import controllers from './controllers/index.js';

const app = express();

// Middleware
if (app.get('env') === 'development') {
	app.use(morgan('dev'));
} else {
	app.use(morgan('combined'));
}
app.use(helmet());
app.use(compression());
// Set up view engine
const hbs = create({
	layoutsDir: path.join(__dirname, '/build/views/layouts'),
	defaultLayout: 'main',
	partialsDir: path.join(__dirname, '/build/views/partials')
});
app.set('views', path.join(__dirname, '/build/views/'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/build/'));

// Use controllers from controllers folder
app.use(controllers);

let port = process.env.PORT;
app.listen(port, () => console.log('Example app listening on port: ' + port));

export default app;
