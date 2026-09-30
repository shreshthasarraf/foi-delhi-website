/** @type {import('next').NextConfig} */
export default {
  images: {
    // Speaker/gallery photos live in GitHub repos; github.com/...?raw=true redirects to raw.githubusercontent.com.
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com', pathname: '/shreshthasarraf/**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/shreshthasarraf/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Old hash-less URLs from the single-page site.
  async redirects() {
    return [{ source: '/index.html', destination: '/', permanent: true }];
  },
};
