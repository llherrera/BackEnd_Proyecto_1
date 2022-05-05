const {userModel} = require('./Schemas')


const getU = async (req, res) => {
    //const user = await userModel.findById(req.query.user_id)
    //res.send(user)
};

const register = async (req, res) => {
    try{
        const user = new userModel({
            name: req.body.display_name,
            username: req.body.username,
            password: req.body.password
        });
        await user.save();
    } catch (e){
        console.log(e)
    }
    res.json('Registed')
};

const login = async (req, res) => {
    const usna=req.body.username
    const pawo=req.body.password
    const log = await userModel.find({username:{$eq: usna}, password:{$eq: pawo}})
    if (log.length){
        res.send(log)
    }else{
        res.status(404).end()
    }
};
/*
app.post('//users/prev-login', async (req, res) => {
    var Uid = req.body.user_id
    console.log(Uid)
    if(typeof Uid === undefined){
        res.send('ño')
    }else{
        const log = await userModel.findById(Uid)
        res.json(log)
    }
    
});*/

module.exports = {
    register,
    login,
    getU
}