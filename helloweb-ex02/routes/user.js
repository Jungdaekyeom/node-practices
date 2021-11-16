const express = require('express');

const router = express.Router();

// user?no=10
router.route("").get(function(req, res){
    res.render('user/info', {
        no: req.query.no || 0
    });    
});

// get방식
router.route("/info/:no").get(function(req, res){
    res.render('user/info', {
        no: req.params.no || 0
    });
});

// get방식
router.route("/join").get(function(req, res){
    console.log(req.body);
    res.render('/');
});

router.route("/api").get(function(req, res){
    const vo= {
        no: 10,
        name: '둘리',
        email: 'pocpoc0202@naver.com',
        gender: 'male'
    };

    // res.writeHead(200, {
    //     'Content-Type:': "application"
    // });
    // res.end(JSON.stringify(vo));

    res.send(vo);
});

module.exports = router;