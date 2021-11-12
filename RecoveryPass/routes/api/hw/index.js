const express = require('express');
let router = express.Router();
const cookieSession = require('cookie-session');
const passport = require('passport');
const isLoggedIn = require('./auth');
require('./hw.passport');

router.use(cookieSession({
  name: 'spotify-auth-session',
  keys: ['key1', 'key2']
}))
router.use(passport.initialize());
router.use(passport.session());

router.get('/spotify/get-info',isLoggedIn,(req,res)=>{
    res.status(200).json({"msg":"Eureka", "funciona":"Spotify" ,"Usuario":req.user.username, "Nombre": req.user.displayName});
})

router.get('/spotify/error', (req, res) => res.send('Error desconocido o Se canceló el inicio de sesión'))
router.get('/spotify/spotify',passport.authenticate('spotify'));

router.get('/spotify/spotify/callback',passport.authenticate('spotify', { failureRedirect: '/api/hw/spotify/error' }),
function(req, res) {
    res.redirect('/api/hw/spotify/get-info');
});

router.get('/spotify/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/api/hw/spotify/get-info');
  })

module.exports = router;