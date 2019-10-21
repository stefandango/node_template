import express from 'express';

import aboutController from './about';

let router = express.Router();

router.use('/about', aboutController);

router.get('/', function(req, res) {
	res.render('index', { about_link: '/about' });
});

export default router;
