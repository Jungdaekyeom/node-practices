const models = require('../models');
const { Op } = require('sequelize');

module.exports = {
    read: async function(req, res, next) {
        try {
            const startNo = req.query.sno || 0;
            const results = await models.Guestbook.findAll({
                attributes: ['no', 'name', 'message'],
                where: (startNo > 0) ? {no: {[Op.lt]: startNo}} : {},
                order: [
                    ['no', 'desc']
                ],
                limit: 3        
            });

            res.send({
                result: 'success',
                message: null,
                data: results
            });
        } catch(e) {
            next(e);
        }
    }
}