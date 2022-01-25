import express from 'express';

import aboutController from './about';

let router = express.Router();

router.use('/about', aboutController);

router.get('/', function(req, res) {
	res.render('index', { about_link: '/about' });
});

router.get('*', function(req, res) {
	//	res.send('404 - Page not found', 404); // TODO: Create pretty 404 page.
	res.status(404).send('404 - Page not found...');
});

// eslint-disable-next-line no-unused-vars
router.use(function(err, req, res, next) {
	return res.status(500).send('Internal Error');
});

export default router;
