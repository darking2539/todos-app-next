/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: `${process.env.API_BASE_URL}/:path*`,
			},
		]
	},
};

export default nextConfig;
