const {userModel} = require('./Schemas')

/*
app.get('//users', async (req, res) => {
    const users = await userModel.find()
    res.json(users)
});
*/
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
    const log = await userModel.find({username:req.body.username, password:req.body.password})
    if (log){
        res.json(log)
    }else{
        res.status("User not found")
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
    login
}