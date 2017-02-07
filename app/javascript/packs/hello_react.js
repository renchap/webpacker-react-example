import Hello from 'components/hello';
import WebpackerReactHMR from 'webpacker-react-hmr';

WebpackerReactHMR.register(Hello);

if (module.hot) {
  module.hot.accept('components/hello', () => {
    console.log("Hello version", Hello.version)
    WebpackerReactHMR.renderOnHMR(Hello)
    console.log("accepting update to components/hello");
  });
}
