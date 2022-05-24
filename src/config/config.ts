import 'dotenv/config';
import convict from 'convict';

const config = convict({
    serverUrl: {
        doc: 'The url of the server',
        default: 'http://localhost:8080',
        env: 'REACT_APP_SERVER_URL',
    },
});

config.validate();

export default config;
