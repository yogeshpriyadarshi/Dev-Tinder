const authuser = (req, res,next)=>{
    console.log("authenticatin done ");
// authentication code;
next();
}

module.exports={authuser};