
export function getlocal(){
    let response=localStorage.getItem('authToken')
    return response
}