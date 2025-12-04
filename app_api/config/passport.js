const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            // 사용자 조회
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            // 비밀번호 검증
            const isValid = user.validPassword(password);
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            // 성공
            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
));
