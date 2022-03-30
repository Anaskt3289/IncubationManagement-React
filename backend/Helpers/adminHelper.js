const db = require('../Config/Connection')
const collection = require('../Config/Collection')
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')





module.exports={
    verifyAdmin:(details)=>{
        return new Promise(async(resolve,reject)=>{
            let admin = await db.get().collection(collection.admin).findOne({email:details.email})

            if(admin){
                bcrypt.compare(details.pword,admin.pword).then((status)=>{
                    if(status){
                        resolve({adminVerified:true})
                    }else{
                        resolve({adminVerified:false})
                    }
                })
            }else{
                resolve({adminVerified:false})
            }
        })
    },
    getApplications:()=>{
        return new Promise(async (resolve,reject)=>{
            let applications =await db.get().collection(collection.applications).find().toArray();


            let NEW = [], PENDING = [] , ACTIVE = [] , REJECTED = [] , ALL=[],ActiveCompanies=[]
            let resp = {}

            for(let application of applications){
                if(application.status!=='rejected'){
                    ALL.push(application)
                }

                if(application.status==='new'){
                    NEW.push(application)
                }else if(application.status==='pending'){
                    PENDING.push(application)
                }else if(application.status==='active'){
                    ActiveCompanies.push(application.companyName)
                    ACTIVE.push(application)
                }else{
                    REJECTED.push(application)
                }
            }

            resp.NEW = NEW
            resp.PENDING = PENDING
            resp.ACTIVE = ACTIVE
            resp.REJECTED = REJECTED
            resp.ALL = ALL
            resp.ActiveCompanies = ActiveCompanies

            resolve(resp)
        })
    },
    changeStatus:(applicationId,status)=>{

        return new Promise((resolve,reject)=>{
            db.get().collection(collection.applications).updateOne({ _id:ObjectId(applicationId)},
            {
                $set:{status:status}
            }).then(()=>{
                resolve()
            })
        })
    },

    getBookingSlots:()=>{
        return new Promise(async(resolve,reject)=>{
            let slots = await db.get().collection(collection.bookingSlots).find().toArray()

            let resp = {}
            let slotsA = [], slotsB=[] ,slotsC = [] ,slotsD=[], slotsE=[]
            for(let slot of slots){
                if(slot.section==='A'){
                    slotsA.push(slot)
                }else if(slot.section==='B'){
                    slotsB.push(slot)
                }else if(slot.section==='C'){
                    slotsC.push(slot)
                }else if(slot.section==='D'){
                    slotsD.push(slot)
                }else{
                    slotsE.push(slot)
                }
            }
            resp.slotsA = slotsA
            resp.slotsB = slotsB
            resp.slotsC = slotsC
            resp.slotsD = slotsD
            resp.slotsE = slotsE

            resolve(resp)
            
        })
    },
    bookSlot:(details)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.bookingSlots).updateOne({slot:details.selectedSlot},
                {
                    $set:{
                        booked:true,
                        company:details.selectedCompany
                    }
                }).then(async()=>{
                    
                    let application = await db.get().collection(collection.applications).findOneAndUpdate({companyName:details.selectedCompany},
                        {
                            $set:{status:'slotBooked'}
                        })
                        console.log(application);
                    await db.get().collection(collection.userCollection).updateOne({_id:ObjectId(application.value.userId)},
                    {
                        $set:{bookedSlot:details.selectedSlot}
                    }
                    )
                    resolve()
                })
        })
    },
    getApplicationDetail:(applicationId)=>{
        return new Promise(async(resolve,reject)=>{
           let application = await db.get().collection(collection.applications).findOne({_id:ObjectId(applicationId)})
          
             resolve(application)
        })
    }
}