const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
import passport from "passport";
import User from "../models/User";


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = User.findByPk(payload.id);
            if (user) return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);