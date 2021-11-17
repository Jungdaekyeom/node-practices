
// model 임포트
const model = require('../models/guestbook');

module.exports = {
    index: async function (req, res) {
        const results = await model.findAll(function(){});
        res.render('index', {
            list: results || []
        });
    },

    add: async function(req, res){
        const results = await model.insert(req.body);
        res.redirect('/');
    },

    deleteform: async function(req, res){
        res.render('deleteform', req.params);
    },

    delete: async function(req, res){
        const results = await model.delete(req.body);
        res.redirect('/');
    },


}