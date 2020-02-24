import Joi from 'joi'
export default Joi.object().keys({
    email:Joi.string.email().required().label('Email'),
    username:Joi.string().alphanum().min(4).max(40).required().label("Username"),
    passwork:Joi.string().regex(/"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"/).label("password").options({
        language:{
            string:{
                regex:{
                    base:"must have at least on uppercase and one loweercase ,on number and 8 charaters"
                }
            }
        }
    })
})