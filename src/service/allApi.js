
import { commonApi } from "./commonApi"
import { serverUrl } from "./ServerUrl"





// register api
export const registerApi = async (reqBody)=>{
    return commonApi("POST",`${serverUrl}/register`,reqBody)
}

// login api

export const googleloginApi = async (reqBody)=>{
    return commonApi("POST",`${serverUrl}/googlelogin`,reqBody)
}
// googlelogin api

export const loginApi = async (reqBody)=>{
    return commonApi("POST",`${serverUrl}/login`,reqBody)
}
//  add book api
export const addBookApi = async (reqBody,reqHeader)=>{
    return commonApi("POST",`${serverUrl}/addbook`,reqBody,reqHeader)

}
// get book in home
export const getHomeBookApi = async ()=>{
    return commonApi("GET",`${serverUrl}/homebooks`)
}

// get all user books
export const getUserBookApi = async (reqHeader,searchKey)=>{
    return commonApi("GET",`${serverUrl}/allbooks?search=${searchKey}`,"",reqHeader)
}
// get a specific book
export const getABookApi = async (id)=>{
    return commonApi("GET",`${serverUrl}/viewbook/${id}`,)
}
// get user added books
export const getUserAddedApi = async (reqHeader)=>{
    return commonApi("GET",`${serverUrl}/useradded`,"",reqHeader)
}

// get user added books
export const getUserBroughtApi = async (reqHeader)=>{
    return commonApi("GET",`${serverUrl}/userbroughtby`,"",reqHeader)
}

// delete user book
export const deleteUserBookApi = async (id)=>{
    return commonApi("DELETE",`${serverUrl}/deletebook/${id}`)
}


// admin
// get admin side books 
export const getAdminBookApi = async ()=>{
    return commonApi("GET",`${serverUrl}/allAdminBooks`)
}

// api for approve book
export const ApproveAdminBookApi = async (id)=>{
    return commonApi("PUT",`${serverUrl}/approveBook/${id}`)
}

// get all users in admin api
export const getAllUsersApi = async (reqHeader)=>{
    return commonApi("GET",`${serverUrl}/allusers`,"",reqHeader)
}
// add job api
export const addJobApi = async (reqBody,reqHeader)=>{
    return commonApi("POST",`${serverUrl}/addJob`,reqBody,reqHeader)

}
// get job
export const getAllJobApi = async (searchKey)=>{
    return commonApi("GET",`${serverUrl}/getAlljob?search=${searchKey}`)

}
// job delete 
export const deleteJobApi = async (id)=>{
    return commonApi("DELETE",`${serverUrl}/deleteJob/${id}`)
}
// add application 
export const addApplicationAPI = async (reqBody,reqHeader)=>{
    return commonApi("POST",`${serverUrl}/add-applications`,reqBody,reqHeader)

}
// get all application
export const getAllApplicationApi = async ()=>{
    return commonApi("GET",`${serverUrl}/getApplication`,)
}
// update profile 
export const editProfileApi = async (reqBody,reqHeader)=>{
    return commonApi("PUT",`${serverUrl}/editprofile/`,reqBody,reqHeader)
}