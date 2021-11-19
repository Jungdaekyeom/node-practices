const moment = require('moment');
const models = require('../models');

module.exports = {
    index: function(req, res, next) {
        try{
            const results = models.Guestbook.findAll({
                attributes: ['', '', ''],
                order: [
                    ['no', 'DESC']
                ]
            });

            res.render('guestbook.index', {results, moment});
            //moment(vo.regDate).format('YYYY-MM-DD hh:mm:ss')
        } catch(e) {
            next(e);
        }
    },
    _delete: function(req, res, next) {
        try {
            models.Guestbook.destroy({
                where: req.body
            });
        } catch(e) {
            next(e);
        }
    }
}