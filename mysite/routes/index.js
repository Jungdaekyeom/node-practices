const errorRoute = require('./error');

// const errorRoute = require('./error');

// 작업하려고 router를 전부 여기 모아둠

// 해당 라인 대신 .use에 포함시킴
// const mainRouter = require('./routes/main');
// const userRouter = require('./routes/user');

// 4-4. request router
const applicationRouter = {
    setup: function(application) {

        // const site = models.Site.findOne();
        application
            .all('*', function(req, res, next){
                res.locals.req = req;
                res.locals.res = res;
                next();
            })

            // .use('/', mainRouter)
            // .use('/user', userRouter);
            .use('/', require('./main'))
            .use('/user', require('./user'))

            .use(errorRoute.error404) // 에러 404 만들어서 구현
            .use(errorRoute.error500) // 에러 500 만들어서 구현

            .siteTitle = 'MySite';
    }
}

module.exports = { applicationRouter }