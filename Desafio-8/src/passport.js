import passport from "passport";
import { usersManager } from "./dao/mongoDB/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { hashData, compareData } from "./utils.js";
import { usersModel } from "./db/models/users.model.js";

// local

passport.use(
    "signup",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            const { first_name, last_name, age, roll = "USER"} = req.body;
            if (!first_name || !last_name || !age || !roll || !email || !password) {
                return done(null, false);
            }
            try {
                let isAdmin
                if (email === "adminCoder@coder.com") {
                    isAdmin = true
                } else {
                    isAdmin = false
                }
                const hashedPassword = await hashData(password);
                const createdUser = await usersManager.createUser({
                    ...req.body,
                    password: hashedPassword, isAdmin
                });
                done(null, createdUser);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            if (!email || !password) {
                done(null, false);
            }
            try {
                const user = await usersManager.findUserByEmail(email);
                if (!user) {
                    done(null, false);
                }
                const isPasswordValid = await compareData(password, user.password);
                if (!isPasswordValid) {
                    return done(null, false);
                }
                done(null, user);
                console.log(user)
            } catch (error) {
                done(error);
            }
        }
    )
);

// github
passport.use(
    "github",
    new GithubStrategy(
        {
            clientID: "Iv1.398353d5b9df7b5a",
            clientSecret: "b2328f78e163eb06a46b6e74ef83c7076928f05a",
            callbackURL: "http://localhost:8080/api/sessions/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userDB = await usersManager.findUserByEmail(profile._json.email);
                /* console.log(profile) */
                // login
                if (userDB) {
                    if (userDB.isGithub) {
                        return done(null, userDB);
                    } else {
                        return done(null, false);
                    }
                }
                // signup
                const infoUser = {
                    first_name: profile._json.name.split(" ")[0], // ['farid','sesin']
                    last_name: profile._json.name.split(" ")[1],
                    email: profile._json.email,
                    password: " ",
                    isGithub: true,
                };
                const createdUser = await usersManager.createUser(infoUser);
                done(null, createdUser);
            } catch (error) {
                done(error);
            }
        }
    )
);

const fromCookies = (req) => {
    return req.cookies.token;
};

// JWT
passport.use(
    "jwt",
    new JWTStrategy(
        {
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
            secretOrKey: "secretJWT",
        },
        async function (jwt_payload, done) {
            done(null, jwt_payload);
        }
    )
);

passport.serializeUser((user, done) => {
    // _id
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersManager.findUserByID(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});