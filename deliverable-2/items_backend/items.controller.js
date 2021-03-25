const Koa = require('koa');
const Router = require('koa-router');
const itemService = require('./items.service');

// router.route('/items').get((req, res) => {
//     itemService.getAll()
//         .then(items => res.json(items))
//         .catch(err => res.status(400).json('Error: ' + err));
// })

// router.route('/test').get((req, res) => {
//     res.send('Hey connection was good')
// });

const router = Router();

const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

router.get("/", async(ctx) => {
    console.log("reached end")
    await handleRequest(ctx)
});

module.exports = router;