const authrizeAlumni = (req,res,next) => {
    if(req.user.role === 'Alumni'){
        return next()
    }else{
       return  res.status(404).json({message:"not authrize..."})
    }
}

const authrizeAdmin = (req,res,next) => {
    if(req.user.role === 'Admin'){
        return next()
    }else{
       return  res.status(404).json({message:"not authrize..."})
    }
}

export {authrizeAlumni,authrizeAdmin}