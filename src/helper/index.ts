import { HttpStatus } from "@nestjs/common";

 export const sendResponse = async (data:Promise<any>,res:any) =>{
   const responseData =await data;
   switch(responseData.statusCode){
    case 201:
       return  res.status(HttpStatus.CREATED).json(responseData);
    case 500:
     return  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
        default:
    return  res.status(HttpStatus.OK).json(responseData);
   }

}

export const sendError=(e:Object)=>{
    return {
        status:false,
        error:e,
        statusCode:500
    }
}