
// model 임포트
const model = require('../models/emaillist');

module.exports = {
    index: async function (req, res) {
        const results = await model.findAll(function(){});
        console.log(results);
        res.render('index', {
            list: results || []
        });
    },

    form: function(req, res){
        res.render('form');
    },

    // CRUD
    // 비동기
    add: async function(req, res){
        console.log(req.body);
        // const results = await model.insert(req.body);
        res.redirect("/");
    }
}