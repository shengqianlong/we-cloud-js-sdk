import defaults from './defaults';
import byteFormat from './upload'

export default class testSDK {
    constructor(options = {}) {
        this.$options = { ...defaults, ...options };
        // this.check();
    }

    check() {
        if (this.$options.key) {
            console.log(`key 存在，通过，${this.$options.accessKey}`);
        } else {
            console.log(`key 不存在，不通过`);
        }
    }
    byteFormat() {
        byteFormat
    }
    show() {
        console.log('show');
    }
}
