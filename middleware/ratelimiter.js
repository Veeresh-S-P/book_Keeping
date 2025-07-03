const rateLimit = require('express-rate-limit')



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes please!!!!.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

    module.exports
    = {
        limiter
        }
