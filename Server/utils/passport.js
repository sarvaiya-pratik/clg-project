import passport from "passport";
import User from "../models/user.model.js";
import dotenv from 'dotenv'
import GoogleStrategy from 'passport-google-oauth20'
import Cart from "../models/cart.model.js";
GoogleStrategy.Strategy
dotenv.config()

const connectPassport = () => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/users/auth/google/callback",
            scope: ["profile", "email"]
        },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let user = await User.findOne({ googleId: profile.id })
                    if (!user) {
                        let newuser = new User({
                            googleId: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            image: profile.photos[0].value
                        })
                        await newuser.save()
                        return done(null, newuser)
                    }
                    else {

                        return done(null, user)
                    }


                } catch (error) {
                    return done(error, null)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {

        const user = await User.findById(id).populate("address")

        done(null, user);
        try {
            
            const isexistcart = await Cart.findOne({ userId: user._id })
            if (!isexistcart) {
                const createCart = new Cart({ userId: user._id })
                await createCart.save()
            }   
        } catch (error) {
            console.log("Hello",error.message)
        }

    });

}

export default connectPassport