/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
	output: "export", // Comment this line when not building the project
	reactStrictMode: false,
	trailingSlash: true,
	swcMinify: true,
	basePath: isProd ? "" : undefined,
	assetPrefix : isProd ? "" : "",
	images: {
		loader: "imgix",
		path: "/",
	},
	eslint: {
		// ⚡ Next.js won't run ESLint during builds
		ignoreDuringBuilds: true,
	},
};

module.exports = nextConfig;
