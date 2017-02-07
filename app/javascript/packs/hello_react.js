import Hello from 'components/hello';
import WebpackerReact from 'webpacker-react-hmr';

WebpackerReact.register(Hello)
if (module.hot) module.hot.accept('components/hello', () => WebpackerReact.renderOnHMR(Hello) )
