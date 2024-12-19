const multer =require('multer')

const fs=require('fs')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        fileDestination='public/uploads'
        // check if the directory exists
        if(!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination,{recursive:true})
            cb(null,fileDestination)
        }
        else{
            cb(null,fileDestination)
        }
    },
    filename:(req,file,cb)=>{
        let filename=path.basename(file.originalname,path.extname(file.originalname))
        // 'images/foo/abc.jpg'
        // -> abc
        let ext=path.extname(file.originalname)
        // .jpg

        cb(null,filename+ '_'+Date.now()+ext)
    }

})

let imageFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|png|svg|jpeg|jfif|gif|JPG|JPEG|PNG|SVG|GIF|JFIF)$/)){
        return cb(new error("You can upload image file only"),false)
    }
    else{
        cb(null,true)
    }
}

const upload=multer({
    storage:storage,
    fileFilter:imageFilter,
    limits:{
        fileSize:3000000 //3MB
    }
})

module.exports=upload