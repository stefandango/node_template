import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
	res.render('about', { index_link: '/' });
});

export default router;
