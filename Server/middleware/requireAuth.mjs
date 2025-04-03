import jwt from "jsonwebtoken"

const requireAuth = async (req,res,next) => {

    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {nic} = jwt.verify(token,process.env.JWT_SECRET)
        console.log('nic',nic)
        req.user = await User.findOne({nic}).select('nic')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }
}

export default requireAuth;