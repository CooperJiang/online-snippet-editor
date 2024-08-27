export const proxyConsoleScript = `
<script>
  try {
    class ProxyConsole {
      constructor() {
        this.methods = [
          'debug',
          'clear',
          'error',
          'info',
          'log',
          'warn',
          'dir',
          'props',
          'group',
          'groupEnd',
          'dirxml',
          'table',
          'trace',
          'assert',
          'count',
          'markTimeline',
          'profile',
          'profileEnd',
          'time',
          'timeEnd',
          'timeStamp',
          'groupCollapsed'
        ];
        this.methods.forEach((method) => {
          let originMethod = console[method];
          this[method] = (...args) => {
            const serializedArgs = args.map(arg => {
              try {
                return JSON.stringify(arg);
              } catch (e) {
                return \`[Unserializable] \${Object.prototype.toString.call(arg)}\`;
              }
            });
            window.parent.postMessage({
              type: 'console',
              method,
              data: serializedArgs
            });
            if(method !== 'warn'){
              originMethod.apply(window.console, args);
            }
          };
        });
      }
    }
    window.console = new ProxyConsole();
  } catch (error) {
    console.log('proxy console err', error);
  }
</script>
`;

