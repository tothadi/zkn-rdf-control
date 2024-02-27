export default [
    {
        context: [
            '/api',
        ],
        target: 'http://api:6001',
        secure: false,
        changeOrigin: true
    },
    {
        context: [
            '/stream',
        ],
        target: 'ws://api:6001',
        secure: false,
        changeOrigin: true,
        ws: true,
    },
];
