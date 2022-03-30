const db = require('../Config/Connection')
const collection = require('../Config/Collection')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')

module.exports ={
    addUserDetails:(details)=>{
        return new Promise(async(resolve,reject)=>{

            let userExist = await db.get().collection(collection.userCollection).findOne({email:details.email})
            
            res={}
            if(userExist){
                res.userExist=true
                resolve(res)
            }else{
                details.pword = await bcrypt.hash(details.pword,10)
                let userObj = {
                    name:details.name,
                    email:details.email,
                    pword:details.pword
                }
                db.get().collection(collection.userCollection).insertOne(userObj).then(()=>{
                    res.userExist=false
                    resolve(res)
                })
            }

        })
        
    },

    verifyUser:(details)=>{
        return new Promise(async(resolve,reject)=>{
            let user = await db.get().collection(collection.userCollection).findOne({email:details.email})

            if(user){

                bcrypt.compare(details.pword,user.pword).then((status)=>{
                    if(status){
                        resolve({userVerified:true,user:user})
                    }else{
                        resolve({userVerified:false,user:null})
                    }
                })

            }else{
                resolve({userVerified:false,user:null})
            }
        })
    },
    submitApplication:(details)=>{
        return new Promise((resolve,reject)=>{
            details.status = 'new'
            details.userId = ObjectId(details.userId)
            db.get().collection(collection.applications).insertOne(details).then((resp)=>{
                
                resolve(resp)
            })
        })
    }
}