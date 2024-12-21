import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

const updateApiToken = (token: string | null) => {
    if(token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else  delete axiosInstance.defaults.headers.common['Authorization'];
}

function AuthProvider({children} : {children: React.ReactNode}) {
    const {getToken} = useAuth();
    const [loading, setLoading] = useState(true);
    const {checkAdminStatus} = useAuthStore();

    useEffect(()=>{
        const initAuth = async () => {
            try {
                const token = await getToken();
                console.log("token:", token);
                updateApiToken(token);
                if(token) {
                    await checkAdminStatus();
                }
            } catch (error) {
                updateApiToken(null);
                console.log("Error in auth provider", error);
            } finally {
                setLoading(false);
            }
        }
        initAuth();
    }, [getToken]);

    if(loading) {
        return(
            <div className='w-full h-screen flex items-center justify-center'>
                <Loader className='size-8 text-emerald-500 animate-spin' />
            </div>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthProvider
