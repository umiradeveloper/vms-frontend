// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { signOut } from "next-auth/react";

export default function handler(req, res) {
	 signOut({
		callbackUrl: "/LoginRegister",
	});
}
