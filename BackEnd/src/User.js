const {userModel} = require('./Schemas')


const getU = async (req, res) => {
    const user = await userModel.findById(req.query.user_id)
    res.send(user)
};

const register = async (req, res) => {
    let user
    try{
        user = new userModel({
            display_name: req.body.display_name,
            username: req.body.username,
            password: req.body.password
        });
        await user.save();
    } catch (e){
        console.log(e)
    }
    res.json(user)
};

const login = async (req, res) => {
    const usna=req.body.username
    const pawo=req.body.password
    const log = await userModel.findOne({username:{$eq: usna}, password:{$eq: pawo}})
    if (Object.keys(log)){
        res.json(log)
    }else{
        res.status(404).end()
    }
};

const preLog = async (req, res) => {
    try{
        const user = await userModel.findById(req.body.user_id)
        if (Object.keys(user) !== 0){
            res.json(user)
        }
    }
    catch(e){
        res.status(404)
    }
};

module.exports = {
    register,
    login,
    getU,
    preLog
}