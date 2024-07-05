const otpService = require("../Services/otp-service");
const hashService = require('../Services/hash-service');
const userService = require('../Services/user-service');

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;

        if (!phone) {
            res.status(400).send("Use correct data");
        }

        const otp = await otpService.generateotp();

        const valid = 1000 * 60 * 2;
        const expires = Date.now() + valid;
        const data = `${phone}.${otp}.${expires}`;

        const hash = hashService.hashedOtp(data);

        try {
            await otpService.sendotpsms(phone, otp);
            return res.json({
                hash: `${hash}.${expires}`,
                phone
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Message sending fail" });
        }

        return res.json({"otp":otp});
    }
    async verifyOtp(req,res) {
        const { otp, hash, phone } = req.body;

        if (!otp || !hash || !phone) {
            return res.status(400).send("User made error");
        }

        const [hashedOtp, expires] = hash.split('.');

        if (Date.now() > +expires) {
            return res.status(404).send('Otp Expires');
        }

        const data = `${phone}.${otp}.${expires}`

        const isValid = otpService.verifyotp(hashedOtp, data);

        if (isValid) {
            return res.status(404).send("Otp is not valid");
        }

        let user;
        let acessToken;
        let refreshToken;

        try {
                user = await userService.findUser({ phone: phone });

            if (!user) {
                user = await userService.createUser({ phone: phone });
            }

        } catch (error) {
            res.status(500).send(error);
        }
    }
}
module.exports = new AuthController();