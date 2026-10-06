/** @type {import('next').NextConfig} */
export default {
  images: {
    // Serve image sources directly so Vercel's exhausted transformation quota
    // cannot make new images fail. Keep Next/Image sizing and lazy loading.
    unoptimized: true,
    // Speaker/gallery photos live in GitHub repos; github.com/...?raw=true redirects to raw.githubusercontent.com.
    remotePatterns: [
      { protocol: 'https', hostname: 'github.com', pathname: '/shreshthasarraf/**' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com', pathname: '/shreshthasarraf/**' },
    ],
  },
  // Old hash-less URLs from the single-page site.
  async redirects() {
    return [{ source: '/index.html', destination: '/', permanent: true }];
  },
};
