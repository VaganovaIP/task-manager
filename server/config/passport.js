const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require("passport");
const db = require("./db");


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = db.User.findByPk(payload.id);
            if (user) return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);