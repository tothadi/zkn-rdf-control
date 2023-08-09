export default [
    {
        context: [
            '/api',
            '/stream',
        ],
        target: 'http://api:6001',
        secure: false,
        changeOrigin: true
    }
];
