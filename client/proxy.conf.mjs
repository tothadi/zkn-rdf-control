export default [
    {
        context: [
            '/api',
            '/stream',
        ],
        target: 'http://api:7001',
        secure: false,
        changeOrigin: true
    },
    {
        context: ['/weight'],
        target: 'http://api:7002',
        secure: false,
        changeOrigin: true,
        websocket: true
    }
];
