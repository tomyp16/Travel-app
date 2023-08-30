import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Children, Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export type Login={
    _Login:undefined
}

export type Logout={
    _Logout:undefined
}

export type InitialRoute={
    name:string
}

export interface UserContextInterface {
    Route:InitialRoute,
    _Login:Dispatch<SetStateAction<Login>>,
    _Logout:Dispatch<SetStateAction<Logout>>
    User:undefined
}
const defaultState ={
        Route:{
            name:'',
        },
        _Login:(login:Login)=>{},
        _Logout:(login:Logout)=>{},
    
} as UserContextInterface

export const UserContext = createContext(defaultState)

type UserProviderProps={
    children: ReactNode
}

export const UserProvider=({children}:UserProviderProps)=>{

    const [Route, setRoute]=useState<InitialRoute>({
        name:'',
    })

    const [User,setUser]=useState('')

    useEffect(()=>{
        _isLoggin()
    },[])

    const _isLoggin = async()=>{
        try {
            let getUserInfo = await AsyncStorage.getItem('userInfo')
            
            getUserInfo= JSON.parse(getUserInfo)

            if (getUserInfo) {
                setRoute({
                    name:'Home'
                })
                setUser(getUserInfo)
            } else {
                setRoute({
                    name:'Login'
                })
            }
        } catch (error) {
            console.log('Error _isLoggin', error);
        }
    }

    const _Login =(item)=>{
        AsyncStorage.setItem('userInfo', JSON.stringify(item))
        setUser(item)
    }

    const _Logout =(item)=>{
        AsyncStorage.removeItem('userInfo')
    }


    return(
        <UserContext.Provider value={{_Login, Route, _Logout, User}}>
            {children}
        </UserContext.Provider>
    )
}