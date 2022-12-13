import { Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { useRouter } from 'next/router'


export default function SignIn({ providers }: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>) {
    const router= useRouter();
    return (

        <div className="absolute top-0 left-0 z-[100] w-full h-full bg-white flex justify-center items-center">
            <div className='w-[400px] h-[300px] bg-white text-center flex justify-center flex-col space-y-3 p-8'>
                <Typography>Login</Typography>
                {
                    Object.values(providers!).map((provider) => {
                        return <div key={provider.name}>
                            <button className="border p-4 w-full bg-blue-500 hover:bg-blue-400 transition-all  text-white" onClick={() => {signIn(provider.id, {callbackUrl: "/"})}}>
                                Autenticar com {provider.name} 
                            </button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
  }) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }