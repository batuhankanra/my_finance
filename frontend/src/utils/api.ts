


const BASE_URL=import.meta.env.VITE_API_URL;



class ApiError extends Error{
    status:number;
    data:unknown;

    constructor(status:number,message:string,data?:unknown){
        super(message)
        this.status=status;
        this.data=data
    }
}


async function request<T>(endpoint:string,options:RequestOptions= {}):Promise<T> {
    const { params, headers, ...rest } = options;
    const url = new URL(`${BASE_URL}${endpoint}`)
    if (params){
        Object.entries(params).forEach(([key,value])=>{
            if(value!==undefined) url.searchParams.set(key,String(value))
        });
    }
    const token ="Ping Pong";// ------------------------------------------------------------- 

    const response=await fetch(url.toString(),{
        ...rest,
        headers:{
            'Content-Type':'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers
        },
        credentials:'include'
    })

    if (response.status===401 && endpoint !== '/auth/refresh'){
        const refreshed={1:"sa"};
        if (refreshed){
            return request<T>(endpoint,options)
        }
        console.log("handle logout");
        throw new ApiError(401,'Unauthorized');
    }
    const data=await response.json().catch(()=>null);
    if (!response.ok){
        throw new ApiError(response.status,data?.message || 'Internal server Error',data )
    }
    return data as T


}


export const apiClient={
    get:<T>(endpoint:string,options?:RequestOptions)=>request<T>(endpoint,{...options,method:'GET'}),
    post:<T>(endpoint:string,options?:RequestOptions)=>request<T>(endpoint,{...options,method:'POST'}),
    patch:<T>(endpoint:string,options?:RequestOptions)=>request<T>(endpoint,{...options,method:'PATCH'}),
    delete:<T>(endpoint:string,options?:RequestOptions)=>request<T>(endpoint,{...options,method:'DELETE'}),
}

export {ApiError}