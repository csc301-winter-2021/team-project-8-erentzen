require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const url = require('url')
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const { default: Shopify, ApiVersion } = require('@shopify/shopify-api');
const Router = require('koa-router');
const mysql = require('mysql2')
dotenv.config();

const itemService = require('./items_backend/items.service');

Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
    SCOPES: process.env.SHOPIFY_API_SCOPES.split(","),
    HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
    API_VERSION: ApiVersion.October20,
    IS_EMBEDDED_APP: true,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
  });

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ACTIVE_SHOPIFY_SHOPS = {};


// const con = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USERNAME,
//   password: process.env.MYSQL_PASSWORD,
// });


app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    server.keys = [Shopify.Context.API_SECRET_KEY];

    server.use(
        createShopifyAuth({
          afterAuth(ctx) {
            const { shop, scope } = ctx.state.shopify;
            ACTIVE_SHOPIFY_SHOPS[shop] = scope;
            ctx.redirect(`/`);
          },
        }),
      );

    router.post("/graphql", verifyRequest(), async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    });

    router.get("/install.php", async (ctx, next) => {
      var shop = ctx.query.shop;
      var appId = process.env.SHOPIFY_API_KEY;
      var appSecret = process.env.SHOPIFY_API_SECRET;
      var appScope = process.env.SHOPIFY_API_SCOPES;
      // var appDomain = process.env.SHOPIFY_APP_URL;
      var appDomain = 'http://localhost:3000'

      //build the url
      var installUrl = `https://${shop}/admin/oauth/authorize?client_id=${appId}&scope=${appScope}&redirect_uri=${appDomain}/shopify/auth`;

      //Do I have the token already for this store?
      //Check database
      //For tutorial ONLY - check .env variable value
      // if (process.env.appStoreTokenTest.length > 0) {
          // res.redirect('/shopify/app?shop=' + shop);
      // } else {
          //go here if you don't have the token yet
          ctx.redirect(installUrl);
      // }
      })

    router.get("/shopify/auth", async(ctx) => {
      console.log("reached auth")
      let securityPass = false;
      let appId = process.env.SHOPIFY_APP_URL;
      let appSecret = process.env.SHOPIFY_API_SECRET;
      console.log(ctx.url)
      let shop = ctx.query.shop;
      let code = ctx.query.code;
  
      const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;
  
      if (shop.match(regex)) {
          console.log('regex is ok');
          securityPass = true;
      } else {
          //exit
          securityPass = false;
      }
  
      // 1. Parse the string URL to object
      let urlObj = url.parse(ctx.url);
      // 2. Get the 'query string' portion
      let query = urlObj.search.slice(1);
      securityPass = true;
      // if (verifyCall.verify(query)) {
      //     //get token
      //     console.log('get token');
      //     securityPass = true;
      // } else {
      //     //exit
      //     securityPass = false;
      // }
  
      if (securityPass && regex) {
  
          //Exchange temporary code for a permanent access token
          let accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
          let accessTokenPayload = {
              client_id: appId,
              client_secret: appSecret,
              code,
          };

          router.post(accessTokenRequestUrl, async (ctx) => {
            
          })
  
          router.post(accessTokenRequestUrl, { json: accessTokenPayload })
              .then((accessTokenResponse) => {
                  let accessToken = accessTokenResponse.access_token;
                  console.log('shop token ' + accessToken);
                  ctx.redirect('/shopify/app?shop=' + shop);
              })
              .catch((error) => {
                  ctx.status(error.statusCode).send(error.error.error_description);
              });
      }
      else {
          ctx.redirect('/');
      }
    });
  
    const handleRequest = async (ctx) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
    };

    router.get("/", async (ctx) => {
        const shop = ctx.query.shop;
        // DO NOT UNCOMMENT OR DELETE
        // if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
        //   ctx.redirect(`/auth?shop=${shop}`);
        // } else {
          await handleRequest(ctx);
        // }
      });

    router.get('/items', async (ctx) => {
      items = await itemService.getAll()
        .then(items => ctx.body = (items))
    })


  
    router.get("(/_next/static/.*)", handleRequest);
    router.get("/_next/webpack-hmr", handleRequest);
    router.get("(.*)", verifyRequest(), handleRequest);
  
    server.use(router.allowedMethods());
    server.use(router.routes());

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
      });
});