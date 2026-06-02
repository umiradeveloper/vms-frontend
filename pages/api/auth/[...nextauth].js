
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosConfig from "@/utils/AxiosConfig";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default NextAuth({
    debug: true,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {

                try {
                    // const response = await axios.post(apiUrl + "/auth/login", { email: email, password: password }, {
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //     }
                    // });
                    const result = await axiosConfig.post(apiUrl + "/auth/login", { email: credentials.email, password: credentials.password },{
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    // const resData = result.data;
                    // console.log(resData)
                    if(!result){
                        return null;
                    }

                    return result;

                }catch(err){
                    console.log(err);
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/LoginRegister",
    },
    callbacks: {
        async jwt({ token, user }) {
            // first login
            if (user) {

                const data = user.data.data;

                token.accessToken = data.token;

                token.user = data.user;

                // token.menu = data.menu;
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;

            session.user = token.user;

            // session.menu = token.menu;

            

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

// export { handler as GET, handler as POST };