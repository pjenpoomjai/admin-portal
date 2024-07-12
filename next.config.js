/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'none';
	connect-src 'self' https://login.microsoftonline.com;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

const nextConfig = {
	compress: false,
	reactStrictMode: false,
	poweredByHeader: false,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		config.module.rules.unshift({
			test: /pdf\.worker\.(min\.)?js/,
			type: 'asset/resource',
			generator: {
				filename: 'static/worker/[hash][ext][query]',
			},
		})

		return config
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: cspHeader.replace(/\n/g, ''),
					},
				],
			},
		]
	},
}

module.exports = nextConfig
