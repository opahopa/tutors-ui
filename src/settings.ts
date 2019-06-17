let url;

if (process.env.NODE_ENV !== 'production') {
    url = `http://localhost:8000`;
}

export default {
    apiUrl: url,
};
